/*
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

#include "include/android/SkImageAndroid.h"
#include "include/gpu/GpuTypes.h"
#include "include/gpu/GrRecordingContext.h"
#include "include/gpu/GrTypes.h"
#include "include/private/gpu/ganesh/GrTypesPriv.h"
#include "src/core/SkImageInfoPriv.h"
#include "src/gpu/SkBackingFit.h"
#include "src/gpu/ganesh/GrImageUtils.h"
#include "src/gpu/ganesh/GrRecordingContextPriv.h"
#include "src/gpu/ganesh/GrSurfaceProxyView.h"
#include "src/gpu/ganesh/SkGr.h"
#include "src/image/SkImage_Base.h"
#include "src/image/SkImage_Raster.h"

#include <memory>

struct PinnedData {
    GrSurfaceProxyView fPinnedView;
    int32_t fPinnedCount = 0;
    uint32_t fPinnedUniqueID = SK_InvalidUniqueID;
    uint32_t fPinnedContextID = SK_InvalidUniqueID;
    GrColorType fPinnedColorType = GrColorType::kUnknown;
};

class SkImage_RasterPinnable final : public SkImage_Raster {
public:
    SkImage_RasterPinnable(const SkBitmap& bm): SkImage_Raster(bm, /*bitmapMayBeMutable = */true) {}

    std::tuple<GrSurfaceProxyView, GrColorType> onAsView(GrRecordingContext*,
                                                         GrMipmapped,
                                                         GrImageTexGenPolicy) const override;

    SkImage_Base::Type type() const override { return SkImage_Base::Type::kRasterPinnable; }

    std::unique_ptr<PinnedData> fPinnedData;
};

std::tuple<GrSurfaceProxyView, GrColorType> SkImage_RasterPinnable::onAsView(
        GrRecordingContext* rContext,
        GrMipmapped mipmapped,
        GrImageTexGenPolicy policy) const {
    if (fPinnedData) {
        // We ignore the mipmap request here. If the pinned view isn't mipmapped then we will
        // fallback to bilinear. The pin API is used by Android Framework which does not expose
        // mipmapping. Moreover, we're moving towards requiring that images be made with mip levels
        // if mipmapping is desired (skbug.com/10411)
        mipmapped = GrMipmapped::kNo;
        if (policy != GrImageTexGenPolicy::kDraw) {
            return {skgpu::ganesh::CopyView(
                            rContext,
                            fPinnedData->fPinnedView,
                            mipmapped,
                            policy,
                            /*label=*/"TextureForPinnableRasterImageWithPolicyNotEqualKDraw"),
                    fPinnedData->fPinnedColorType};
        }
        return {fPinnedData->fPinnedView, fPinnedData->fPinnedColorType};
    }
    return skgpu::ganesh::RasterAsView(rContext, this, mipmapped, policy);
}

namespace SkImages {

sk_sp<SkImage> PinnableRasterFromBitmap(const SkBitmap& bm) {
    if (!SkImageInfoIsValid(bm.info()) || bm.rowBytes() < bm.info().minRowBytes()) {
        return nullptr;
    }

    return sk_make_sp<SkImage_RasterPinnable>(bm);
}

}  // namespace SkImages

namespace skgpu::ganesh {

bool PinAsTexture(GrRecordingContext* rContext, SkImage* img) {
    auto ib = as_IB(img);
    if (ib->type() != SkImage_Base::Type::kRasterPinnable) {
        // Cannot pin images which are not of subclass SkImage_RasterPinnable
        return false;
    }
    auto raster = static_cast<SkImage_RasterPinnable*>(ib);
    if (!raster->fPinnedData) {
        auto data = std::make_unique<PinnedData>();
        std::tie(data->fPinnedView, data->fPinnedColorType) =
                GrMakeCachedBitmapProxyView(rContext,
                                            raster->bitmap(),
                                            /*label=*/"ganesh_PinAsTexture",
                                            GrMipmapped::kNo);
        if (!data->fPinnedView) {
            return false;
        }
        data->fPinnedUniqueID = raster->bitmap().getGenerationID();
        data->fPinnedContextID = rContext->priv().contextID();
        raster->fPinnedData.swap(data);
    } else {
        SkASSERT(raster->fPinnedData->fPinnedCount > 0);
        SkASSERT(raster->fPinnedData->fPinnedUniqueID != 0);
        if (rContext->priv().contextID() != raster->fPinnedData->fPinnedContextID) {
            return false;
        }
    }
    // Note: we only increment if the texture was successfully pinned
    raster->fPinnedData->fPinnedCount++;
    return true;
}

void UnpinTexture(GrRecordingContext*, SkImage* img) {
    auto ib = as_IB(img);
    if (ib->type() != SkImage_Base::Type::kRasterPinnable) {
        // Cannot pin images which are not of subclass SkImage_RasterPinnable
        return;
    }
    auto raster = static_cast<SkImage_RasterPinnable*>(ib);
    if (!raster->fPinnedData) {
        SkASSERT(false);
        return;
    }

    SkASSERT(raster->fPinnedData->fPinnedCount > 0);
    SkASSERT(raster->fPinnedData->fPinnedUniqueID != 0);
    // It would be good to check rContext->priv().contextID() != fPinnedContextID
    // but Android used to (maybe still does) call Unpin with a freed context ptr

    raster->fPinnedData->fPinnedCount--;
    if (raster->fPinnedData->fPinnedCount <= 0) {
        raster->fPinnedData.reset(nullptr);
    }
}

} // namespace skgpu::ganesh
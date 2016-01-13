/*
 * Copyright 2016 Google Inc.
 *
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

#ifndef Fuzz_DEFINED
#define Fuzz_DEFINED

#include "SkData.h"
#include "SkTRegistry.h"
#include "SkTypes.h"
#include <stdlib.h>

class Fuzz : SkNoncopyable {
public:
    explicit Fuzz(SkData*);

    uint32_t nextU();
    float    nextF();

    // These return a value in [min, max).
    uint32_t nextURange(uint32_t min, uint32_t max);
    float    nextFRange(float    min, float    max);

private:
    SkAutoTUnref<SkData> fBytes;
};

struct Fuzzable {
    const char* name;
    void (*fn)(Fuzz*);
};

#define DEF_FUZZ(name, f)                                        \
    static void fuzz_##name(Fuzz*);                              \
    SkTRegistry<Fuzzable> register_##name({#name, fuzz_##name}); \
    static void fuzz_##name(Fuzz* f)

#define ASSERT(cond) do { if (!(cond)) abort(); } while(false)

#endif//Fuzz_DEFINED

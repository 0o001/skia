               OpCapability Shader
          %1 = OpExtInstImport "GLSL.std.450"
               OpMemoryModel Logical GLSL450
               OpEntryPoint Fragment %_entrypoint_v "_entrypoint" %sk_Clockwise %sk_FragColor
               OpExecutionMode %_entrypoint_v OriginUpperLeft
               OpName %sk_Clockwise "sk_Clockwise"
               OpName %sk_FragColor "sk_FragColor"
               OpName %_UniformBuffer "_UniformBuffer"
               OpMemberName %_UniformBuffer 0 "colorGreen"
               OpName %_entrypoint_v "_entrypoint_v"
               OpName %main "main"
               OpName %i1 "i1"
               OpName %i2 "i2"
               OpName %i3 "i3"
               OpName %i4 "i4"
               OpName %i5 "i5"
               OpDecorate %sk_Clockwise BuiltIn FrontFacing
               OpDecorate %sk_FragColor RelaxedPrecision
               OpDecorate %sk_FragColor Location 0
               OpDecorate %sk_FragColor Index 0
               OpMemberDecorate %_UniformBuffer 0 Offset 0
               OpMemberDecorate %_UniformBuffer 0 RelaxedPrecision
               OpDecorate %_UniformBuffer Block
               OpDecorate %10 Binding 0
               OpDecorate %10 DescriptorSet 0
               OpDecorate %46 RelaxedPrecision
       %bool = OpTypeBool
%_ptr_Input_bool = OpTypePointer Input %bool
%sk_Clockwise = OpVariable %_ptr_Input_bool Input
      %float = OpTypeFloat 32
    %v4float = OpTypeVector %float 4
%_ptr_Output_v4float = OpTypePointer Output %v4float
%sk_FragColor = OpVariable %_ptr_Output_v4float Output
%_UniformBuffer = OpTypeStruct %v4float
%_ptr_Uniform__UniformBuffer = OpTypePointer Uniform %_UniformBuffer
         %10 = OpVariable %_ptr_Uniform__UniformBuffer Uniform
       %void = OpTypeVoid
         %15 = OpTypeFunction %void
    %float_0 = OpConstant %float 0
    %v2float = OpTypeVector %float 2
         %19 = OpConstantComposite %v2float %float_0 %float_0
%_ptr_Function_v2float = OpTypePointer Function %v2float
         %23 = OpTypeFunction %v4float %_ptr_Function_v2float
        %int = OpTypeInt 32 1
%_ptr_Function_int = OpTypePointer Function %int
      %int_0 = OpConstant %int 0
      %int_1 = OpConstant %int 1
   %int_4660 = OpConstant %int 4660
  %int_32766 = OpConstant %int 32766
 %int_n32766 = OpConstant %int -32766
  %int_19132 = OpConstant %int 19132
%_ptr_Uniform_v4float = OpTypePointer Uniform %v4float
%_entrypoint_v = OpFunction %void None %15
         %16 = OpLabel
         %20 = OpVariable %_ptr_Function_v2float Function
               OpStore %20 %19
         %22 = OpFunctionCall %v4float %main %20
               OpStore %sk_FragColor %22
               OpReturn
               OpFunctionEnd
       %main = OpFunction %v4float None %23
         %24 = OpFunctionParameter %_ptr_Function_v2float
         %25 = OpLabel
         %i1 = OpVariable %_ptr_Function_int Function
         %i2 = OpVariable %_ptr_Function_int Function
         %i3 = OpVariable %_ptr_Function_int Function
         %i4 = OpVariable %_ptr_Function_int Function
         %i5 = OpVariable %_ptr_Function_int Function
               OpStore %i1 %int_0
         %31 = OpIAdd %int %int_0 %int_1
               OpStore %i1 %31
               OpStore %i2 %int_4660
         %34 = OpIAdd %int %int_4660 %int_1
               OpStore %i2 %34
               OpStore %i3 %int_32766
         %37 = OpIAdd %int %int_32766 %int_1
               OpStore %i3 %37
               OpStore %i4 %int_n32766
         %40 = OpIAdd %int %int_n32766 %int_1
               OpStore %i4 %40
               OpStore %i5 %int_19132
         %43 = OpIAdd %int %int_19132 %int_1
               OpStore %i5 %43
         %44 = OpAccessChain %_ptr_Uniform_v4float %10 %int_0
         %46 = OpLoad %v4float %44
               OpReturnValue %46
               OpFunctionEnd

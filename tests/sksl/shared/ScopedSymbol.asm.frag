OpCapability Shader
%1 = OpExtInstImport "GLSL.std.450"
OpMemoryModel Logical GLSL450
OpEntryPoint Fragment %_entrypoint_v "_entrypoint" %sk_FragColor %sk_Clockwise
OpExecutionMode %_entrypoint_v OriginUpperLeft
OpName %sk_FragColor "sk_FragColor"
OpName %sk_Clockwise "sk_Clockwise"
OpName %glob "glob"
OpName %_UniformBuffer "_UniformBuffer"
OpMemberName %_UniformBuffer 0 "colorGreen"
OpMemberName %_UniformBuffer 1 "colorRed"
OpName %_entrypoint_v "_entrypoint_v"
OpName %block_variable_hides_global_variable_b "block_variable_hides_global_variable_b"
OpName %local_variable_hides_struct_b "local_variable_hides_struct_b"
OpName %S "S"
OpName %local_struct_variable_hides_struct_type_b "local_struct_variable_hides_struct_type_b"
OpName %S_0 "S"
OpMemberName %S_0 0 "i"
OpName %S_1 "S"
OpName %local_variable_hides_global_variable_b "local_variable_hides_global_variable_b"
OpName %glob_0 "glob"
OpName %main "main"
OpName %_0_var "_0_var"
OpDecorate %sk_FragColor RelaxedPrecision
OpDecorate %sk_FragColor Location 0
OpDecorate %sk_FragColor Index 0
OpDecorate %sk_Clockwise BuiltIn FrontFacing
OpMemberDecorate %_UniformBuffer 0 Offset 0
OpMemberDecorate %_UniformBuffer 0 RelaxedPrecision
OpMemberDecorate %_UniformBuffer 1 Offset 16
OpMemberDecorate %_UniformBuffer 1 RelaxedPrecision
OpDecorate %_UniformBuffer Block
OpDecorate %17 Binding 0
OpDecorate %17 DescriptorSet 0
OpMemberDecorate %S_0 0 Offset 0
OpDecorate %81 RelaxedPrecision
OpDecorate %83 RelaxedPrecision
OpDecorate %84 RelaxedPrecision
%float = OpTypeFloat 32
%v4float = OpTypeVector %float 4
%_ptr_Output_v4float = OpTypePointer Output %v4float
%sk_FragColor = OpVariable %_ptr_Output_v4float Output
%bool = OpTypeBool
%_ptr_Input_bool = OpTypePointer Input %bool
%sk_Clockwise = OpVariable %_ptr_Input_bool Input
%int = OpTypeInt 32 1
%_ptr_Private_int = OpTypePointer Private %int
%glob = OpVariable %_ptr_Private_int Private
%_UniformBuffer = OpTypeStruct %v4float %v4float
%_ptr_Uniform__UniformBuffer = OpTypePointer Uniform %_UniformBuffer
%17 = OpVariable %_ptr_Uniform__UniformBuffer Uniform
%void = OpTypeVoid
%22 = OpTypeFunction %void
%float_0 = OpConstant %float 0
%v2float = OpTypeVector %float 2
%26 = OpConstantComposite %v2float %float_0 %float_0
%_ptr_Function_v2float = OpTypePointer Function %v2float
%30 = OpTypeFunction %bool
%int_2 = OpConstant %int 2
%_ptr_Function_bool = OpTypePointer Function %bool
%true = OpConstantTrue %bool
%S_0 = OpTypeStruct %int
%_ptr_Function_S_0 = OpTypePointer Function %S_0
%int_1 = OpConstant %int 1
%int_0 = OpConstant %int 0
%_ptr_Function_int = OpTypePointer Function %int
%53 = OpTypeFunction %v4float %_ptr_Function_v2float
%false = OpConstantFalse %bool
%_ptr_Function_v4float = OpTypePointer Function %v4float
%_ptr_Uniform_v4float = OpTypePointer Uniform %v4float
%_entrypoint_v = OpFunction %void None %22
%23 = OpLabel
%27 = OpVariable %_ptr_Function_v2float Function
OpStore %27 %26
%29 = OpFunctionCall %v4float %main %27
OpStore %sk_FragColor %29
OpReturn
OpFunctionEnd
%block_variable_hides_global_variable_b = OpFunction %bool None %30
%31 = OpLabel
%32 = OpLoad %int %glob
%34 = OpIEqual %bool %32 %int_2
OpReturnValue %34
OpFunctionEnd
%local_variable_hides_struct_b = OpFunction %bool None %30
%35 = OpLabel
%S = OpVariable %_ptr_Function_bool Function
OpStore %S %true
OpReturnValue %true
OpFunctionEnd
%local_struct_variable_hides_struct_type_b = OpFunction %bool None %30
%39 = OpLabel
%S_1 = OpVariable %_ptr_Function_S_0 Function
%44 = OpCompositeConstruct %S_0 %int_1
OpStore %S_1 %44
%46 = OpAccessChain %_ptr_Function_int %S_1 %int_0
%48 = OpLoad %int %46
%49 = OpIEqual %bool %48 %int_1
OpReturnValue %49
OpFunctionEnd
%local_variable_hides_global_variable_b = OpFunction %bool None %30
%50 = OpLabel
%glob_0 = OpVariable %_ptr_Function_int Function
OpStore %glob_0 %int_1
%52 = OpIEqual %bool %int_1 %int_1
OpReturnValue %52
OpFunctionEnd
%main = OpFunction %v4float None %53
%54 = OpFunctionParameter %_ptr_Function_v2float
%55 = OpLabel
%_0_var = OpVariable %_ptr_Function_bool Function
%74 = OpVariable %_ptr_Function_v4float Function
OpStore %glob %int_2
OpStore %_0_var %true
OpSelectionMerge %59 None
OpBranchConditional %true %58 %59
%58 = OpLabel
%60 = OpFunctionCall %bool %block_variable_hides_global_variable_b
OpBranch %59
%59 = OpLabel
%61 = OpPhi %bool %false %55 %60 %58
OpSelectionMerge %63 None
OpBranchConditional %61 %62 %63
%62 = OpLabel
%64 = OpFunctionCall %bool %local_variable_hides_struct_b
OpBranch %63
%63 = OpLabel
%65 = OpPhi %bool %false %59 %64 %62
OpSelectionMerge %67 None
OpBranchConditional %65 %66 %67
%66 = OpLabel
%68 = OpFunctionCall %bool %local_struct_variable_hides_struct_type_b
OpBranch %67
%67 = OpLabel
%69 = OpPhi %bool %false %63 %68 %66
OpSelectionMerge %71 None
OpBranchConditional %69 %70 %71
%70 = OpLabel
%72 = OpFunctionCall %bool %local_variable_hides_global_variable_b
OpBranch %71
%71 = OpLabel
%73 = OpPhi %bool %false %67 %72 %70
OpSelectionMerge %78 None
OpBranchConditional %73 %76 %77
%76 = OpLabel
%79 = OpAccessChain %_ptr_Uniform_v4float %17 %int_0
%81 = OpLoad %v4float %79
OpStore %74 %81
OpBranch %78
%77 = OpLabel
%82 = OpAccessChain %_ptr_Uniform_v4float %17 %int_1
%83 = OpLoad %v4float %82
OpStore %74 %83
OpBranch %78
%78 = OpLabel
%84 = OpLoad %v4float %74
OpReturnValue %84
OpFunctionEnd
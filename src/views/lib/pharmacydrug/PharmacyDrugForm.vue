<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="批准号" prop="approvalNumber">
                      <el-input v-model="formData.approvalNumber" placeholder="请输入批准号" />
                    </el-form-item>
                    <el-form-item label="通用名称" prop="commonName">
                      <el-input v-model="formData.commonName" placeholder="请输入通用名称" />
                    </el-form-item>
                    <el-form-item label="规格" prop="specifications">
                      <el-input v-model="formData.specifications" placeholder="请输入规格" />
                    </el-form-item>
                    <el-form-item label="生产厂家" prop="manufacturer">
                      <el-input v-model="formData.manufacturer" placeholder="请输入生产厂家" />
                    </el-form-item>
                    <el-form-item label="剂型" prop="dosageForm">
                      <el-input v-model="formData.dosageForm" placeholder="请输入剂型" />
                    </el-form-item>
                    <el-form-item label="进价" prop="purchasePrice">
                      <el-input v-model="formData.purchasePrice" placeholder="请输入进价" />
                    </el-form-item>
                    <el-form-item label="零售价" prop="retailPrice">
                      <el-input v-model="formData.retailPrice" placeholder="请输入零售价" />
                    </el-form-item>
                    <el-form-item label="产品批次" prop="productBatch">
                      <el-input v-model="formData.productBatch" placeholder="请输入产品批次" />
                    </el-form-item>
                    <el-form-item label="生产日期" prop="productionDate">
                      <el-date-picker clearable v-model="formData.productionDate" type="date" value-format="timestamp" placeholder="选择生产日期" />
                    </el-form-item>
                    <el-form-item label="有效期至" prop="indate">
                      <el-date-picker clearable v-model="formData.indate" type="date" value-format="timestamp" placeholder="选择有效期至" />
                    </el-form-item>
      </el-form>
              <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :disabled="formLoading">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as PharmacyDrugApi from '@/api/lib/pharmacydrug';
      export default {
    name: "PharmacyDrugForm",
    components: {
                    },
    data() {
      return {
        // 弹出层标题
        dialogTitle: "",
        // 是否显示弹出层
        dialogVisible: false,
        // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
        formLoading: false,
        // 表单参数
        formData: {
                            id: undefined,
                            approvalNumber: undefined,
                            commonName: undefined,
                            specifications: undefined,
                            manufacturer: undefined,
                            dosageForm: undefined,
                            purchasePrice: undefined,
                            retailPrice: undefined,
                            productBatch: undefined,
                            productionDate: undefined,
                            indate: undefined,
        },
        // 表单校验
        formRules: {
                        approvalNumber: [{ required: true, message: '批准号不能为空', trigger: 'blur' }],
                        commonName: [{ required: true, message: '通用名称不能为空', trigger: 'blur' }],
                        specifications: [{ required: true, message: '规格不能为空', trigger: 'blur' }],
                        manufacturer: [{ required: true, message: '生产厂家不能为空', trigger: 'blur' }],
                        purchasePrice: [{ required: true, message: '进价不能为空', trigger: 'blur' }],
                        retailPrice: [{ required: true, message: '零售价不能为空', trigger: 'blur' }],
        },
                        };
    },
    methods: {
      /** 打开弹窗 */
     async open(id) {
        this.dialogVisible = true;
        this.reset();
        // 修改时，设置数据
        if (id) {
          this.formLoading = true;
          try {
            const res = await PharmacyDrugApi.getPharmacyDrug(id);
            this.formData = res.data;
            this.title = "修改药房药品";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增药房药品";
              },
      /** 提交按钮 */
      async submitForm() {
        // 校验主表
        await this.$refs["formRef"].validate();
                  this.formLoading = true;
        try {
          const data = this.formData;
                  // 修改的提交
          if (data.id) {
            await PharmacyDrugApi.updatePharmacyDrug(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await PharmacyDrugApi.createPharmacyDrug(data);
          this.$modal.msgSuccess("新增成功");
          this.dialogVisible = false;
          this.$emit('success');
        } finally {
          this.formLoading = false;
        }
      },
                      /** 表单重置 */
      reset() {
        this.formData = {
                            id: undefined,
                            approvalNumber: undefined,
                            commonName: undefined,
                            specifications: undefined,
                            manufacturer: undefined,
                            dosageForm: undefined,
                            purchasePrice: undefined,
                            retailPrice: undefined,
                            productBatch: undefined,
                            productionDate: undefined,
                            indate: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>
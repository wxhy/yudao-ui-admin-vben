<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="数据id" prop="dataId">
                      <el-input v-model="formData.dataId" placeholder="请输入数据id" />
                    </el-form-item>
                    <el-form-item label="用户id" prop="userId">
                      <el-input v-model="formData.userId" placeholder="请输入用户id" />
                    </el-form-item>
                    <el-form-item label="药房药物ID" prop="drugId">
                      <el-input v-model="formData.drugId" placeholder="请输入药房药物ID" />
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
  import * as DrugMarkingApi from '@/api/lib/drugmarking';
      export default {
    name: "DrugMarkingForm",
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
                            dataId: undefined,
                            userId: undefined,
                            drugId: undefined,
        },
        // 表单校验
        formRules: {
                        dataId: [{ required: true, message: '数据id不能为空', trigger: 'blur' }],
                        userId: [{ required: true, message: '用户id不能为空', trigger: 'blur' }],
                        drugId: [{ required: true, message: '药房药物ID不能为空', trigger: 'blur' }],
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
            const res = await DrugMarkingApi.getDrugMarking(id);
            this.formData = res.data;
            this.title = "修改药房药物对标";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增药房药物对标";
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
            await DrugMarkingApi.updateDrugMarking(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await DrugMarkingApi.createDrugMarking(data);
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
                            dataId: undefined,
                            userId: undefined,
                            drugId: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>
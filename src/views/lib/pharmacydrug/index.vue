<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="批准号" prop="approvalNumber">
        <el-input v-model="queryParams.approvalNumber" placeholder="请输入批准号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="通用名称" prop="commonName">
        <el-input v-model="queryParams.commonName" placeholder="请输入通用名称" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="生产厂家" prop="manufacturer">
        <el-input v-model="queryParams.manufacturer" placeholder="请输入生产厂家" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="产品批次" prop="productBatch">
        <el-input v-model="queryParams.productBatch" placeholder="请输入产品批次" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="会员id" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入会员id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="是否特别关注0：否1:是" prop="watch">
        <el-input v-model="queryParams.watch" placeholder="请输入是否特别关注0：否1:是" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openForm(undefined)"
                   v-hasPermi="['lib:pharmacy-drug:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['lib:pharmacy-drug:export']">导出</el-button>
      </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

            <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
            <el-table-column label="药物id" align="center" prop="id" />
      <el-table-column label="批准号" align="center" prop="approvalNumber" />
      <el-table-column label="通用名称" align="center" prop="commonName" />
      <el-table-column label="规格" align="center" prop="specifications" />
      <el-table-column label="生产厂家" align="center" prop="manufacturer" />
      <el-table-column label="剂型" align="center" prop="dosageForm" />
      <el-table-column label="进价" align="center" prop="purchasePrice" />
      <el-table-column label="零售价" align="center" prop="retailPrice" />
      <el-table-column label="产品批次" align="center" prop="productBatch" />
      <el-table-column label="生产日期" align="center" prop="productionDate" />
      <el-table-column label="有效期至" align="center" prop="indate" />
      <el-table-column label="会员id" align="center" prop="userId" />
      <el-table-column label="是否特别关注0：否1:是" align="center" prop="watch" />
      <el-table-column label="状态0：定标中 1：定标完成 2：定标失败" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="mark" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['lib:pharmacy-drug:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['lib:pharmacy-drug:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <PharmacyDrugForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as PharmacyDrugApi from '@/api/lib/pharmacydrug';
import PharmacyDrugForm from './PharmacyDrugForm.vue';
export default {
  name: "PharmacyDrug",
  components: {
          PharmacyDrugForm,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
              // 总条数
        total: 0,
      // 药房药品列表
      list: [],
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 选中行
      currentRow: {},
      // 查询参数
      queryParams: {
                    pageNo: 1,
            pageSize: 10,
        approvalNumber: null,
        commonName: null,
        manufacturer: null,
        productBatch: null,
        userId: null,
        watch: null,
        createTime: [],
      },
            };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    async getList() {
      try {
      this.loading = true;
              const res = await PharmacyDrugApi.getPharmacyDrugPage(this.queryParams);
        this.list = res.data.list;
        this.total = res.data.total;
      } finally {
        this.loading = false;
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 添加/修改操作 */
    openForm(id) {
      this.$refs["formRef"].open(id);
    },
    /** 删除按钮操作 */
    async handleDelete(row) {
      const id = row.id;
      await this.$modal.confirm('是否确认删除药房药品编号为"' + id + '"的数据项?')
      try {
       await PharmacyDrugApi.deletePharmacyDrug(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有药房药品数据项?');
      try {
        this.exportLoading = true;
        const res = await PharmacyDrugApi.exportPharmacyDrugExcel(this.queryParams);
        this.$download.excel(res, '药房药品.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
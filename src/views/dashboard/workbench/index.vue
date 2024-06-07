<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { Card, Empty, InputSearch } from 'ant-design-vue'
import PageWrapper from '@/components/Page/src/PageWrapper.vue'
import { getDrugYfPage } from '@/api/lib/drugyf'

const loading = ref(true)
const queryParams = reactive({
  name: undefined,
  pageNo: 1,
  pageSize: 25,
})
const drugData = ref([])
async function handleSearch() {
  queryParams.pageNo = 1
  try {
    loading.value = true
    const data = await getDrugYfPage(queryParams)
    drugData.value = data.list
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <PageWrapper>
    <template #headerContent>
      <div class="mb-16px text-center">
        <InputSearch
          v-model:value="queryParams.name" placeholder="请输入药品名称" size="large" style="width: 80%; max-width: 522px;" enter-button
          @search="handleSearch"
        >
          <template #enterButton>
            搜索
          </template>
        </InputSearch>
      </div>
    </template>
    <div v-loading="loading" v-if="drugData.length > 0" class="ml-50px mr-50px flex-wrap lg:flex">
      <Card v-for="item in drugData" :key="item.id" class="enter-y w-280px !m-15px" :hoverable="true">
        <template #cover>
          <img alt="example" class="h-190px w-190px border" style="border-bottom: none" :src="item.imgInfo">
        </template>
        <span class="st-name">{{ item.name }}</span>
        <span class="st">批准文号：{{ item.approvalNumber }}</span>
        <span class="st">规格：{{ item.packing }}</span>
        <span class="st">剂型：{{ item.dosageForm }}</span>
        <span class="st">生产厂家：{{ item.productionEnterPrise }}</span>
        <span class="st !h-25px">价格： <span style="color: red; font-size: 15pt;">￥{{ item.price }}</span></span>
        <span class="st">在售商家数量：{{ item.shopCount }}</span>
      </Card>
    </div>

    <Empty v-else class="mt-20px mb-20px" />

  </PageWrapper>
</template>

<style lang="less" scoped>
.st-name{
  width: 215px;
  overflow: hidden;
  white-space: nowrap;
  height: 30px;
  font-size: 13pt ;
  line-height: 26px;
  display: inline-block;
  text-overflow: ellipsis;
}
.st {
  color: #999;
  width: 215px;
  overflow: hidden;
  white-space: nowrap;
  height: 20px;
  line-height: 26px;
  display: inline-block;
  text-overflow: ellipsis;
}
</style>

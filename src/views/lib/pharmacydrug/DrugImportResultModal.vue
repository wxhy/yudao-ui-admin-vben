<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { Alert } from 'ant-design-vue'
import { BasicModal, useModalInner } from '@/components/Modal'
import type { BasicColumn } from '@/components/Table'
import { BasicTable, useRender } from '@/components/Table'

defineOptions({ name: 'DrugImportResultModal' })

const resultData = ref({
  totalCount: 0,
  successCount: 0,
  failureCount: 0,
  dataInfos: [],
})
const loading = ref(false)
const [registerModal] = useModalInner(async (data) => {
  loading.value = true
  resultData.value = data
  loading.value = false
})
const getHelpText = computed(() => {
  const data = unref(resultData)
  const helpTexts: string[] = []
  if (data.totalCount)
    helpTexts.push(`本次总共导入数量：${data.totalCount}`)
  if (data.successCount)
    helpTexts.push(`导入成功数量：${data.successCount}`)
  if (data.failureCount)
    helpTexts.push(`导入失败数量：${data.failureCount}`)
  return helpTexts.join('，')
})

const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 70,
  },
  {
    title: '批准文号',
    dataIndex: 'approvalNumber',
    width: 150,
  },
  {
    title: '药物名称',
    dataIndex: 'drugName',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text }) => {
      if (text === 0)
        return useRender.renderTag('导入失败', '#ff4d4f')

      if (text === 1)
        return useRender.renderTag('导入成功', '#2d90f2')

      if (text === 2)
        return useRender.renderTag('更新成功', '#2fd283')
    },
  },
  {
    title: '备注',
    dataIndex: 'reason',
    width: 150,
  },
]
</script>

<template>
  <BasicModal v-bind="$attrs" title="导入结果" :min-height="150" @register="registerModal">
    <div class="upload-modal-toolbar">
      <Alert :message="getHelpText" type="info" banner class="upload-modal-toolbar__text" />
    </div>
    <BasicTable
      :columns="columns"
      :max-height="300"
      :data-source="resultData.dataInfos"
      :loading="loading"
      :pagination="{ pageSize: 50 }"
    />
  </BasicModal>
</template>

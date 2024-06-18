<script lang="ts" setup>
import { ref } from 'vue'
import { columns } from './marking.data'
import { useI18n } from '@/hooks/web/useI18n'
import { BasicModal, useModalInner } from '@/components/Modal'
import { deleteDrugMarking, getMarkingDrugYfPage, markingDrug } from '@/api/lib/drugyf'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { IconEnum } from '@/enums/appEnum'
import { useMessage } from '@/hooks/web/useMessage'
import type { DescItem } from '@/components/Description'
import { Description } from '@/components/Description'

defineOptions({ name: 'MarkingDrugModal' })
const emit = defineEmits(['success', 'register'])
const { createMessage } = useMessage()
const { t } = useI18n()
const [registerTable, { reload }] = useTable({
  // title: '标准药品列表',
  api: getMarkingDrugYfPage,
  columns,
  // formConfig: { labelWidth: 120, schemas: searchFormSchema },
  // useSearchForm: true,
  showTableSetting: true,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

const searchInfo = ref({
  drugId: '',
})
const drugInfo = ref({})
const schema: DescItem[] = [
  {
    field: 'commonName',
    label: '药品名',
  },
  {
    field: 'specifications',
    label: '规格',
  },
  {
    field: 'manufacturer',
    label: '生产厂家',
  },
]

const [registerModal, { setModalProps }] = useModalInner(async (data) => {
  try {
    setModalProps({ loading: true })
    searchInfo.value.drugId = data.id
    drugInfo.value = data
    reload()
  }
  finally {
    setModalProps({ loading: false })
  }
})

async function handleRemoveMarking(record: Recordable) {
  await deleteDrugMarking(record.id)
  createMessage.success(t('common.delSuccessText'))
  // 重加载表格
  reload()
  emit('success')
}
const loading = ref(false)
async function handleResetMarking() {
  loading.value = true
  await markingDrug(searchInfo.value.drugId)
  loading.value = false
  createMessage.success('重新对标成功')
  reload()
  emit('success')
}
</script>

<template>
  <BasicModal
    v-bind="$attrs" title="标准药品" width="70%"
    :show-ok-btn="false"
    :show-cancel-btn="false" :min-height="150" @register="registerModal"
  >
    <Description
      title="药品信息" :column="3"
      :collapse-options="{ canExpand: true, helpMessage: '药品基本信息' }"
      :data="drugInfo"
      :schema="schema"
    />
    <BasicTable :search-info="searchInfo" :max-height="400" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :loading="loading" :pre-icon="IconEnum.RESET" @click="handleResetMarking">
          重新对标
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.TEST,
                label: '移除',
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleRemoveMarking.bind(null, record),
                } },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>

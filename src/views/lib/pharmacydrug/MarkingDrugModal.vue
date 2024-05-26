<script lang="ts" setup>
import { ref } from 'vue'
import { columns, searchFormSchema } from './marking.data'
import { useI18n } from '@/hooks/web/useI18n'
import { BasicModal, useModalInner } from '@/components/Modal'
import { getMarkingDrugYfPage } from '@/api/lib/drugyf'
import { BasicTable, useTable } from '@/components/Table'

defineOptions({ name: 'MarkingDrugModal' })

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
  pharmacyDrugId: '',
})
const [registerModal, { setModalProps }] = useModalInner(async (data) => {
  try {
    setModalProps({ loading: true })
    searchInfo.value.pharmacyDrugId = data.id
    reload()
  }
  finally {
    setModalProps({ loading: false })
  }
})
</script>

<template>
  <BasicModal
    v-bind="$attrs" title="标准药品" width="70%"
    :show-ok-btn="false"
    :show-cancel-btn="false" :min-height="150" @register="registerModal"
  >
    <BasicTable :search-info="searchInfo" @register="registerTable" />
  </BasicModal>
</template>

<script lang="ts" setup>
import PharmacyDrugModal from './PharmacyDrugModal.vue'
import DrugImportModal from './DrugImportModal.vue'
import { columns, searchFormSchema } from './pharmacyDrug.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {
  deletePharmacyDrug,
  exportPharmacyDrug,
  getPharmacyDrugPage,
  watchPharmacyDrug,
} from '@/api/lib/pharmacydrug'
import { IconEnum } from '@/enums/appEnum'

defineOptions({ name: 'PharmacyDrug' })

const { t } = useI18n()
const { createConfirm, createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const [registerImportModal, { openModal: openImportModal }] = useModal()

const [registerTable, { getForm, reload }] = useTable({
  title: '药房药品列表',
  api: getPharmacyDrugPage,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  useSearchForm: true,
  showTableSetting: true,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleExport() {
  createConfirm({
    title: t('common.exportTitle'),
    iconType: 'warning',
    content: t('common.exportMessage'),
    async onOk() {
      await exportPharmacyDrug(getForm().getFieldsValue())
      createMessage.success(t('common.exportSuccessText'))
    },
  })
}

async function handleDelete(record: Recordable) {
  await deletePharmacyDrug(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

function handleImport() {
  openImportModal(true, { reset: true })
}

async function handleWatch(record: Recordable) {
  await watchPharmacyDrug(record.id)
  if (record.wathc === 0)
    createMessage.success(t('common.watchSuccessText'))
  else
    createMessage.success(t('common.cancelWatchSuccessText'))
  reload()
}
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="['lib:pharmacy-drug:create']" type="primary" :pre-icon="IconEnum.IMPORT" @click="handleImport">
          {{ t('action.import') }}
        </a-button>
        <a-button v-auth="['lib:pharmacy-drug:create']" type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
        <a-button v-auth="['lib:pharmacy-drug:export']" :pre-icon="IconEnum.EXPORT" @click="handleExport">
          {{ t('action.export') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.TEST, label: record.watch === 0 ? '关注' : '取消关注', auth: 'lib:pharmacy-drug:update', onClick: handleWatch.bind(null, record) },
            ]"
            :drop-down-actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), auth: 'lib:pharmacy-drug:update', onClick: handleEdit.bind(null, record) },
              {

                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                auth: 'lib:pharmacy-drug:delete',
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <PharmacyDrugModal @register="registerModal" @success="reload()" />
    <DrugImportModal @register="registerImportModal" @success="reload()" />
  </div>
</template>

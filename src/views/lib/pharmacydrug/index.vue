<script lang="ts" setup>
import { computed } from 'vue'
import PharmacyDrugModal from './PharmacyDrugModal.vue'
import DrugImportModal from './DrugImportModal.vue'
import { columns, searchFormSchema } from './pharmacyDrug.data'
import MarkingDrugModal from './MarkingDrugModal.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {
  deleteBatchPharmacyDrug,
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
const [registerMarkingModal, { openModal: openMarkingModal }] = useModal()

const [registerTable, { getForm, reload, getSelectRowKeys, clearSelectedRowKeys }] = useTable({
  title: '药房药品列表',
  api: getPharmacyDrugPage,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  useSearchForm: true,
  showTableSetting: true,
  rowSelection: { type: 'checkbox' },
  rowKey: 'id',
  actionColumn: {
    width: 200,
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
  if (record.wath === 0)
    createMessage.success(t('common.watchSuccessText'))
  else
    createMessage.success(t('common.cancelWatchSuccessText'))
  reload()
}

function handleMarking(record: Recordable) {
  openMarkingModal(true, record)
}

/* async function handleRemoveMarking(record: Recordable) {
  await deleteDrugMarking(record.id)
  createMessage.success(t('common.removeSuccessText'))
  reload()
} */

// 选中数量
const deleteDisabled = computed<boolean>(() => {
  return getSelectRowKeys().length === 0
})

async function handleDeleteBatch() {
  createConfirm({
    title: t('common.delMessage'),
    iconType: 'warning',
    content: t('common.delMessage'),
    async onOk() {
      const ids = getSelectRowKeys()
      await deleteBatchPharmacyDrug(ids)
      // 重加载表格
      reload()
      // 清除选中的行
      clearSelectedRowKeys()
      createMessage.success(t('common.delSuccessText'))
    },
  })
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
        <a-button v-auth="['lib:pharmacy-drug:delete']" danger type="primary" :disabled="deleteDisabled" :pre-icon="IconEnum.DELETE" @click="handleDeleteBatch">
          {{ t('action.delete') }}
        </a-button>
        <a-button v-auth="['lib:pharmacy-drug:export']" :pre-icon="IconEnum.EXPORT" @click="handleExport">
          {{ t('action.export') }}
        </a-button>
      </template>
      <!--      <template #expandedRowRender="{ record }">
        <BasicTable
          :columns="markingDrugColumns" :data-source="record.drugInfos" :pagination="false" :action-column="{
            width: 200,
            title: t('common.action'),
            dataIndex: 'action' }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  { icon: IconEnum.DELETE,
                    label: '移除',
                    auth: 'lib:pharmacy-drug:update',
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
      </template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.TEST, label: record.watch === 0 ? '关注' : '取消关注', auth: 'lib:pharmacy-drug:update', onClick: handleWatch.bind(null, record) },
              { icon: IconEnum.TEST, label: '标准品', auth: 'lib:pharmacy-drug:update', onClick: handleMarking.bind(null, record) },
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
    <MarkingDrugModal @register="registerMarkingModal" @success="reload()" />
  </div>
</template>

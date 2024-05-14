<script lang="ts" setup>
import LevelModal from './LevelModal.vue'
import { columns, searchFormSchema } from './level.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { deleteLevel, getLevelList } from '@/api/member/level'
import { DocAlert } from '@/components/DocAlert'
import { useMessage } from '@/hooks/web/useMessage'

defineOptions({ name: 'MemberLevel' })

const { createMessage } = useMessage()

const { t } = useI18n()
const [registerModal, { openModal }] = useModal()
const [registerTable, { reload }] = useTable({
  title: '会员等级列表',
  api: getLevelList,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  useSearchForm: true,
  showTableSetting: true,
  showIndexColumn: false,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})
/** 新增按钮操作 */
function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteLevel(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}
</script>

<template>
  <div>
    <DocAlert title="会员等级、积分、签到" url="https://doc.iocoder.cn/member/level/" />

    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="['system:level:create']" type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), auth: 'member:level:update', onClick: handleEdit.bind(null, record) },
              { icon: IconEnum.DELETE,
                label: t('action.delete'),
                auth: 'member:level:delete',
                popConfirm: {
                  title: '是否确认删除该等级？',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                } },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <LevelModal @register="registerModal" @success="reload()" />
  </div>
</template>

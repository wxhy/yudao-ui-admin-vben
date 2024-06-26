<script lang="ts" setup>
import { ref, unref } from 'vue'
import { formSchema } from './user.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import { createUser, getUser, updateUser } from '@/api/system/user'

defineOptions({ name: 'SystemUserModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 12 },
  schemas: formSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 24 },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetFields()
  setModalProps({ loading: true })
  isUpdate.value = !!data?.isUpdate
  try {
    if (unref(isUpdate)) {
      const res = await getUser(data.record.id)
      setFieldsValue({ ...res })
    }
  }
  finally {
    setModalProps({ loading: false })
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateUser(values)
    else
      await createUser(values)

    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

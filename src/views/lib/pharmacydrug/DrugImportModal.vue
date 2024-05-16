<script lang="ts" setup>
import { ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { Upload, UploadDragger, message } from 'ant-design-vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicModal, useModalInner } from '@/components/Modal'
import { downloadTemplate } from '@/api/lib/pharmacydrug'
import { defHttp } from '@/utils/http/axios'

defineOptions({ name: 'DrugImportModal' })

const emit = defineEmits(['success', 'register'])

const { t } = useI18n()
const { createMessage } = useMessage()
const fileList = ref<UploadProps['fileList']>([])
const fileTypes = ref(['xlsx', 'xls'])

const [registerModal, { setModalProps, closeModal }] = useModalInner()

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true })
    const formData = new FormData()
    fileList.value.forEach((file) => {
      formData.append('file', file as any)
    })
    const result = await defHttp.post({ url: '/lib/pharmacydrug/import', params: formData })
    console.log(result)
    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}
function handleDrop(e: DragEvent) {
  console.log(e)
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  let fileExtension = ''
  if (file.name.lastIndexOf('.') > -1)
    fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
  console.log(fileExtension)
  const isImg = fileTypes.value.some((type: string) => {
    return !!(fileExtension && fileExtension.includes(type))
  })
  if (!isImg) {
    message.error(`文件格式不正确, 请上传${fileTypes.value.join('/')}格式!`)
    return Upload.LIST_IGNORE
  }
  fileList.value = [...(fileList.value || []), file]
  return false
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="t('action.import')" :min-height="150" @register="registerModal" @ok="handleSubmit">
    <template #centerFooter>
      <a-button color="info" @click="downloadTemplate">
        下载模板
      </a-button>
    </template>
    <UploadDragger
      v-model:fileList="fileList"
      name="file"
      :multiple="false"
      :accept="fileTypes.join(',')"
      :before-upload="beforeUpload"
      @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined />
      </p>
      <p class="ant-upload-text">
        单击或将文件拖到此区域以上传
      </p>
    </UploadDragger>
  </BasicModal>
</template>

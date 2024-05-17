<script lang="ts" setup>
import { ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { Upload, UploadDragger, message } from 'ant-design-vue'
import type { RcFile } from 'ant-design-vue/es/vc-upload/interface'
import DrugImportResultModal from './DrugImportResultModal.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicModal, useModal, useModalInner } from '@/components/Modal'
import { downloadTemplate } from '@/api/lib/pharmacydrug'
import { defHttp } from '@/utils/http/axios'
import { ContentTypeEnum } from '@/enums/httpEnum'

defineOptions({ name: 'DrugImportModal' })
const emit = defineEmits(['success', 'register'])
const [registerImportResultModal, { openModal: openImportResultModal }] = useModal()
const { t } = useI18n()
const { createMessage } = useMessage()
const fileList = ref<UploadProps['fileList']>([])
const fileTypes = ref(['xlsx', 'xls'])
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  console.log('open')
  console.log(data)
  fileList.value = []
})

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true })
    const formData = new FormData()

    fileList.value.forEach((file) => {
      console.log(file)
      formData.append('file', file.originFileObj as RcFile)
    })
    const result = await defHttp.post({ url: '/lib/pharmacy-drug/import', params: formData, headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
    } })
    console.log(result)
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
    openImportResultModal(true, result)
    closeModal()
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
  const isImg = fileTypes.value.some((type: string) => {
    return !!(fileExtension && fileExtension.includes(type))
  })
  if (!isImg) {
    message.error(`文件格式不正确, 请上传${fileTypes.value.join('/')}格式!`)
    return Upload.LIST_IGNORE
  }
  fileList.value = [file]
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

  <DrugImportResultModal :show-ok-btn="false" :show-cancel-btn="false" @register="registerImportResultModal" />
</template>

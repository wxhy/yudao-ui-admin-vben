<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { Upload } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useGlobSetting } from '@/hooks/setting'
import { useI18n } from '@/hooks/web/useI18n'
import { getAccessToken } from '@/utils/auth'

defineOptions({ name: 'TinymceImageUpload' })

const props = defineProps({
  fullscreen: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['uploading', 'done', 'error'])
const headers = reactive({
  Authorization: `Bearer ${getAccessToken()}`,
})
let uploading = false

const { uploadUrl } = useGlobSetting()
const { t } = useI18n()
const { prefixCls } = useDesign('tinymce-img-upload')

const getButtonProps = computed(() => {
  const { disabled } = props
  return {
    disabled,
  }
})

function handleChange(info: Recordable) {
  const file = info.file
  const status = file?.status
  const url = file?.response?.data
  const name = file?.name

  if (status === 'uploading') {
    if (!uploading) {
      emit('uploading', name)
      uploading = true
    }
  }
  else if (status === 'done') {
    emit('done', name, url)
    uploading = false
  }
  else if (status === 'error') {
    emit('error')
    uploading = false
  }
}
</script>

<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload name="file" :headers="headers" multiple :action="uploadUrl" :show-upload-list="false" accept=".jpg,.jpeg,.gif,.png,.webp" @change="handleChange">
      <a-button type="primary" v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </a-button>
    </Upload>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-tinymce-img-upload';

.@{prefix-cls} {
  position: absolute;
  top: 4px;
  right: 10px;
  z-index: 20;

  &.fullscreen {
    position: fixed;
    z-index: 10000;
  }
}
</style>

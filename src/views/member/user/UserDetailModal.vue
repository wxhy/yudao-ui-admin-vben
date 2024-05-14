<script lang="ts" setup>
import { ref } from 'vue'
import { Avatar } from 'ant-design-vue'
import { userBasicInfoDesc } from './user.data'
import { Description, useDescription } from '@/components/Description'
import { CollapseContainer } from '@/components/Container'
import { BasicModal, useModalInner } from '@/components/Modal'
import { getUser } from '@/api/member/user'

defineEmits(['success', 'register'])
const userInfo = ref<any>()
const loading = ref(true)

const [registerBasicInfoDesc] = useDescription({
  schema: userBasicInfoDesc,
  data: userInfo,
})

const [registerModal, { setModalProps }] = useModalInner(async (data) => {
  setModalProps({ loading: true })
  const res = await getUser(data.record.id)
  userInfo.value = res
  loading.value = false
  setModalProps({ loading: false })
})

function handleEdit() {
  console.info('edit')
}
</script>

<template>
  <BasicModal
    v-bind="$attrs" title="会员详情" :min-height="200" :width="800"
    :show-ok-btn="false" :show-cancel-btn="false"
    @register="registerModal"
  >
    <CollapseContainer title="基本信息" :can-expan="false" :loading="loading">
      <div class="flex">
        <Description class="w-4/5" :bordered="false" :column="2" @register="registerBasicInfoDesc" />
        <Avatar v-if="userInfo" class="ml-2 w-1/5" :src="userInfo.avatar || ''" :size="72" />
      </div>
    </CollapseContainer>
  </BasicModal>
</template>

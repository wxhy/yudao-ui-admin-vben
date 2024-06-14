<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue'
import { WhatsAppOutlined } from '@ant-design/icons-vue'
import CustomerModal from './CustomerModal.vue'
import { useModal } from '@/components/Modal'

defineOptions({ name: 'Customer' })

const [register, { openModal }] = useModal()
</script>

<template>
  <Tooltip title="联系客服" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="openModal()">
      <WhatsAppOutlined />
    </span>
  </Tooltip>
  <CustomerModal @register="register" />
</template>

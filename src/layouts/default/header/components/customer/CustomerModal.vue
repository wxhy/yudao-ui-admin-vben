<script lang="ts" setup>
import { BasicModal, useModalInner } from '@/components/Modal'

defineOptions({ name: 'CustomerModal' })

const [register] = useModalInner()
</script>

<template>
  <BasicModal :footer="null" :canFullscreen="false" width="400px" :height="350" title="联系客服" v-bind="$attrs" @register="register">
    <img src="@/assets/images/customer.png" class="w-full h-350px" />
  </BasicModal>
</template>

<script lang="ts" setup>
import { Card } from 'ant-design-vue'
</script>

<template>
  <div class="p-4">
    <Card class="enter-y w-1/3 !m-15px" :hoverable="true">
      <template #cover>
        <img
          alt="example"
          src="@/assets/images/yaofangwang.png"
        />
      </template>
      <template #actions>
        <div class="flex justify-end mr-20px">
          <a-button :disabled="true">已开通</a-button>
        </div>
      </template>
    </Card>
  </div>
</template>

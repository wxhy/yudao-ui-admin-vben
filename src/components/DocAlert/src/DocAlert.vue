<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Alert, Button } from 'ant-design-vue'

export default defineComponent({
  name: 'DocAlert',
  components: {
    Alert,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    url: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    /** 跳转 URL 链接 */
    const goToUrl = () => {
      window.open(props.url)
    }

    /** 是否开启 */
    const getEnable = () => {
      return import.meta.env.VITE_APP_DOCALERT_ENABLE !== 'false'
    }

    return {
      goToUrl,
      getEnable,
      props,
    }
  },
})
</script>

<template>
  <Alert v-if="getEnable()" type="success" show-icon>
    <template #message>
      <Button type="link" @click="goToUrl">
        【{{ title }}】文档地址：{{ url }}
      </Button>
    </template>
  </Alert>
</template>

<style scoped>
.ant-alert-success {
  margin-top: 5px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border: 1px solid green;
}
</style>

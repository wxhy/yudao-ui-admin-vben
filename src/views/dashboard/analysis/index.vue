<script lang="ts" setup>
import { Card, Col, Row } from 'ant-design-vue'
</script>

<template>
  <Card>
    <Row :gutter="20">
      <Col :span="8">
        <Card class="enter-y" :hoverable="true">
          <template #cover>
            <img
              alt="example"
              src="@/assets/images/yaofangwang.png"
              class="w-1/1 h-150px"
            >
          </template>
          <template #actions>
            <div class="mr-20px flex justify-end">
              <a-button :disabled="true">
                已开通
              </a-button>
            </div>
          </template>
        </Card>
      </Col>
      <Col :span="8">
        <Card class="enter-y" :hoverable="true">
          <template #cover>
            <img
              alt="example"
              src="@/assets/images/jd.png"
            >
          </template>
          <template #actions>
            <div class="mr-20px flex justify-end">
              <a-button :disabled="true">
                开发中
              </a-button>
            </div>
          </template>
        </Card>
      </Col>
      <Col :span="8">
        <Card class="enter-y" :hoverable="true">
          <template #cover>
            <img
              alt="example"
              src="@/assets/images/meituan.jpg"
            >
          </template>
          <template #actions>
            <div class="mr-20px flex justify-end">
              <a-button :disabled="true">
                开发中
              </a-button>
            </div>
          </template>
        </Card>
      </Col>
    </Row>
  </Card>
</template>

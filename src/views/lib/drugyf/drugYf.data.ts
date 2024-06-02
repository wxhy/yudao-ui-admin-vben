import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
  },
  {
    title: '批准号',
    dataIndex: 'approvalNumber',
    width: 160,
  },
  {
    title: '规格',
    dataIndex: 'packing',
    width: 160,
  },
  {
    title: '剂型',
    dataIndex: 'dosageForm',
    width: 160,
  },
  {
    title: '生产厂家',
    dataIndex: 'productionEnterPrise',
    width: 160,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 160,
  },
  {
    title: '售卖店铺数量',
    dataIndex: 'shopCount',
    width: 160,
  },
  {
    title: '药品图片',
    dataIndex: 'imgInfo',
    width: 160,
    customRender({ text }) {
      return useRender.renderImg(text)
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '批准号',
    field: 'approvalNumber',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '规格',
    field: 'packing',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '剂型',
    field: 'dosageForm',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '生产厂家',
    field: 'productionEnterPrise',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]

export const createFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '批准号',
    field: 'approvalNumber',
    required: true,
    component: 'Input',
  },
  {
    label: '规格',
    field: 'packing',
    required: true,
    component: 'Input',
  },
  {
    label: '剂型',
    field: 'dosageForm',
    component: 'Input',
  },
  {
    label: '生产厂家',
    field: 'productionEnterPrise',
    required: true,
    component: 'Input',
  },
  {
    label: '价格',
    field: 'price',
    required: true,
    component: 'Input',
  },
  {
    label: '售卖店铺数量',
    field: 'shopCount',
    component: 'Input',
  },
  {
    label: '药品图片',
    field: 'imgInfo',
    component: 'FileUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
    },
  },
  {
    label: '来源地址',
    field: 'url',
    required: true,
    component: 'Input',
  },
]

export const updateFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '批准号',
    field: 'approvalNumber',
    required: true,
    component: 'Input',
  },
  {
    label: '规格',
    field: 'packing',
    required: true,
    component: 'Input',
  },
  {
    label: '剂型',
    field: 'dosageForm',
    component: 'Input',
  },
  {
    label: '生产厂家',
    field: 'productionEnterPrise',
    required: true,
    component: 'Input',
  },
  {
    label: '价格',
    field: 'price',
    required: true,
    component: 'Input',
  },
  {
    label: '售卖店铺数量',
    field: 'shopCount',
    component: 'Input',
  },
  {
    label: '售卖店铺数量',
    field: 'shopCount',
    component: 'Input',
  },
  {
    label: '药品图片',
    field: 'imgInfo',
    component: 'FileUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
    },
  },
]

import type { BasicColumn, FormSchema } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '批准号',
    dataIndex: 'approvalNumber',
    width: 120,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '规格',
    dataIndex: 'packing',
    width: 80,
  },
  {
    title: '剂型',
    dataIndex: 'dosageForm',
    defaultHidden: true,
    width: 80,
  },
  {
    title: '生产厂家',
    dataIndex: 'productionEnterPrise',
    width: 160,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 80,
  },
  // {
  //   title: '药品图片',
  //   dataIndex: 'imgInfo',
  //   width: 160,
  //   customRender({ text }) {
  //     return useRender.renderImg(text)
  //   },
  // },
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
    label: '生产厂家',
    field: 'productionEnterPrise',
    component: 'Input',
    colProps: { span: 8 },
  },
]

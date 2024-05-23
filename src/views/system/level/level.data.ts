import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '等级名称',
    dataIndex: 'name',
    width: 160,
  },
  {
    title: '最大关注数量',
    dataIndex: 'watchCount',
    width: 160,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 160,
  },
  {
    title: '等级图标',
    dataIndex: 'icon',
    width: 160,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 160,
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
    label: '等级名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
    },
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
    label: '等级名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '最大关注数量',
    field: 'watchCount',
    required: true,
    component: 'InputNumber',
  },
  {
    label: '排序',
    field: 'sort',
    required: true,
    component: 'InputNumber',
  },
  {
    label: '等级图标',
    field: 'icon',
    required: true,
    component: 'FileUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
    },
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
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
    label: '等级名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '最大关注数量',
    field: 'watchCount',
    required: true,
    component: 'InputNumber',
  },
  {
    label: '排序',
    field: 'sort',
    required: true,
    component: 'InputNumber',
  },
  {
    label: '等级图标',
    field: 'icon',
    required: true,
    component: 'FileUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
    },
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
]

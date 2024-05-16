import type {BasicColumn, FormSchema} from '@/components/Table'
import {useRender} from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 160,
  },
  {
    title: '数据id',
    dataIndex: 'dataId',
    width: 160,
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: 160,
  },
  {
    title: '药房药物ID',
    dataIndex: 'drugId',
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
    label: '数据id',
    field: 'dataId',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '用户id',
    field: 'userId',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '药房药物ID',
    field: 'drugId',
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
    label: '数据id',
    field: 'dataId',
    required: true,
    component: 'Input',
  },
  {
    label: '用户id',
    field: 'userId',
    required: true,
    component: 'Input',
  },
  {
    label: '药房药物ID',
    field: 'drugId',
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
    label: '数据id',
    field: 'dataId',
    required: true,
    component: 'Input',
  },
  {
    label: '用户id',
    field: 'userId',
    required: true,
    component: 'Input',
  },
  {
    label: '药房药物ID',
    field: 'drugId',
    required: true,
    component: 'Input',
  },
]
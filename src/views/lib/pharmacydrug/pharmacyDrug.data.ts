import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '批准号',
    dataIndex: 'approvalNumber',
    width: 160,
  },
  {
    title: '通用名称',
    dataIndex: 'commonName',
    width: 160,
  },
  {
    title: '规格',
    dataIndex: 'specifications',
    width: 160,
  },
  {
    title: '生产厂家',
    dataIndex: 'manufacturer',
    width: 160,
  },
  {
    title: '剂型',
    dataIndex: 'dosageForm',
    width: 80,
  },
  {
    title: '进价',
    dataIndex: 'purchasePrice',
    width: 80,
  },
  {
    title: '零售价',
    dataIndex: 'retailPrice',
    width: 80,
  },
  {
    title: '最新价格',
    dataIndex: 'otherPrice',
    width: 80,
    customRender: ({ record }) => {
      console.log(record.drugInfos)
      if (record.drugInfos.length !== 1)
        return useRender.renderTag('-')
      if (record.drugInfos[0].price < record.retailPrice)
        return useRender.renderTag(record.drugInfos[0].price, '#d7003a')
      return useRender.renderTag(record.drugInfos[0].price)
    },
  },
  {
    title: '在售商家',
    dataIndex: 'shopCount',
    width: 80,
    customRender: ({ record }) => {
      if (record.drugInfos.length === 1)
        return record.drugInfos[0].shopCount
      return '-'
    },
  },
  {
    title: '是否关注',
    dataIndex: 'watch',
    width: 160,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.INFRA_INTEGER_STRING)
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 160,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.LIB_DRUG_CALIBRATION)
    },
  },
  {
    title: '备注',
    dataIndex: 'mark',
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
    label: '批准号',
    field: 'approvalNumber',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入批准文号',
    },
  },
  {
    label: '通用名称',
    field: 'commonName',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入通用名称',
    },
  },
  {
    label: '生产厂家',
    field: 'manufacturer',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入生产厂家',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: getDictOptions(DICT_TYPE.LIB_DRUG_CALIBRATION),
      placeholder: '请选择状态',
    },
  },
  {
    label: '是否关注',
    field: 'watch',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: getDictOptions(DICT_TYPE.INFRA_INTEGER_STRING),
      placeholder: '请选择是否关注',
    },
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
    label: '批准号',
    field: 'approvalNumber',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入批准文号',
    },
  },
  {
    label: '通用名称',
    field: 'commonName',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入通用名称',
    },
  },
  {
    label: '规格',
    field: 'specifications',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入规格',
    },
  },
  {
    label: '生产厂家',
    field: 'manufacturer',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入生产厂家',
    },
  },
  {
    label: '剂型',
    field: 'dosageForm',
    component: 'Input',
    componentProps: {
      placeholder: '请输入剂型',
    },
  },
  {
    label: '进价',
    field: 'purchasePrice',
    required: true,
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入进价',
    },
  },
  {
    label: '零售价',
    field: 'retailPrice',
    required: true,
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入零售价',
    },
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
    label: '批准号',
    field: 'approvalNumber',
    required: true,
    component: 'Input',
  },
  {
    label: '通用名称',
    field: 'commonName',
    required: true,
    component: 'Input',
  },
  {
    label: '规格',
    field: 'specifications',
    required: true,
    component: 'Input',
  },
  {
    label: '生产厂家',
    field: 'manufacturer',
    required: true,
    component: 'Input',
  },
  {
    label: '剂型',
    field: 'dosageForm',
    component: 'Input',
  },
  {
    label: '进价',
    field: 'purchasePrice',
    required: true,
    component: 'InputNumber',
  },
  {
    label: '零售价',
    field: 'retailPrice',
    required: true,
    component: 'InputNumber',
  },
]
export const markingDrugColumns: BasicColumn[] = [
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
  {
    title: '售卖店铺数量',
    dataIndex: 'shopCount',
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

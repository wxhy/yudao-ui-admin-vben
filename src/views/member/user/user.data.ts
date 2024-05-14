import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { getSimpleLevelList } from '@/api/member/level'
import { getAreaTree } from '@/api/system/area'
import type { DescItem } from '@/components/Description'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '用户编号',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '账号',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 100,
  },
  {
    title: '等级',
    dataIndex: 'levelName',
    width: 100,
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
    title: '登录时间',
    dataIndex: 'loginDate',
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '用户昵称',
    field: 'nickname',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '手机号',
    field: 'mobile',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '注册时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
  {
    label: '登录时间',
    field: 'loginDate',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
  {
    label: '用户等级',
    field: 'levelId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleLevelList(),
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
]

export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '账号',
    field: 'username',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入登录账号',
    },
  },
  {
    label: '用户昵称',
    field: 'nickname',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户昵称',
    },
  },
  {
    label: '手机号',
    field: 'mobile',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入手机号',
    },
    rules: [
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '手机号格式不正确',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    label: '密码',
    field: 'password',
    required: true,
    component: 'InputPassword',
    componentProps: {
      placeholder: '请输入登录密码',
    },
    ifShow: ({ values }) => !values.id,
  },
  {
    label: '会员等级',
    field: 'levelId',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      placeholder: '请选择会员等级',
      api: () => getSimpleLevelList(),
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '会员有效期',
    field: 'expireTime',
    component: 'DatePicker',
    required: true,
    rules: [{
      required: true,
      message: '请选择会员到期时间',
    }],
    componentProps: {
      placeholder: '请选择会员到期时间',
      class: 'w-1/1',
      disabledDate: (current: Dayjs) => {
        return current && current < dayjs().endOf('day')
      },
    },
  },
  {
    label: '用户性别',
    field: 'sex',
    component: 'Select',
    required: true,
    defaultValue: 0,
    componentProps: {
      placeholder: '请选择用户性别',
      options: getDictOptions(DICT_TYPE.SYSTEM_USER_SEX),
    },
  },
  {
    label: '所在地',
    field: 'areaId',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      placeholder: '请选择用户所在地',
      api: () => getAreaTree(),
      handleTree: 'id',
    },

  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    required: true,
    componentProps: {
      placeholder: '请选择用户状态',
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
    },
    defaultValue: 0,
  },
  {
    label: '用户头像',
    field: 'avatar',
    component: 'FileUpload',
    componentProps: {
      maxCount: 1,
      fileType: 'image',
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '会员备注',
    field: 'mark',
    component: 'InputTextArea',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入用户备注',
    },
  },
]

export const updateLevelFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '用户昵称',
    field: 'nickname',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    label: '用户等级',
    field: 'levelId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleLevelList(),
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '修改原因',
    field: 'reason',
    required: true,
    component: 'InputTextArea',
  },
]

export const userBasicInfoDesc: DescItem[] = [
  {
    label: '用户名',
    field: 'name',
  },
  {
    label: '昵称',
    field: 'nickname',
  },
  {
    label: '手机号',
    field: 'mobile',
  },
  {
    label: '性别',
    field: 'sex',
    render: (curVal) => {
      return useRender.renderDict(curVal, DICT_TYPE.SYSTEM_USER_SEX)
    },
  },
  {
    label: '所在地',
    field: 'areaName',
  },
  {
    label: '注册 IP',
    field: 'registerIp',
  },
  {
    label: '生日',
    field: 'birthday',
    render: (curVal) => {
      return useRender.renderDate(curVal)
    },
  },
  {
    label: '注册时间',
    field: 'createTime',
    render: (curVal) => {
      return useRender.renderDate(curVal)
    },
  },
  {
    label: '最后登录时间',
    field: 'loginDate',
    render: (curVal) => {
      return useRender.renderDate(curVal)
    },
  },
]

export const userAccountInfoDesc: DescItem[] = [
  {
    label: '等级',
    field: 'levelName',
  },
  {
    label: '成长值',
    field: 'experience',
    render: (curVal) => {
      return curVal || 0
    },
  },
  {
    label: '当前积分',
    field: 'point',
    render: (curVal) => {
      return curVal || 0
    },
  },
  {
    label: '总积分',
    field: 'totalPoint',
    render: (curVal) => {
      return curVal || 0
    },
  },
  {
    label: '当前余额',
    field: 'aaa',
    render: (curVal) => {
      return curVal || 0
    },
  },
  {
    label: '支出金额',
    field: 'bbb',
    render: (curVal) => {
      return curVal || 0
    },
  },
  {
    label: '充值金额',
    field: 'ccc',
    render: (curVal) => {
      return curVal || 0
    },
  },
]

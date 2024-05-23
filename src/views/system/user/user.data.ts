/* eslint-disable prefer-promise-reject-errors */
import { h } from 'vue'
import { Switch } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useMessage } from '@/hooks/web/useMessage'
import { listSimpleDept } from '@/api/system/dept'
import { listSimpleLevel } from '@/api/system/level'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import { updateUserStatus } from '@/api/system/user'
import { listSimpleRoles } from '@/api/system/role'

export const columns: BasicColumn[] = [
  {
    title: '用户编号',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '用户名称',
    dataIndex: 'username',
    width: 180,
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 120,
    customRender: ({ record }) => {
      return useRender.renderTag(record.deptName)
    },
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    width: 120,
    customRender: ({ record }) => {
      return useRender.renderDict(record.userType, DICT_TYPE.USER_TYPE)
    },
  },
  {
    title: '会员等级',
    dataIndex: 'levelName',
    width: 100,
    customRender: ({ record }) => {
      return useRender.renderTag(record.levelName)
    },
  },
  {
    title: '会员有效期',
    dataIndex: 'expireTime',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 180,
    // customRender: ({ text }) => {
    //   return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    // }
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus'))
        record.pendingStatus = false

      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true
          const newStatus = checked ? 0 : 1
          const { createMessage } = useMessage()
          updateUserStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus
              createMessage.success('已成功修改用户状态')
            })
            .catch(() => {
              createMessage.error('修改用户状态失败')
            })
            .finally(() => {
              record.pendingStatus = false
            })
        },
      })
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
    label: '用户名称',
    field: 'username',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入用户名称',
    },
  },
  {
    label: '手机号码',
    field: 'mobile',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入手机号码',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
      placeholder: '请选择状态',
    },
    colProps: { span: 8 },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      showTime: {
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
      },
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
    label: '登录账号',
    field: 'username',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => !!values.id,
    componentProps: {
      placeholder: '请输入登录账号',
    },
  },
  {
    label: '登录密码',
    field: 'password',
    required: true,
    component: 'InputPassword',
    ifShow: ({ values }) => !values.id,
    componentProps: {
      placeholder: '请输入登录密码',
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
    label: '用户性别',
    field: 'sex',
    required: true,
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: getDictOptions(DICT_TYPE.SYSTEM_USER_SEX),
      placeholder: '请选择用户性别',
    },
  },
  {
    label: '手机号码',
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
    label: '邮箱',
    field: 'email',
    required: false,
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮箱',
    },
  },
  {
    label: '归属部门',
    field: 'deptId',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      api: () => listSimpleDept(),
      handleTree: 'id',
      placeholder: '请选择归属部门',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
      placeholder: '请选择状态',
    },
  },
  {
    label: '用户类型',
    field: 'userType',
    component: 'Select',
    required: true,
    defaultValue: 1,
    dynamicDisabled: ({ values }) => !!values.id,
    componentProps: {
      options: getDictOptions(DICT_TYPE.USER_TYPE),
      placeholder: '请选择用户类型',
    },
  },
  {
    label: '会员等级',
    field: 'levelId',
    component: 'ApiTreeSelect',
    required: true,
    defaultValue: 1,
    ifShow: ({ values }) => {
      return values.userType === 1
    },
    componentProps: {
      api: () => listSimpleLevel(),
      handleTree: 'id',
      placeholder: '请选择会员等级',
    },
  },
  {
    label: '会员有效期',
    field: 'expireTime',
    component: 'DatePicker',
    required: true,
    ifShow: ({ values }) => {
      return values.userType === 1
    },
    rules: [{
      required: true,
      message: '请选择会员有效期',
    }],
    componentProps: {
      placeholder: '请选择会员有效期',
      class: 'w-full',
      disabledDate: (current: Dayjs) => {
        return current && current < dayjs().endOf('day')
      },
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入备注',
    },
    colProps: { span: 24 },
  },
]

export const userRoleFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '用户名称',
    field: 'username',
    component: 'Input',
    dynamicDisabled: () => true,
  },
  {
    label: '用户昵称',
    field: 'nickname',
    component: 'Input',
    dynamicDisabled: () => true,
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: () => listSimpleRoles(),
      labelField: 'name',
      valueField: 'id',
      mode: 'tags',
    },
  },
]

export const userPwdFormSchema: FormSchema[] = [
  {
    field: 'newPassword',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value)
              return Promise.reject('密码不能为空')

            if (value !== values.newPassword)
              return Promise.reject('两次输入的密码不一致!')

            return Promise.resolve()
          },
        },
      ]
    },
  },
]

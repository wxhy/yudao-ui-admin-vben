import { defHttp } from '@/utils/http/axios'

export interface UserVO {
  id: number
  mobile: string
  password: string
  status: number
  registerIp: string
  loginIp: string
  loginDate: Date
  nickname: string
  avatar: string
  name: string
  sex: number
  areaId: number
  birthday: Date
  mark: string
  createTime: Date
}
export interface UserPageReqVO extends PageParam {
  levelId?: number
  username?: string
  mobile?: string
  status?: number
  createTime?: Date[]
}

export interface UserExportReqVO {
  levelId?: number
  username?: string
  mobile?: string
  status?: number
  createTime?: Date[]
}
// 查询会员用户列表
export function getUserPage(params: UserPageReqVO) {
  return defHttp.get({ url: '/member/user/page', params })
}

// 查询会员用户详情
export function getUser(id: number) {
  return defHttp.get({ url: `/member/user/get?id=${id}` })
}
// 创建会员用户
export function createUser(data: UserVO) {
  return defHttp.post({ url: '/member/user/create', data })
}

// 修改会员用户
export function updateUser(data: UserVO) {
  return defHttp.put({ url: '/member/user/update', data })
}

// 修改会员用户等级
export function updateUserLevel(data: any) {
  return defHttp.put({ url: '/member/user/update-level', data })
}

export function exportUser(params: UserExportReqVO) {
  return defHttp.download({ url: '/system/user/export', params }, '会员.xls')
}

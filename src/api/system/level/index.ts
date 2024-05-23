import { defHttp } from '@/utils/http/axios'

// 查询用户等级列表
export function getLevelPage(params) {
  return defHttp.get({ url: '/system/level/page', params })
}

// 查询用户等级详情
export function getLevel(id: number) {
  return defHttp.get({ url: `/system/level/get?id=${id}` })
}

export function listSimpleLevel() {
  return defHttp.get({ url: '/system/level/list-all-simple' })
}

// 新增用户等级
export function createLevel(data) {
  return defHttp.post({ url: '/system/level/create', data })
}

// 修改用户等级
export function updateLevel(data) {
  return defHttp.put({ url: '/system/level/update', data })
}

// 删除用户等级
export function deleteLevel(id: number) {
  return defHttp.delete({ url: `/system/level/delete?id=${id}` })
}

// 导出用户等级 Excel
export function exportLevel(params) {
  return defHttp.download({ url: '/system/level/export-excel', params }, '用户等级.xls')
}

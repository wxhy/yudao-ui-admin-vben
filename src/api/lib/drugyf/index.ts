import { defHttp } from '@/utils/http/axios'

// 查询药房药品列表
export function getDrugYfPage(params) {
  return defHttp.get({ url: '/lib/drug-yf/page', params })
}

// 查询药房药品详情
export function getDrugYf(id: number) {
  return defHttp.get({ url: `/lib/drug-yf/get?id=${id}` })
}

// 新增药房药品
export function createDrugYf(data) {
  return defHttp.post({ url: '/lib/drug-yf/create', data })
}

// 修改药房药品
export function updateDrugYf(data) {
  return defHttp.put({ url: '/lib/drug-yf/update', data })
}

// 删除药房药品
export function deleteDrugYf(id: number) {
  return defHttp.delete({ url: `/lib/drug-yf/delete?id=${id}` })
}

// 导出药房药品 Excel
export function exportDrugYf(params) {
  return defHttp.download({ url: '/lib/drug-yf/export-excel', params }, '药房药品.xls')
}

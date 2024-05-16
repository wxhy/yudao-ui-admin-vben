import { defHttp } from '@/utils/http/axios'

// 查询药房药物对标列表
export function getDrugMarkingPage(params) {
  return defHttp.get({ url: '/lib/drug-marking/page', params })
}

// 查询药房药物对标详情
export function getDrugMarking(id: number) {
  return defHttp.get({ url: `/lib/drug-marking/get?id=${id}` })
}

// 新增药房药物对标
export function createDrugMarking(data) {
  return defHttp.post({ url: '/lib/drug-marking/create', data })
}

// 修改药房药物对标
export function updateDrugMarking(data) {
  return defHttp.put({ url: '/lib/drug-marking/update', data })
}

// 删除药房药物对标
export function deleteDrugMarking(id: number) {
  return defHttp.delete({ url: `/lib/drug-marking/delete?id=${id}` })
}

// 导出药房药物对标 Excel
export function exportDrugMarking(params) {
  return defHttp.download({ url: '/lib/drug-marking/export-excel', params }, '药房药物对标.xls')
}
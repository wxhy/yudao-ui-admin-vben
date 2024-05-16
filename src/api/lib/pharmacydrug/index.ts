import { defHttp } from '@/utils/http/axios'

// 查询药房药品列表
export function getPharmacyDrugPage(params) {
  return defHttp.get({ url: '/lib/pharmacy-drug/page', params })
}

// 查询药房药品详情
export function getPharmacyDrug(id: number) {
  return defHttp.get({ url: `/lib/pharmacy-drug/get?id=${id}` })
}

// 新增药房药品
export function createPharmacyDrug(data) {
  return defHttp.post({ url: '/lib/pharmacy-drug/create', data })
}

// 修改药房药品
export function updatePharmacyDrug(data) {
  return defHttp.put({ url: '/lib/pharmacy-drug/update', data })
}

// 删除药房药品
export function deletePharmacyDrug(id: number) {
  return defHttp.delete({ url: `/lib/pharmacy-drug/delete?id=${id}` })
}

// 导出药房药品 Excel
export function exportPharmacyDrug(params) {
  return defHttp.download({ url: '/lib/pharmacy-drug/export-excel', params }, '药房药品.xls')
}

// 下载药物导入模板
export function downloadTemplate() {
  return defHttp.download({ url: `/lib/pharmacy-drug/get-import-template` }, `药物导入模板.xlsx`)
}

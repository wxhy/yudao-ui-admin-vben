import request from '@/utils/request'

// 创建药房药品
export function createPharmacyDrug(data) {
  return request({
    url: '/lib/pharmacy-drug/create',
    method: 'post',
    data: data
  })
}

// 更新药房药品
export function updatePharmacyDrug(data) {
  return request({
    url: '/lib/pharmacy-drug/update',
    method: 'put',
    data: data
  })
}

// 删除药房药品
export function deletePharmacyDrug(id) {
  return request({
    url: '/lib/pharmacy-drug/delete?id=' + id,
    method: 'delete'
  })
}

// 获得药房药品
export function getPharmacyDrug(id) {
  return request({
    url: '/lib/pharmacy-drug/get?id=' + id,
    method: 'get'
  })
}

// 获得药房药品分页
export function getPharmacyDrugPage(params) {
  return request({
    url: '/lib/pharmacy-drug/page',
    method: 'get',
    params
  })
}
// 导出药房药品 Excel
export function exportPharmacyDrugExcel(params) {
  return request({
    url: '/lib/pharmacy-drug/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
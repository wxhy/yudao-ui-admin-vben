import request from '@/utils/request'

// 创建药房药物对标
export function createDrugMarking(data) {
  return request({
    url: '/lib/drug-marking/create',
    method: 'post',
    data: data
  })
}

// 更新药房药物对标
export function updateDrugMarking(data) {
  return request({
    url: '/lib/drug-marking/update',
    method: 'put',
    data: data
  })
}

// 删除药房药物对标
export function deleteDrugMarking(id) {
  return request({
    url: '/lib/drug-marking/delete?id=' + id,
    method: 'delete'
  })
}

// 获得药房药物对标
export function getDrugMarking(id) {
  return request({
    url: '/lib/drug-marking/get?id=' + id,
    method: 'get'
  })
}

// 获得药房药物对标分页
export function getDrugMarkingPage(params) {
  return request({
    url: '/lib/drug-marking/page',
    method: 'get',
    params
  })
}
// 导出药房药物对标 Excel
export function exportDrugMarkingExcel(params) {
  return request({
    url: '/lib/drug-marking/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
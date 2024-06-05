import { defHttp } from '@/utils/http/axios'

// 删除药房药品
export function deleteDrugMarking(id: number) {
  return defHttp.delete({ url: `/lib/drug-marking/delete?id=${id}` })
}

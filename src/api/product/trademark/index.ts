import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

      export const reqHasTradeMark = (page: number, limit: number) =>
        request.get<any, TradeMarkResponseData>(
          API.TRADEMARK_URL + `${page}/${limit}`,
        )

//新增与修改
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //有id，就是修改
  if (data.id) {
    return request.put<any, any>( API.UPDATETRADEMARK_URL 
      , data)
  } else { //无id，为新增
    return request.post<any, any>( API.ADDTRADEMARK_URL 
      , data)
  }
}

//删除
export const reqRemoveTrademark = (id: number) => request.delete<any, any>( API.DELETE_URL
  + id)
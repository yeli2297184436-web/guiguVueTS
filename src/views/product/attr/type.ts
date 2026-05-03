export interface CategoryListData {
  attrName:string
  attrValueList:[]
  categoryId:number
  categoryLevel:number,
  id:number | string
}

export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,  
}

export interface CategoryResponseData extends ResponseData{
  data: CategoryListData[],
  code:number,
  message:string,
  ok:boolean
}

//属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}


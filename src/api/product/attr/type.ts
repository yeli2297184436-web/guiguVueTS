export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,  
}

export interface CategoryObj {
  id:number | string,
  name: string,
  category1Id?: number | string,
  category2Id?: number | string,
  category3Id?: number | string,
}

export interface CategoryResponseData extends ResponseData {
  data:CategoryObj[]
<<<<<<< HEAD
}

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
=======
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972
}
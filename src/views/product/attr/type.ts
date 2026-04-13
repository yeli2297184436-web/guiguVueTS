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

export interface AttrValue {
  attrId: number,
  id: number,
  valueName:string,
}


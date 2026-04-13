 //封装一个时间函数
 export const getTime = ()=>{
  let hours = new Date().getHours()
  let message = ''
  if(hours <= 9){
    message = '早上'
  }else if(hours <= 12){
    message = '上午'
  }else if(hours <= 18){
    message = '下午'
  }else{
    message = '晚上'
  }
  return message
}
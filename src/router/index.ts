//通过vue-router插件实现模版路由配置
import {createRouter, createWebHashHistory} from 'vue-router'
import {constantRoute} from './routes.ts'

//创建路由器
const router = createRouter({
  //路由模式hash
  history:createWebHashHistory(),
  routes:constantRoute,
})


export default router
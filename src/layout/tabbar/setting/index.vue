<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefsh">
  </el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen">
  </el-button>
  <el-popover title="主题设置" :width="250" placement="bottom">
    <!-- 表单元素 -->
    <el-form ref="form" label-width="80px">
      <el-form-item label="主题颜色">
        <el-color-picker @change="changeColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" size="small" />
      </el-form-item>
    </el-form>
    <template #reference> <el-button size="small" icon="Setting" circle></el-button></template>
  </el-popover>
  <img src="@/assets/images/me.jpg" alt="">
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取骨架的小仓库
import useLayoutSettingStore from '@/store/modules/setting'
//获取用户相关小仓库
import useUserStore from '@/store/modules/user'
// 获取路由器
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

//颜色组件
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const dark = ref<boolean>(false)

//控制暗黑模式的切换
const changeDark = () => {
  //获取html根节点
  const dom = document.documentElement
  if (dark.value) {
    dom.className = 'dark'
  } else {
    dom.className = ''
  }
}

//主题颜色更改
const changeColor = () => {
  //通知js修改根节点
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
}

let $router = useRouter()
//获取路由对象
let $route = useRoute()
let LayoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
//刷新按钮点击回调
const updateRefsh = () => {
  LayoutSettingStore.refsh = !LayoutSettingStore.refsh
}
//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性，可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false]
  let full = document.fullscreenElement
  //切换为全屏模式
  if (!full) {
    //利用文档根节点的方法requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
//退出登录
const logout = async () => {
  // 第一件事：需要向服务器发请求[退出登录接口]
  // 第二件事：仓库当中关于用户相关的数据清空[token.username,avatar]
  // 第三件事：跳转到登录页面
  await userStore.userLogout()
  //跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: 0 10px;
}
</style>
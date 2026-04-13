<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{Component}">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component
          v-if="flag"
          :is="Component"
        ></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
//获取骨架的小仓库
import useLayoutSettingStore from '../../store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()

// 控制当前组件是否销毁重建
let flag = ref(true)

//监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => LayoutSettingStore.refsh,
  () => {
    //点击刷新按钮，路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped >
.fade {
}
</style>
<template>
  <svg :style="{width,height}">
    <use
      :xlink:href="prefix + name"
      :fill="color"
    ></use>
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  //提供使用的图标名字
  name: String,
  //接受父组件传递颜色
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '30px',
  },
  height: {
    type: String,
    default: '30px',
  },
})
</script>

<style scoped lang="">
</style>
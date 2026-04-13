<template>
  <div
    class="logo"
    :class="{fold: fold}"
    v-if="setting.logoHidden"
  >
    <img
      :src="setting.logo"
      alt=""
    >
    <p v-show="!fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
import setting from '@/setting'

defineProps<{
  fold: boolean
}>()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  // color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 36px;
    height: 36px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
  &.fold {
    justify-content: center;
    padding: 10px 5px;
  }
}
</style>
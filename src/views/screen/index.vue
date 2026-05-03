<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Couter class="couter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Couter from './components/couter/index.vue'

defineOptions({
  name: 'ScreenIndex',
})

const screen = ref<HTMLElement | null>(null)
let resizeTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  setScreenScale()
  window.addEventListener('resize', throttleScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', throttleScale)
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
})

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

function setScreenScale() {
  if (!screen.value) return
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

function throttleScale() {
  if (resizeTimer) return
  resizeTimer = setTimeout(() => {
    setScreenScale()
    resizeTimer = null
  }, 300)
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;
      height: calc(1080px - 40px);

      .left {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        display: flex;
        flex: 2;
        flex-direction: column;
        padding: 0 10px;

        .map {
          flex: 2;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        display: flex;
        flex: 1;
        flex-direction: column;
        // gap: 10px;
        height: 100%;
        overflow: hidden;

        .rank {
          flex: 1.2;
        }

        .year {
          flex: 1;
        }

        .couter {
          flex: 1;
        }
      }
    }
  }
}
</style>

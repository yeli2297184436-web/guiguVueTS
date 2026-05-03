<template>
  <div class="year-panel">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'YearCompare',
})

const charts = ref<HTMLElement | null>(null)
let mychart: echarts.ECharts | null = null

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

onMounted(() => {
  if (!charts.value) return

  mychart = echarts.init(charts.value)
  mychart.setOption({
    backgroundColor: 'transparent',
    color: ['#f7b82b', '#167dff', '#ff6b9a'],
    legend: {
      top: 18,
      right: 18,
      itemWidth: 16,
      itemHeight: 8,
      itemGap: 18,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
      data: ['2023年', '2024年', '2025年'],
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(4, 18, 55, 0.9)',
      borderColor: '#1b9dff',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(77, 210, 255, 0.5)',
        },
      },
    },
    grid: {
      top: 72,
      right: 24,
      bottom: 32,
      left: 42,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: months,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#195ca6',
        },
      },
      axisLabel: {
        color: '#c6dbff',
        fontSize: 13,
      },
    },
    yAxis: {
      type: 'value',
      name: '(人)',
      min: 0,
      max: 600,
      interval: 100,
      nameTextStyle: {
        color: '#c6dbff',
        fontSize: 13,
        padding: [0, 28, 2, 0],
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#195ca6',
        },
      },
      axisLabel: {
        color: '#c6dbff',
        fontSize: 13,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '2023年',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: '#f7b82b',
        },
        areaStyle: {
          opacity: 0.55,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(247, 184, 43, 0.7)' },
            { offset: 1, color: 'rgba(247, 184, 43, 0.06)' },
          ]),
        },
        data: [160, 92, 110, 30, 18, 95, 92, 48, 24, 515, 360, 215],
      },
      {
        name: '2024年',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: '#167dff',
        },
        areaStyle: {
          opacity: 0.78,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(22, 125, 255, 0.82)' },
            { offset: 1, color: 'rgba(22, 125, 255, 0.12)' },
          ]),
        },
        data: [415, 510, 380, 165, 370, 82, 318, 150, 330, 475, 205, 58],
      },
      {
        name: '2025年',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: '#ff6b9a',
        },
        areaStyle: {
          opacity: 0.68,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 107, 154, 0.78)' },
            { offset: 1, color: 'rgba(255, 107, 154, 0.1)' },
          ]),
        },
        data: [540, 250, 118, 86, 70, 505, 55, 42, 24, 415, 330, 215],
      },
    ],
  })

  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  mychart?.dispose()
  mychart = null
})

function resizeChart() {
  mychart?.resize()
}
</script>

<style scoped lang="scss">
.year-panel {
  // width: 100%;
  // height: 100%;
  // min-height: 300px;
  // padding: 14px 16px 12px;
  // box-sizing: border-box;
  background: url('../../images/dataScreen-main-rc.png') no-repeat;
  background-size: 100% 100%;
  // overflow: hidden;
  margin: 20px 0
}

.title {
  position: relative;
  z-index: 1;

  p {
    color: #ffffff;
    font-size: 20px;
  }

  img {
    display: block;
    width: 68px;
    height: 7px;
    margin-top: 7px;
  }
}

.charts {
  width: 100%;
  height: calc(100% - 40px);
}
</style>

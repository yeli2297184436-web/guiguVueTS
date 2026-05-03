<template>
  <div class="box6">
    <div class="title">
      <p>未来7天游客趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="line">

    </div>
  </div>
</template>

<script setup lang="ts" name="">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'


const line = ref()

onMounted(async () => {
  let mycharts = echarts.init(line.value)
  mycharts.setOption({
    title: {
      text: "",
      color: "#fff",
    },
    grid: {
      left: '10%',
      right: '5%',
      top: '22%',
      bottom: '25%'
    },
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      name: '访问量(人)',
      type: 'value',
      nameTextStyle: {
        color: '#fff'
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 182, 311, 234, 220, 400, 360]
      },
    ]
  })
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  // margin: 10px 0 0 0;

  .title {
    color: #fff;
    font-size: 20px;
    // margin-left: 20px;
  }

  .charts {
    width: 100%;
    height: calc(100%);
  }
}
</style>
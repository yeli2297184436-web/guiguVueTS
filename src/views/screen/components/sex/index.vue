<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="">
        <span>男士</span>
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
        <span>女士</span>
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts" name="">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

//获取图形图表的DOM节点
let charts = ref()

onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    //组件标题
    title: {
      text: '',//主标题
      textStyle: {//主标题颜色
        color: 'skyblue'
      },
      left: '40%'
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#0076ff',
          borderRadius: 20
        }
      }
      ,
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: '#ff5f79',
          borderRadius: 20
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-lc.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .title {
    color: #fff;
    font-size: 20px;
  }

  .sex {
    display: flex;
    justify-content: center;

    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      justify-content: center;
      display: flex;
      align-items: center;
      background: url('../../images/man-bg.png') no-repeat;
      background-size: 100% 100%;
      position: relative;

      span {
        position: absolute;
        color: #fff;
        top: 2px;
        left: 40px;
      }
    }

    .woman {
      margin: 20px;
      width: 111px;
      height: 115px;
      justify-content: center;
      display: flex;
      align-items: center;
      background: url('../../images/woman-bg.png') no-repeat;
      background-size: 100% 100%;
      position: relative;

      span {
        position: absolute;
        color: #fff;
        top: 0px;
        left: 40px;
      }
    }
  }

  .rate {
    color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .charts {
    display: flex;
    justify-content: center;
    // padding: 0 100px;
    margin-left: 25%;
    width: 50%;
    height: 80px;
  }
}
</style>
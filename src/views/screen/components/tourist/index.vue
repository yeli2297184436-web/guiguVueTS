<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量
        <span>999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- charts图表 -->
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//水球图扩展插件
import 'echarts-liquidfill'

let people = ref('952741人')

//获取节点
let charts = ref<any>()

function Pie() { // 外层虚线圈数据
  let dataArr = [];
  for (var i = 0; i < 150; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 50,
        itemStyle: {
          color: '#19A4BB',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 100,
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)',
        },
      });
    }
  }
  return dataArr;
}

onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value)

  const rate = 0.5
  //设置实例的配置项
  mycharts.setOption({
    backgroundColor: '#081736',
    polar: {
      radius: ['75%', '80%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 100,
      clockwise: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      { // 水波球
        // value: 50, //  内容 配合formatter
        type: 'liquidFill',
        name: '预估量',
        radius: '70%', // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
        center: ['50%', '50%'],
        data: [
          rate,
          rate,
          rate
        ], // data个数代表波浪数
        backgroundStyle: {
          borderWidth: 1,
          color: 'rgba(62, 208, 255, 1)', // 球体本景色
        },
        amplitude: '6%', //波浪的振幅
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#6CDEFC',
              },
              {
                offset: 0,
                color: '#429BF7',
              },
            ],
            globalCoord: false,
          },
        ],
        label: {
          formatter: '{a}',
          fontSize: 18,
          color: '#fff',
        },
        outline: {
          show: false,
        },
      },
      { // 外层虚线环
        type: 'pie',
        zlevel: 0,
        silent: true,
        radius: ['76%', '78%'],
        z: 3,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: Pie(),
      },
      { // 进度条环
        name: '',
        type: 'bar',
        roundCap: true,
        z: 3,
        showBackground: false,
        data: [rate * 100],
        coordinateSystem: 'polar',
        barWidth: 30, //大的占比环
        itemStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#19A4BB',
            },
            {
              offset: 1,
              color: '#22C7DA',
            },
          ]),
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  height: 100%;
  background: url('../../images/dataScreen-main-lt.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .title {
    color: #fff;
    font-size: 20px;
    // margin-left: 20px;
  }

  .bg {
    width: 68px;
    height: 7px;
    background: url('../../images/dataScreen-title.png') no-repeat;
    background-size: 100% 100%;
    margin: 10px 0 0 0px;
  }

  .right {
    float: right;
    color: #fff;
    margin: 0 10px 0 0;

    span {
      color: orange;
      margin: 0 4px;
      text-shadow: 0px 0px 4px orange;
    }
  }

  .number {
    display: flex;
    padding: 10px;
    margin-top: 30px;
    font-size: 28px;

    span {
      height: 46px;
      line-height: 46px;
      flex: 1;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #29fcfc;
    }
  }

  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
<template>
  <!-- <div class="box">s -->
  <div class="topContent">
    <div class="map_title">平台高峰预警信息（2条）</div>
    <div class="bg-img"> <img src="../../images/dataScreen-title.png" alt=""></div>
    <div class="map_sub_title">
      <span class="sub_title">{{ subtitle }}</span>
    </div>
  </div>
  <!-- </div> -->
  <div class="box4" ref="map">
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import chinaJSON from './china.json'

const subtitle = ref('景区实时客流量')

// 地图坐标类型：ECharts 的 geo 坐标格式为 [经度, 纬度]
type GeoCoord = [number, number]
// 取 registerMap 第二个参数的类型，避免 chinaJSON 使用 any
type RegisterMapSource = Parameters<typeof echarts.registerMap>[1]
// tooltip 回调参数里需要读取 seriesType 和 data，这里补充一下类型
type TooltipParams = echarts.DefaultLabelFormatterCallbackParams & {
  seriesType?: string
  data?: unknown
}

// 飞线 tooltip 里用到的起点和终点字段
interface LineTooltipData {
  fromName?: string
  toName?: string
}

defineOptions({
  name: 'map'
})

const map = ref<HTMLElement>()
// 保存 ECharts 实例，方便窗口变化时 resize，以及组件卸载时销毁
let mymap: echarts.ECharts | null = null

// 注册本地中国地图 JSON，下面 geo.map 写 'china' 就能渲染中国地图
echarts.registerMap('china', chinaJSON as RegisterMapSource)

// 各省市的经纬度坐标，飞线和散点都会复用这份数据
const geoCoordMap: Record<string, GeoCoord> = {
  北京市: [116.405285, 39.904989],
  上海市: [121.472644, 31.231706],
  广东省: [113.280637, 23.125178],
  四川省: [104.065735, 30.659462],
  新疆维吾尔自治区: [87.617733, 43.792818],
  西藏自治区: [91.132212, 29.660361],
  云南省: [102.712251, 25.040609],
  陕西省: [108.948024, 34.263161],
  山东省: [117.000923, 36.675807],
  江苏省: [118.767413, 32.041544],
  浙江省: [120.153576, 30.287459],
  湖北省: [114.298572, 30.584355],
  湖南省: [112.982279, 28.19409],
  河南省: [113.665412, 34.757975],
  辽宁省: [123.429096, 41.796767],
  黑龙江省: [126.642464, 45.756967],
  海南省: [110.33119, 20.031971],
  台湾省: [121.509062, 25.044332],
}

// 飞线中心点，截图效果是从一个核心城市向全国各地发散
const centerCity = '北京市'

// 需要从中心点连线过去的目标城市/省份；增删这里即可控制飞线数量
const routeCityList = [
  '上海市',
  '广东省',
  '四川省',
  '新疆维吾尔自治区',
  '西藏自治区',
  '云南省',
  '陕西省',
  '山东省',
  '江苏省',
  '浙江省',
  '湖北省',
  '湖南省',
  '河南省',
  '辽宁省',
  '黑龙江省',
  '海南省',
  '台湾省',
]

// lines 系列需要的飞线数据：coords 第一项是起点，第二项是终点
const lineData = routeCityList.map((city) => ({
  fromName: centerCity,
  toName: city,
  coords: [geoCoordMap[centerCity], geoCoordMap[city]],
}))

// 普通蓝色光点数据，value 的第三项用来控制散点大小
const cityPointData = Object.entries(geoCoordMap).map(([name, coord], index) => ({
  name,
  value: [...coord, 70 + index * 9],
}))

// 红色预警点数据，用来突出显示重点/告警区域
const warningPointData = ['北京市', '四川省', '广东省', '新疆维吾尔自治区', '海南省'].map((name) => ({
  name,
  value: [...geoCoordMap[name], 120],
}))

onMounted(() => {
  if (!map.value) return

  mymap = echarts.init(map.value)

  mymap.setOption({
    backgroundColor: 'transparent',
    // 鼠标移入地图元素时显示的提示框
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(5, 22, 50, 0.92)',
      borderColor: '#29fcff',
      borderWidth: 1,
      padding: [8, 12],
      textStyle: {
        color: '#ffffff',
      },
      formatter(params: TooltipParams | TooltipParams[]) {
        // tooltip 可能返回数组，这里统一取当前项来处理
        const current = Array.isArray(params) ? params[0] : params

        // 飞线提示显示“起点 → 终点”，普通散点/地图区域显示名称
        if (
          current.seriesType === 'lines' &&
          isLineTooltipData(current.data) &&
          current.data.fromName &&
          current.data.toName
        ) {
          return `${current.data.fromName} → ${current.data.toName}`
        }

        return current.name
      },
    },
    // geo 是地图底图配置，负责中国地图的缩放、位置、颜色、描边和高亮效果
    geo: {
      map: 'china',
      roam: true,
      zoom: 0.68,
      top: -50,
      right: 10,
      bottom: 0,
      left: 10,
      aspectScale: 0.70, //控制地图长宽比的配置项。
      label: {
        show: true,
        color: '#e8fbff',
        fontSize: 12,
        textShadowColor: '#001d46',
        textShadowBlur: 5,
      },
      itemStyle: {
        // 用纵向渐变做出截图里的深蓝地图区域
        areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#074783' },
          { offset: 0.58, color: '#05366e' },
          { offset: 1, color: '#021f48' },
        ]),
        borderColor: '#16d6ff',
        borderWidth: 1.1,
        shadowColor: 'rgba(34, 211, 255, 0.45)',
        shadowBlur: 16,
        shadowOffsetY: 8,
      },
      // 鼠标悬浮到省份时的高亮样式
      emphasis: {
        label: {
          show: true,
          color: '#ffffff',
          fontWeight: 'bold',
        },
        itemStyle: {
          areaColor: '#0b66a8',
          borderColor: '#7df9ff',
          borderWidth: 1.5,
          shadowColor: 'rgba(41, 252, 255, 0.7)',
          shadowBlur: 24,
        },
      },
      // 点击选中省份时的样式
      select: {
        itemStyle: {
          areaColor: '#0b66a8',
          borderColor: '#7df9ff',
        },
        label: {
          color: '#ffffff',
        },
      },
    },
    series: [
      {
        // 第一层飞线：偏淡的青色底线，形成全国连线骨架
        name: '客流底线',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        data: lineData,
        symbol: ['none', 'circle'],
        symbolSize: [0, 4],
        lineStyle: {
          color: 'rgba(121, 223, 255, 0.42)',
          width: 1,
          opacity: 0.78,
          curveness: 0.2,
        },
      },
      {
        // 第二层飞线：带箭头动画和粉色发光，模拟实时客流流向
        name: '实时客流',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 3,
        data: lineData,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.28,
          color: '#ffffff',
          symbol: 'arrow',
          symbolSize: 6,
        },
        lineStyle: {
          // color: '#ffb7d3',
          color: '#29fcfc',
          width: 1.4,
          opacity: 0.76,
          curveness: 0.2,
          // shadowColor: 'rgba(255, 88, 142, 0.8)',
          shadowColor: 'rgba(41,252,252,0.6)',
          shadowBlur: 6,
        },
      },
      {
        // 城市蓝色涟漪点：展示普通城市/省份位置
        name: '城市光点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 4,
        data: cityPointData,
        symbolSize(value: number[]) {
          // value[2] 是上面拼进去的权重，控制点位大小
          return Math.max(value[2] / 24, 5)
        },
        rippleEffect: {
          brushType: 'stroke',
          scale: 3.5,
          period: 4,
        },
        label: {
          show: true,
          position: 'right',
          distance: 4,
          formatter: '{b}',
          color: '#e8fbff',
          fontSize: 11,
          textShadowColor: '#001d46',
          textShadowBlur: 5,
        },
        itemStyle: {
          color: '#29fcff',
          shadowColor: '#29fcff',
          shadowBlur: 14,
        },
      },
      {
        // 红色预警涟漪点：层级更高，会覆盖在普通光点上
        name: '平台预警',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 5,
        data: warningPointData,
        symbolSize: 10,
        rippleEffect: {
          brushType: 'stroke',
          scale: 4.6,
          period: 3,
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{b}',
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 'bold',
          textShadowColor: '#ff3f75',
          textShadowBlur: 8,
        },
        itemStyle: {
          color: '#ff4b7a',
          shadowColor: '#ff4b7a',
          shadowBlur: 18,
        },
      },
    ],
  })

  // 浏览器窗口变化时同步刷新图表尺寸，避免地图拉伸或空白
  window.addEventListener('resize', resizeMap)
})

onBeforeUnmount(() => {
  // 组件销毁前移除监听并释放 ECharts 实例，防止重复进入页面时内存泄漏
  window.removeEventListener('resize', resizeMap)
  mymap?.dispose()
  mymap = null
})

function resizeMap() {
  mymap?.resize()
}

// 类型守卫：判断 tooltip 的 data 是否是飞线数据
function isLineTooltipData(data: unknown): data is LineTooltipData {
  return typeof data === 'object' && data !== null && 'fromName' in data && 'toName' in data
}
</script>

<style scoped lang="scss">
.box4 {
  width: 100%;
  height: 630px;

}

.topContent {
  margin-top: 40px;
  color: #fff;
  font-size: 18px;
  // display: flex;
  position: relative;

  .map_title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bg-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  .map_sub_title {
    width: 220px;
    height: 36px;
    line-height: 36px;
    background: url('../../images/map-title-bg.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 30px;

    .sub_title {
      margin-left: 25px;
      letter-spacing: 2px;
    }
  }
}
</style>

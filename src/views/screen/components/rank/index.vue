<template>
  <div class="rank-panel">
    <div class="rank-title">
      <h3>热门景区<span>排行</span></h3>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>

    <div class="rank-content">
      <div class="rank-header">
        <span>排名</span>
        <span>景区</span>
        <span>预约数量</span>
      </div>

      <ul class="rank-list">
        <li v-for="item in rankList" :key="item.id" class="rank-item">
          <span class="rank-no" :class="`rank-no-${item.id}`">NO.{{ item.id }}</span>
          <span class="scenic-name">{{ item.name }}</span>
          <span class="progress-wrap">
            <span class="progress-track">
              <span class="progress-bar" :class="`progress-bar-${item.id}`" :style="{ width: `${item.rate}%` }">
                <span>{{ item.rate }}%</span>
              </span>
            </span>
          </span>
          <span class="reserve-count">{{ item.count }}w</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ScenicRank',
})

const rankList = [
  {
    id: 1,
    name: '峨眉山',
    rate: 80,
    count: '8.00',
  },
  {
    id: 2,
    name: '稻城亚丁',
    rate: 60,
    count: '6.00',
  },
  {
    id: 3,
    name: '九寨沟',
    rate: 50,
    count: '5.00',
  },
  {
    id: 4,
    name: '万里长城',
    rate: 40,
    count: '4.00',
  },
  {
    id: 5,
    name: '北京故宫',
    rate: 30,
    count: '3.00',
  },
]
</script>

<style scoped lang="scss">
.rank-panel {
  // width: 100%;
  // height: 100%;
  overflow: hidden;
  background: url('../../images/dataScreen-main-rt.png') no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  margin-top: 10px
}

.rank-title {
  h3 {
    // height: 32px;
    margin: 0;
    // line-height: 32px;
    color: #ffffff;
    font-size: 20px;
    letter-spacing: 0;
    text-shadow: 0 0 8px rgba(49, 198, 255, 0.8);

    span {
      display: inline-block;
      margin-left: 3px;
      padding: 0 6px;
      background: linear-gradient(90deg, #1568cf 0%, #1ea1ff 100%);
      color: #dff8ff;
    }
  }

  img {
    display: block;
    width: 68px;
    height: 7px;
    margin-top: 8px;
  }
}

.rank-content {
  margin-top: 30px;
  padding: 0 10px 10px 10px;
}

.rank-header {
  display: grid;
  grid-template-columns: 90px 1fr 220px;
  align-items: center;
  height: 40px;
  padding: 0 18px;
  box-sizing: border-box;
  background: rgba(20, 61, 145, 0.55);
  border: 1px solid rgba(28, 109, 221, 0.45);
  color: #f5be65;
  font-size: 17px;
  font-weight: 700;
  text-shadow: 0 0 6px rgba(250, 171, 55, 0.55);
}

.rank-list {
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin: 10px 0 0;
  padding: 0 10px 10px 10px;
  list-style: none;
}

.rank-item {
  display: grid;
  grid-template-columns: 72px 92px minmax(140px, 1fr) 66px;
  align-items: center;
  column-gap: 14px;
  min-height: 28px;
  color: #ffffff;
  font-size: 16px;
}

.rank-no {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 24px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.75);
  background: linear-gradient(90deg, #2c66ad 0%, #3e91d8 100%);
  clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%, 12% 50%);
  box-shadow: inset 0 0 8px rgba(93, 206, 255, 0.55);
}

.rank-no-1 {
  background: linear-gradient(90deg, #c85d50 0%, #f08567 100%);
}

.rank-no-2 {
  background: linear-gradient(90deg, #c19148 0%, #f5c96d 100%);
}

.rank-no-3 {
  background: linear-gradient(90deg, #1e72c0 0%, #3aa6ec 100%);
}

.scenic-name {
  overflow: hidden;
  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.45);
}

.progress-wrap {
  min-width: 0;
}

.progress-track {
  display: block;
  width: 100%;
  height: 18px;
  padding: 2px;
  box-sizing: border-box;
  background: url('../../images/rankingChart-bg.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
}

.progress-bar {
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 42px;
  padding-left: 12px;
  box-sizing: border-box;
  border-radius: 8px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  box-shadow: 0 0 10px rgba(45, 213, 255, 0.65);
}

.progress-bar-1 {
  background: linear-gradient(90deg, #2a90ff 0%, #27e3ff 100%);
}

.progress-bar-2 {
  background: linear-gradient(90deg, #ff7771 0%, #ffa28a 100%);
  box-shadow: 0 0 10px rgba(255, 116, 112, 0.65);
}

.progress-bar-3 {
  background: linear-gradient(90deg, #1ba8d8 0%, #73f6ff 100%);
}

.progress-bar-4 {
  background: linear-gradient(90deg, #ffc336 0%, #ffe06c 100%);
  box-shadow: 0 0 10px rgba(255, 198, 55, 0.65);
}

.progress-bar-5 {
  background: linear-gradient(90deg, #7a73ff 0%, #9e94ff 100%);
  box-shadow: 0 0 10px rgba(127, 116, 255, 0.65);
}

.reserve-count {
  color: #ffffff;
  font-size: 15px;
  text-align: right;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.55);
}
</style>

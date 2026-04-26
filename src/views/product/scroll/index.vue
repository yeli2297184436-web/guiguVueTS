<template>
<<<<<<< HEAD
  <el-card>
    <div class="whole-page">
      <Vue3SeamlessScroll :list="list" :limitScrollNum="5" :hover="true" :step="0.5" :copyNum="1" :wheel="true"
        :isWatch="true" class="scroll">
        <div v-for="item in list" :key="item" class="list-box">
          <div class="item">
            {{ item.name }}
          </div>
        </div>
      </Vue3SeamlessScroll>
    </div>
  </el-card>
=======
  <div class="whole-page">
    <Vue3SeamlessScroll :list="list" :limitScrollNum="5" :hover="true" :step="0.5" :copyNum="1" :wheel="true" :isWatch="true" class="scroll">
        <div v-for="item in list" :key="item" class="list-box">
            <div class="item">
              {{item.name}}
            </div>
        </div>
    </Vue3SeamlessScroll>
  </div>
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972
</template>

<script setup lang="ts">
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
<<<<<<< HEAD
import { ref } from 'vue'
const list = ref([
  { id: '01', name: '放假啊咖啡机啊咖啡机啊发卡机1' },
  { id: '02', name: '放假啊咖啡机啊咖啡机啊发卡机2' },
  { id: '03', name: '放假啊咖啡机啊咖啡机啊发卡机3' },
  { id: '04', name: '放假啊咖啡机啊咖啡机啊发卡机4' },
  { id: '05', name: '放假啊咖啡机啊咖啡机啊发卡机5' },
  { id: '06', name: '放假啊咖啡机啊咖啡机啊发卡机6' },
  { id: '07', name: '放假啊咖啡机啊咖啡机啊发卡机7' },
=======
import {ref} from 'vue'
const list = ref([
    {id:'01',name:'放假啊咖啡机啊咖啡机啊发卡机1'},
    {id:'02',name:'放假啊咖啡机啊咖啡机啊发卡机2'},
    {id:'03',name:'放假啊咖啡机啊咖啡机啊发卡机3'},
    {id:'04',name:'放假啊咖啡机啊咖啡机啊发卡机4'},
    {id:'05',name:'放假啊咖啡机啊咖啡机啊发卡机5'},
    {id:'06',name:'放假啊咖啡机啊咖啡机啊发卡机6'},
    {id:'07',name:'放假啊咖啡机啊咖啡机啊发卡机7'},
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972
])
</script>

<style scoped lang="scss">
<<<<<<< HEAD
.whole-page {
  height: 500px;
  overflow: hidden
}

.scroll {
  height: 200px;
  // overflow: hidden
}

.list-box {
  height: 40px;

  // overflow:hidden
  &:hover {
    background: pink
  }
}

.item {
  height: 40px;
  line-height: 40px;
  font-size: 16px
=======
.whole-page{
height:500px;
overflow:hidden
}
.scroll{
  height:200px;
  overflow:hidden
}
.list-box{
  height:40px;
  // overflow:hidden
  &:hover{
    background:pink
  }
}
.item{
  height:40px;
  line-height:40px;
  font-size:16px
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972
}
</style>
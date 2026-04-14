<template>
  <Category />
  <el-card style="margin: 10px 0;">
    <el-button type="primary" size="default" icon="plus" @click="addAttr" :disabled="!categoryState.category3Id">添加属性</el-button>
    <el-table border style="margin: 10px 0;width: 100%;" :data="categoryState.tableData">
      <el-table-column align="center" width="60" label="序号" type="index"></el-table-column>
      <el-table-column width="260" label="属性名称" prop="attrName" align="center"></el-table-column>
      <el-table-column label="属性值名称" prop="attrValueList" align="center">
        <template #default="{row}">
          <el-tag v-for="value in row.attrValueList" :key="value.id" type="success" size="small" style="margin: 0 5px">
            {{ value.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作">
        <template #default>
          <el-button type="primary" icon="edit"></el-button>
          <el-button type="danger" icon="delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 20, 50]"
      :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
      @current-change="getHasTradeMark" @size-change="sizeChange" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useCategoryState from '@/store/modules/category'
import type {CategoryListData,ResponseData,CategoryResponseData,AttrValue} from "./type"

let categoryState = useCategoryState()


let pageNo = ref<number>(1)

let limit = ref<number>(5)
let total = ref<number>(0)
let dialogFormVisible = ref<boolean>(false)


let formRef = ref()

const sizeChange = () => {
  getHasTradeMark()
}


function addAttr(){

}

const getHasTradeMark = async (pager = 1) => {
  pageNo.value = pager
  
}


</script>

<style scoped lang="scss">
:deep .el-select {
  width: 250px;
}
</style>
<template>
<<<<<<< HEAD
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="!categoryState.categoryIdThree" @click="addAttr">
        添加平台属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag style="margin: 5px" v-for="(item, index) in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
            <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene === 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default" icon="Plus"
        @click="addAttrValue">
        添加属性值
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
        <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" placeholder="请你输入属性值名称"
              v-model="row.valueName" @blur="toLook(row, $index)"></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button type="danger" size="small" icon="Delete"
              @click="attrParams.attrValueList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save"
        :disabled="attrParams.attrValueList.length > 0 ? false : true">
        保存
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
=======
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
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972
  </el-card>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import useCategoryState from '@/store/modules/category'
import type { CategoryListData, Attr, ResponseData, CategoryResponseData, AttrResponseData, AttrValue } from "./type"
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { GET_ATTR_INFO, saveOrUpdateAttr, DELETE_ATTR } from '@/api/product/attr/index.ts'
import { ElMessage } from 'element-plus'

let categoryState = useCategoryState()

let pageNo = ref<number>(1)
let limit = ref<number>(5)
let total = ref<number>(0)

let scene = ref<number>(0)

const form = ref({
  attrName: null
})

let inputArr = ref<any>([])
const attrArr = ref<Attr[]>([])
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
=======
import { ref } from 'vue'
import useCategoryState from '@/store/modules/category'
import type {CategoryListData,ResponseData,CategoryResponseData,AttrValue} from "./type"

let categoryState = useCategoryState()


let pageNo = ref<number>(1)

let limit = ref<number>(5)
let total = ref<number>(0)
let dialogFormVisible = ref<boolean>(false)


let formRef = ref()
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972

const sizeChange = () => {
  getHasTradeMark()
}

<<<<<<< HEAD
watch(
  () => categoryState.categoryIdThree,
  () => {
    attrArr.value = []
    if (!categoryState.categoryIdThree) return
    getAttr()
  },
)

const getAttr = async () => {
  const { categoryIdOne, categoryIdTwo, categoryIdThree } = categoryState
  let res: AttrResponseData = await GET_ATTR_INFO(categoryIdOne, categoryIdTwo, categoryIdThree)
  if (res.code === 200) {
    attrArr.value = res.data
  }
}

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryState.categoryIdThree,
    categoryLevel: 3,
  })
  scene.value = 1
}

const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  let res: any = await saveOrUpdateAttr(attrParams)
  if (res.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const deleteAttr = async (attrId: number) => {
  let res: any = await DELETE_ATTR(attrId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onBeforeUnmount(() => {
  categoryState.$reset()
})

const getHasTradeMark = async (pager = 1) => {
  pageNo.value = pager

=======

function addAttr(){

}

const getHasTradeMark = async (pager = 1) => {
  pageNo.value = pager
  
>>>>>>> 9ca8cbe3d1e8d4810f5e2552f8483f655e287972
}


</script>

<style scoped lang="scss">
:deep .el-select {
  width: 250px;
}
</style>
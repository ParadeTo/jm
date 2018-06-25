<template>
  <div class="app-container">
    <el-tabs>
      <el-tab-pane label="分类管理">
        <category />
      </el-tab-pane>
      <el-tab-pane label="规格管理">
        <standard />
      </el-tab-pane>
      <el-tab-pane label="单位管理">
        <unit />
      </el-tab-pane>
      <el-tab-pane label="品牌管理">
        <brand />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Category from './components/category'
import Standard from './components/standard'
import Unit from './components/unit'
import Brand from './components/brand'

export default {
  components: {
    Category,
    Standard,
    Unit,
    Brand
  },
  methods: {
    addCategory () {

    }
  }
}
</script>


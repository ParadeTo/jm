<template>
  <div class="app-container">
    <el-tabs>
      <el-tab-pane label="分类管理" :lazy="true">
        <classify />
      </el-tab-pane>
      <el-tab-pane label="规格管理" :lazy="true">
        <standard />
      </el-tab-pane>
      <el-tab-pane label="单位管理" :lazy="true">
        <unit />
      </el-tab-pane>
      <el-tab-pane label="品牌管理" :lazy="true">
        <brand />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Classify from './components/classify'
import Standard from './components/standard'
import Unit from './components/unit'
import Brand from './components/brand'

export default {
  components: {
    Classify,
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


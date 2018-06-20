<template>
  <div class="dashboard-editor-container">
      <panel-group></panel-group>

      <el-row style="background:#fff;margin-bottom:32px;">
        <home-table />
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12" class="col">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品种类销售比例</span>
            </div>
            <pie-chart />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" class="col">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品库存量</span>
            </div>
            <pie-chart />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" class="col">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品种类销售比例</span>
            </div>
            <pie-chart />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" class="col">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>消息管理</span>
            </div>
            <div></div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import HomeTable from './components/Table'
import PieChart from './components/PieChart'

export default {
  components: {
    PanelGroup,
    PieChart,
    HomeTable
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.col {
  margin-bottom: 20px;
}
</style>


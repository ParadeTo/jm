<template>
  <div class="app-container">
    <el-form inline class="filter-container">
        <el-form-item label="进货单号">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" v-model="query.code" />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            placeholder="订单时间"
            v-model="query.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="订单状态">
            <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <!-- <el-date-picker
          placeholder="订单时间"
          v-model="query.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="订单状态">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: {
        code: '',
        daterange: '',
        status: ''
      },
      statusList: [{
        
      }]
    }
  },

  methods: {
    handleFilter () {}
  }
}
</script>

<style scoped>

</style>


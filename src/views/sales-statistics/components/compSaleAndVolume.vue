<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
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
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>
    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
    </my-table>
  </div>
</template>

<script>


export default {
  data () {
    return {
      query: {
        daterange: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'code',
        label: '条码'
      }, {
        key: 'name',
        label: '商品名称'
      }, {
        key: 'sale',
        label: '销量'
      }, {
        key: 'volume',
        label: '销售额'
      }]
    }
  },

  methods: {
    handleFilter () {},
    addOrder () {
      this.$router.push({ name: 'cargoOrderAdd' })
    },
    orderTemp () {
      this.$router.push({ name: 'cargoOrderTemp' })
    },
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

<style scoped>

</style>


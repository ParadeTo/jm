<template>
  <div class="app-container">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="交易单号" v-model="query.number">
        </el-input>
        <el-date-picker
          v-model="query.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.cashier" placeholder="收银员">
          <el-option v-for="item in cashierList" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>
        <el-select @change='handleFilter' style="width: 140px" v-model="query.payType" placeholder="收款方式">
          <el-option v-for="item in payTypeList" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>

      <my-table
        :cols="cols"
        :updateListFunc="updateTableFunc"
      >
        <el-table-column slot="action" align="center" label="动作" min-width="60" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="look(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </my-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      query: {
        number: '',
        cashier: '',
        payType: '',
        daterange: ''
      },
      cashierList: [{
        key: 0,
        label: '收银员1'
      }, {
        key: 1,
        label: '收银员2'
      }],
      payTypeList: [{
        key: 0,
        label: '现金'
      }, {
        key: 1,
        label: '支付宝'
      }],
      cols: [{
        label: '交易单号',
        key: 'code'
      }, {
        label: '商品',
        key: 'name'
      }, {
        label: 'SKU',
        key: 'sku'
      }, {
        label: '数量',
        key: 'number'
      }, {
        label: '交易时间',
        key: 'time'
      }, {
        label: '收银员',
        key: 'cashier'
      }, {
        label: '收款方式',
        key: 'type'
      }, {
        label: '销售额',
        key: 'sale'
      }],
      list: [{
        order: 1,
        code: '2017110814213015',
        name: '大速度快感觉拉上看到几个拉斯科监督管理局',
        sku: 15,
        number: 34,
        time: '2017年11月22日16:18:28',
        cashier: '线上',
        payType: '收款方式',
        sale: '300.00',
      }],
      listLoading: false,
    }
  },

  methods: {
    handleFilter () {
      console.log(this.query)
    },
    async updateTableFunc ({page, limit}) {

    },
    look () {

    }
  }
}
</script>

<style scoped>

</style>


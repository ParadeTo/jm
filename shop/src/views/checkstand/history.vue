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

      <el-table :data="list" v-loading="listLoading" element-loading-text="loading" border fit highlight-current-row>
        <el-table-column align="center" label="#" width="50">
          <template slot-scope="scope">
            <span>{{scope.row.order}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易单号" width="170">
          <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品" min-width="300">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="SKU" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.sku}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数量" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易时间" min-width="160">
          <template slot-scope="scope">
            <span>{{scope.row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收银员" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.cashier}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收款方式" min-width="60">
          <template slot-scope="scope">
            <span>{{scope.row.payType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="销售额" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.sale}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" min-width="60" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      </el-table>
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
    }
  }
}
</script>

<style scoped>

</style>


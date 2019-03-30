<template>
  <div class="app-container">
     <div class="filter-container">
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

      <el-tabs v-model="tableIndex" @tab-click="handleTabClick">
        <el-tab-pane label="日收银统计" name="0">
          <my-table
            :cols="dailyTableCols"
            :updateListFunc="updateDailyTableFunc"
          />
        </el-tab-pane>
        <el-tab-pane label="收银员统计" name="1">
          <my-table
            :multiSelection="true"
            :cols="statisticsTableCols"
            :updateListFunc="updateStatisticsTableFunc"
          >
            <el-table-column slot="action" align="center" label="动作" min-width="60" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="look(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </my-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MyTable from '@/components/Table'


export default {
  components: {
    MyTable
  },

  data () {
    const commonCol = [{
      label: '收银时间',
      key: 'time'
    }, {
      label: 'SKU',
      key: 'sku'
    }, {
      label: '数量',
      key: 'number'
    }, {
      label: '客单数',
      key: 'guest'
    }, {
      label: '现金收款',
      key: 'cash'
    }, {
      label: '微信收款',
      key: 'weixin'
    }, {
      label: '支付宝收款',
      key: 'alipay'
    }, {
      label: '银行卡收款',
      key: 'card'
    }, {
      label: '总金额',
      key: 'amount'
    }]

    return {
      query: {
        cashier: '',
        payType: '',
        daterange: ''
      },
      payTypeList: [{
        key: 0,
        label: '现金'
      }, {
        key: 1,
        label: '支付宝'
      }],
      cashierList: [{
        key: 0,
        label: '收银员1'
      }, {
        key: 1,
        label: '收银员2'
      }],
      tableIndex: 0,
      tableLoading: false,
      dailyTableList: [],
      dailyTableCols: [...commonCol],
      statisticsTableCols: [{
        label: '收银员',
        key: 'cashier'
      }, ...commonCol]
    }
  },

  methods: {
    handleTabClick (tab, event) {
      console.log(tab, event);
    },
    async updateDailyTableFunc ({page, limit}) {
      
    },
    async updateStatisticsTableFunc ({page, limit}) {
      
    },
    handleFilter () {
      console.log(this.query)
    },
    look (row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>

</style>


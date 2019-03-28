<template>
  <!-- 销售单，！不是销售订单 -->
  <div class="app-container">
    <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="订单单号" v-model="query.number" />
        <el-date-picker
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
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addOrder">新增订单</el-button>
      <el-button type="success" v-waves icon="el-icon-tickets" @click="orderTemp">订单模板</el-button>
    </el-row>

    <my-table
      :list="list"
      :total="total"
      :updateTableFunc="updateTableFunc"
      :cols="cols"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="del(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { getPurchaseOrderByPage } from '@/api/pdos/purchase'

// 改造成公共的组件
export default {
  data () {
    return {
      pageSize: 10,
      list: [],
      total: 0,
      query: {
        number: '',
        daterange: '',
        status: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'code',
        label: '订单单号'
      }, {
        key: 'name',
        label: '供应商名称'
      }, {
        key: 'sku',
        label: 'SKU数'
      }, {
        key: 'number',
        label: '总数量'
      }, {
        key: 'type',
        label: '总金额'
      }, {
        key: 'name',
        label: '创建时间'
      }, {
        key: 'name',
        label: '订单状态'
      }, {
        key: 'name',
        label: '操作'
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
    async updateTableFunc ({ currentPage, pageSize }) {
      this.pageSize = pageSize
      const response = await getPurchaseOrderByPage({ currentPage, pageSize, ...this.query })
      if (response.data.data) {
        this.list = response.data.data.items
        this.total = response.data.data.pageInfo.totalCount
      }
    }
  }
}
</script>

<style scoped>

</style>


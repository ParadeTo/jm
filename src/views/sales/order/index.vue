<template>
  <!-- todo 这是公共的页面 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        placeholder="订单单号"
        style="width: 200px;"
        v-model="query.orderNo"
      />
      <el-date-picker
        end-placeholder="结束日期"
        placeholder="订单时间"
        range-separator="至"
        start-placeholder="开始日期"
        type="daterange"
        v-model="daterange"
      ></el-date-picker>
      <el-select
        @change="handleFilter"
        clearable
        placeholder="订单状态"
        style="width: 130px"
        v-model="query.status"
      >
        <el-option
          :key="item.code"
          :label="item.desc"
          :value="item.code"
          v-for="item in ((purchaseOrderParams && purchaseOrderParams.status) || {})"
        />
      </el-select>
      <el-button @click="handleFilter" icon="el-icon-search" type="primary" v-waves>查询</el-button>
    </div>
    <el-row style="margin-bottom: 20px;">
      <el-button @click="addOrder" icon="el-icon-plus" type="primary" v-waves>新增订单</el-button>
      <el-button @click="orderTemp" icon="el-icon-tickets" type="success" v-waves>订单模板</el-button>
    </el-row>

    <my-table :cols="cols" :getListApi="getPurchaseOrder" :query="query" ref="table">
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        label="操作"
        min-width="100"
        slot="action"
      >
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" size="mini" type="primary">修改</el-button>
          <el-button @click="del(scope.row)" size="mini" type="primary">查看</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { getPurchaseOrder } from '@/api/pdos/supply/purchase'
import { parseTime } from '@/utils'

// 改造成公共的组件
export default {
  data() {
    return {
      query: {
        orderNo: '',
        gmtCreatedBegin: '',
        gmtCreatedEnd: '',
        status: ''
      },
      daterange: '',
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'orderNo',
        label: '订单单号'
      },{
        key: 'supplierName',
        label: '供应商名称'
      },{
        key: 'skus',
        label: 'SKU数'
      },{
        key: 'amount',
        label: '总数量'
      },{
        key: 'fee',
        label: '总金额'
      },{
        key: 'gmtCreated',
        label: '创建时间'
      },{
        key: 'status',
        label: '订单状态'
      }]
    }
  },

  watch: {
    daterange(val) {
      if (val.length > 0) {
        this.query.gmtCreatedBegin=parseTime(val[0],'{y}-{m}-{d}')
        this.query.gmtCreatedEnd=parseTime(val[1],'{y}-{m}-{d}')
      }
    }
  },

  computed: mapGetters(['purchaseOrderParams']),

  mounted() {
    !this.purchaseOrderParams&&this.updatePurchaseOrder()
  },

  methods: {
    ...mapActions(['updatePurchaseOrder']),
    handleFilter() { this.$refs.table.updateListFunc() },
    addOrder() {
      this.$router.push({ name: 'salesOrderAdd' })
    },
    orderTemp() {
      this.$router.push({ name: 'salesTemplate' })
    },
    getPurchaseOrder
  }
}
</script>

<style scoped>
</style>


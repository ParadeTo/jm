<template>
  <!-- 销售单，！不是销售订单 -->
  <div class="app-container">
    <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="销售单号、客户名称关键字搜索" v-model="query.keyword" />
        <!-- <el-date-picker
          placeholder="销售单时间"
          v-model="query.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker> -->
        <!-- <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="订单状态">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select> -->
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addSalesTicket">新增销售单</el-button>
      <!-- <el-button type="success" v-waves icon="el-icon-tickets" @click="orderTemp">订单模板</el-button> -->
    </el-row>

    <my-table
      :getListApi="getDeliveryOrderByPage"
      :query="query"
      :cols="cols"
      ref="table"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button circle icon="el-icon-view" @click="view(scope.row)" type="primary"></el-button>
          <el-button circle icon="el-icon-edit" @click="edit(scope.row)" type="default"></el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getDeliveryOrderByPage } from '@/api/pdos/delivery'

export default {
  data () {
    return {
      pageSize: 10,
      list: [],
      total: 0,
      query: {
        keyword: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'orderNo',
        label: '销售单单号'
      }, {
        key: 'purchaserName',
        label: '客户名称'
      }, {
        key: 'skus',
        label: 'SKU数'
      }, {
        key: 'quantitys',
        label: '总数量'
      }, {
        key: '',
        label: '发货SKU数'
      }, {
        key: 'shippedQuantity',
        label: '发货数量'
      }, {
        key: 'amount',
        label: '总金额'
      }, {
        key: 'status',
        label: '订单状态',
        transform: val => {
          if (this.deliveryOrderParams) {
            const item = this.deliveryOrderParams.status.find(s => Number(s.code) === Number(val))
            return item.desc
          }
        }
      }, {
        key: 'gmtModified',
        label: '操作时间'
      }, {
        key: 'creatorName',
        label: '操作者'
      }]
    }
  },

  computed: mapGetters('pdos', ['deliveryOrderParams']),

  async mounted() {
    if (!this.deliveryOrderParams) {
      await this.updateDeliveryOrderParams()
      this.$refs.table.updateListFunc()
    }
  },

  methods: {
    ...mapActions('pdos', ['updateDeliveryOrderParams']),
    getDeliveryOrderByPage,
    handleFilter () {
      this.$refs.table.updateListFunc()
    },
    addSalesTicket () {
      this.$router.push({ name: 'salesTicketAdd' })
    },
    view(row) {
      this.$router.push({ name: 'salesTicketDetail', params: { id: row.id } })
    },
    edit(row) {
      this.$router.push({ name: 'salesTicketEdit', params: { id: row.id } })
    },
    orderTemp () {
      this.$router.push({ name: 'salesTemplate' })
    }
  }
}
</script>

<style scoped>

</style>


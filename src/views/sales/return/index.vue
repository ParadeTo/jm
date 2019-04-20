<template>
  <div class="app-container">
    <el-form inline class="filter-container">
        <el-form-item label="退货单号">
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
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addReturn">新增退货单</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :getListApi="getReturnOrderByPage"
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
import { getReturnOrderByPage } from '@/api/pdos/return'

export default {
  data () {
    return {
      query: {
        code: '',
        daterange: '',
        status: ''
      },
      statusList: [{
        key: '0',
        label: '全部'
      }],
      cols: [{
        key: 'orderNo',
        label: '退货单单号'
      }, {
        key: 'supplierName',
        label: '供应商名称'
      }, {
        key: 'creatorName',
        label: '操作人'
      }, {
        key: 'skus',
        label: 'SKU数'
      }, {
        key: 'quantitys',
        label: '总数量'
      }, {
        key: 'amount',
        label: '总金额'
      }, {
        key: 'gmtCreated',
        label: '创建时间'
      }, {
        key: 'status',
        label: '状态',
        transform: val => {
          if (this.returnOrderParams) {
            const item = this.returnOrderParams.status.find(s => Number(s.code) === Number(val))
            return item.desc
          }
        }
      }]
    }
  },

  computed: mapGetters('pdos', ['returnOrderParams']),

  async mounted() {
    if (!this.returnOrderParams) {
      await this.updateReturnOrderParams()
      this.$refs.table.updateListFunc()
    }
  },

  methods: {
    ...mapActions('pdos', ['updateReturnOrderParams']),
    getReturnOrderByPage,
    handleFilter () {},
    view () {},
    addReturn () {
      this.$router.push({ name: 'salesReturnAdd' })
    },
    view(row) {
      this.$router.push({ name: 'salesReturnDetail', params: { id: row.id } })
    },
    edit(row) {
      this.$router.push({ name: 'salesReturnEdit', params: { id: row.id } })
    },
  }
}
</script>

<style scoped>

</style>


<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="订单单号">
        <el-input v-model="query.code" placeholder="" />
      </el-form-item>
      <el-form-item label="订单时间">
        <el-date-picker
          v-model="query.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.cashier" placeholder="">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addOrderTemp">新增订单模板</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  data () {
    return {
      query: {
        code: '',
        daterange: '',
        status: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'name',
        label: '模板名称'
      }, {
        key: 'provider',
        label: '供应商名称'
      }, {
        key: 'sku',
        label: 'SKU数'
      }, {
        key: 'number',
        label: '总数量'
      }, {
        key: 'amount',
        label: '总金额'
      }, {
        key: 'createTime',
        label: '创建时间'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    addOrderTemp () {
      this.$router.push({ name: 'cargoOrderTempAdd' })
    },
    edit () {

    },
    view () {},
    async updateTableFunc ({page, limit}) {
      const response = await fetchList({page, limit})
      return {
        list: response.data.items,
        total: response.data.total
      }
    },
  }
}
</script>


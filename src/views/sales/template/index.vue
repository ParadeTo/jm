<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="模板名称">
        <el-input v-model="query.keyword" placeholder="" />
      </el-form-item>
      <!-- <el-form-item label="订单时间">
        <el-date-picker
          v-model="query.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="客户">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.cashier" placeholder="">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item> -->
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addOrderTemp">新增订单模板</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :getListApi="getPurchaseOrderTemplateByPage"
      :query="query"
      @current-change="handleTableCurrentChange"
      style="margin-top: 20px;"
      ref="table"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button circle icon="el-icon-view" @click="view(scope.row)" type="primary"></el-button>
          <el-button circle icon="el-icon-edit" @click="edit(scope.row)" type="default"></el-button>
          <el-button circle icon="el-icon-delete" @click="del(scope.row)" type="danger"></el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { getPurchaseOrderTemplateByPage, delPurchaseOrderTemplate } from '@/api/pdos/template'

export default {
  props: ['isForSelect'],
  data () {
    return {
      query: {
        keyword: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'templateName',
        label: '模板名称'
      }, {
        key: 'supplierName',
        label: '客户名称' // 后面可能还得改
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
      }]
    }
  },

  methods: {
    getPurchaseOrderTemplateByPage,
    handleTableCurrentChange (selection) {
      this.$emit('current-change', selection)
    },
    handleFilter () {
      this.$refs.table.updateListFunc()
    },
    addOrderTemp () {
      this.$router.push({ name: 'salesTemplateAdd' })
    },
    view(row) {
      this.$router.push({ name: 'salesTemplateDetail', params: { id: row.id } })
    },
    edit(row) {
      this.$router.push({ name: 'salesTemplateEdit', params: { id: row.id } })
    },
    async del(row) {
      try {
        await this.$confirm('确认删除?', '提示')
        await delPurchaseOrderTemplate(row.id)
        this.$refs.table.updateListFunc()
      } catch (e) {}
    }
  }
}
</script>


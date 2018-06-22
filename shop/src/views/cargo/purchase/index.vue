<template>
  <div class="app-container">
    <el-form inline class="filter-container">
        <el-form-item label="进货单号">
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
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addPurchase">新增进货单</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
        key: '0',
        label: '全部'
      }],
      cols: [{
        key: 'code',
        label: '进货单单号'
      }, {
        key: 'name',
        label: '订单单号'
      }, {
        key: 'provider',
        label: '供应商名称'
      }, {
        key: 'sku',
        label: 'SKU数差异'
      }, {
        key: 'number',
        label: '总数量差异'
      }, {
        key: 'type',
        label: '总金额差异'
      }, {
        key: 'name',
        label: '收货时间'
      }, {
        key: 'name',
        label: '状态'
      }]
    }
  },

  methods: {
    handleFilter () {},
    view () {},
    addPurchase () {
      this.$router.push({ name: 'cargoPurchaseAdd' })
    },
    async updateTableFunc ({page, limit}) {
      const response = await fetchList({page, limit})
      return {
        list: response.data.items,
        total: response.data.total
      }
    }
  }
}
</script>

<style scoped>

</style>


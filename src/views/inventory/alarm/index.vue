<template>
  <!-- 报溢报损 -->
  <div class="app-container">
    <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="单号" v-model="query.number" />
        <el-date-picker
          placeholder="时间"
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
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addOrder">新增</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="view(scope.row)">修改</el-button> -->
          <el-button type="primary" size="mini" @click="del(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

// 改造成公共的组件
export default {
  data () {
    return {
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
        label: '单号'
      }, {
        key: 'operator',
        label: '操作人'
      }, {
        key: 'sku',
        label: '总SKU数'
      }, {
        key: 'sku2',
        label: '数量'
      }, {
        key: 'time',
        label: '时间'
      }, {
        key: 'type',
        label: '单据类型'
      }, {
        key: 'status',
        label: '状态'
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


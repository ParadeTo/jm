<template>
  <div class="app-container">
    <el-date-picker
      v-model="query.daterange"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickOptions">
    </el-date-picker>

    <div style="margin: 20px 0;">
      <span class="item">
        <label>时间：</label>
        xxx
      </span>
      <span class="item">
        <label>总客户数：</label>
        123456789465
      </span>
      <span class="item">
        <label>总提成：</label>
        xxx有限公司
      </span>
    </div>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import pickOptions from './pickOptions.js'

export default {
  data () {
    return {
      query: {
        datarange: '',
        referrer: ''
      },
      pickOptions,
      cols: [{
        key: 'code',
        label: '时间'
      }, {
        key: 'name',
        label: '新增客户数'
      }, {
        key: 'provider',
        label: '客户总交易额'
      }, {
        key: 'sku',
        label: '提成'
      }, {
        key: 'number',
        label: '提成状态'
      }]
    }
  },

  methods: {
    view () {

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

<style rel="stylesheet/scss" lang="scss" scoped>
.item {
  margin-right: 20px;
}
</style>

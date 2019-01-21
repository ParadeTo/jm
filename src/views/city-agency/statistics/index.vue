<template>
  <div class="app-container">
    <el-row :gutter="40">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix header" @click="$router.push({ name: 'cityAgencyStatisticsClient' })">
            <span>本月新增客户数</span>
            <el-button icon="el-icon-arrow-right" style="float: right; padding: 3px 0" type="text" />
          </div>
          <div class="content">
            <strong>10</strong>
            <p>上月新增客户数：12</p>
            <p>累计客户数：100</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix header">
            <span>本月总提成</span>
            <el-button icon="el-icon-arrow-right" style="float: right; padding: 3px 0" type="text" />
          </div>
          <div class="content">
            <strong>700.00</strong>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="filter-container">
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
      <el-input v-model="query.referrer" style="width: 200px;" placeholder="请输入推荐人/手机查询" />
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
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
        label: '微信支付'
      }, {
        key: 'provider',
        label: '支付宝支付'
      }, {
        key: 'sku',
        label: '现金支付'
      }, {
        key: 'number',
        label: '刷卡'
      }, {
        key: 'type',
        label: '线上收入'
      }, {
        key: 'name',
        label: '总收入'
      }]
    }
  },

  methods: {
    view () {

    },
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  margin: 20px 0;
}
.header:hover {
  cursor: pointer;
}
.content {
  text-align: center;
  height: 9rem;
  strong {
    color: #409EFF;
    font-size: 3rem;
  }
}
</style>

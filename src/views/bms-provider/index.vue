<template>
  <div class="app-container">
    <el-tabs v-model="tableIndex" @tab-click="handleTabClick">
      <el-tab-pane label="未审核" name="0">
      </el-tab-pane>
      <el-tab-pane label="已审核" name="1">
      </el-tab-pane>
    </el-tabs>

    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="店铺名称">
        <el-input v-model="query.store" placeholder="" />
      </el-form-item>
      <el-form-item label="推荐人">
        <el-input v-model="query.referee" placeholder="" style="width: 100px;" />
      </el-form-item>
      <el-form-item label="行业">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in industryList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <my-address />
      </el-form-item>
      <el-form-item label="门店状态" v-if="type==1">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row v-if="type==1">
      <el-button type="danger" v-waves @click="dialogVisible=true">停止营业</el-button>
    </el-row>

    <my-table
      v-if="type==0"
      :cols="colsUnAudit"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </my-table>

    <my-table
      v-if="type==1"
      :cols="colsAudit"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <!-- <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </my-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  data () {
    return {
      dialogVisible: false,
      type: 0,
      query: {
        store: '',
        referee: ''
      },
      industryList: [{
        label: '食品',
        key: 1
      }, {
        label: '化工',
        key: 0
      }],
      statusList: [{
        label: '营业中',
        key: 1
      }, {
        label: '关门中',
        key: 0
      }],
      colsUnAudit: [{
        key: 'logo',
        label: '店铺logo'
      }, {
        key: 'name',
        label: '店铺名称'
      }, {
        key: 'city',
        label: '省市区'
      }, {
        key: 'address',
        label: '详细地址'
      }, {
        key: 'industry',
        label: '所属行业'
      }, {
        key: 'contact',
        label: '联系人'
      }, {
        key: 'referee',
        label: '推荐人'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'authentication',
        label: '实名认证'
      }, {
        key: 'enterprise',
        label: '企业认证'
      }, {
        key: 'cash',
        label: '提现认证'
      }, {
        key: 'status',
        label: '门店状态'
      }, {
        key: 'time',
        label: '提交时间'
      }],
      colsAudit: [{
        key: 'logo',
        label: '店铺logo'
      }, {
        key: 'name',
        label: '店铺名称'
      }, {
        key: 'city',
        label: '省市区'
      }, {
        key: 'address',
        label: '详细地址'
      }, {
        key: 'industry',
        label: '所属行业'
      }, {
        key: 'contact',
        label: '联系人'
      }, {
        key: 'referee',
        label: '推荐人'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'cash',
        label: '提现手续费'
      }, {
        key: 'status',
        label: '门店状态'
      }, {
        key: 'time',
        label: '提交时间'
      }]
    }
  },

  methods: {
    audit () {
      this.$router.push({ name: 'shopAudit' })
    },
    handleTabClick (val) {
      this.type = val.name
    },
    handleFilter () {

    },
    edit () {
      this.dialogVisible = true
    },
    view () {
      this.dialogVisible = true
    },
    del () {},
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


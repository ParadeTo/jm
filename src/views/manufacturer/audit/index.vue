<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="厂家名称">
        <el-input v-model="query.store" placeholder="" />
      </el-form-item>
      <!-- <el-form-item label="推荐人">
        <el-input v-model="query.referee" placeholder="" style="width: 100px;" />
      </el-form-item> -->
      <el-form-item label="行业">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in industryList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <my-address />
      </el-form-item>
      <!-- <el-form-item label="厂家状态" v-if="type==1">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item> -->
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row>
      <el-button type="danger" v-waves @click="dialogVisible=true">审核</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
    </my-table>
  </div>
</template>

<script>


export default {
  data () {
    return {
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
      cols: [{
        key: 'logo',
        label: '供应商logo'
      }, {
        key: 'name',
        label: '供应商名称'
      }, {
        key: 'city',
        label: '省市区'
      }, {
        key: 'address',
        label: '详细地址'
      }, {
        key: 'category',
        label: '代理类目'
      }, {
        key: 'area',
        label: '代理区域'
      }, {
        key: 'contact',
        label: '联系人'
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
        label: '供应状态'
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
      
    },
  }
}
</script>


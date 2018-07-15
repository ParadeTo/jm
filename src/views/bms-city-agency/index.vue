<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" v-waves icon="el-icon-tickets">申请列表</el-button>
      <el-button type="primary" v-waves icon="el-icon-">城市代理商管理</el-button>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-button type="default" v-waves icon="el-icon-">导出列表</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <!-- <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button> -->
          <!-- <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button> -->
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
      dialogVisible: false,
      query: {
        name: '',
        status: '',
        type: ''
      },
      typeList: [{
        label: '衣服',
        key: '0'
      }, {
        label: '食品',
        key: '1'
      }],
      statusList: [{
        label: '正常',
        key: '0'
      }, {
        label: '失效',
        key: '1'
      }],
      cols: [{
        key: 'agency',
        label: '代理商'
      }, {
        key: 'contact',
        label: '联系人'
      }, {
        key: 'method',
        label: '联系方式'
      }, {
        key: 'new',
        label: '本月新增商户'
      }, {
        key: 'amount',
        label: '本月商户交易额'
      }, {
        key: 'royalties',
        label: '本月提成'
      }, {
        key: 'time',
        label: '委托时间'
      }],
      formFields: [{
        label: '名称',
        key: 'name'
      }, {
        label: '提现手续费',
        key: 'charge'
      }],
      formModel: {

      }
    }
  },

  methods: {
    handleFilter () {

    },
    edit () {
      this.dialogVisible = true
    },
    view () {
      this.$router.push({ name: 'bmsCityAgencyDetail', params: { id: 1 } })
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


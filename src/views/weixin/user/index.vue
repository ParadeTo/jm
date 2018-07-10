<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="query.nickname" placeholder="" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="query.tel" placeholder="" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in genderList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <my-address />
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <my-table
      :cols="cols"
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
      query: {
        nickname: '',
        tel: ''
      },
      genderList: [{
        label: '男',
        key: 1
      }, {
        label: '女',
        key: 0
      }],
      cols: [{
        key: 'avatar',
        label: '头像'
      }, {
        key: 'nickname',
        label: '昵称'
      }, {
        key: 'gender',
        label: '性别'
      }, {
        key: 'tel',
        label: '手机号'
      }, {
        key: 'city',
        label: '省市'
      }, {
        key: 'consume',
        label: '消费次数'
      }, {
        key: 'amount',
        label: '消费金额'
      }]
    }
  },

  methods: {
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


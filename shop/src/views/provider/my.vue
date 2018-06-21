<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="供应商名称" v-model="query.name">
      </el-input>
      <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.type" placeholder="供应商类型">
        <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button type="success" v-waves @click="add">新增供应商</el-button>
    </div>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="del(scope.row)">删除</el-button>
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
        name: '',
        type: ''
      },
      typeList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'name',
        label: '供应商名称'
      }, {
        key: 'contact',
        label: '联系人'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'industry',
        label: '行业'
      }, {
        key: 'type',
        label: '类型'
      }, {
        key: 'name',
        label: '应付'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    view () {

    },
    del () {

    },
    add () {

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


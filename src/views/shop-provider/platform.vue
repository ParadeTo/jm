<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="供应商名称" v-model="query.name" />
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="商品搜索" v-model="query.product" />
      <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.industry" placeholder="供应商行业">
        <el-option v-for="item in industryList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="del(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>


export default {
  data () {
    return {
      query: {
        name: '',
        product: '',
        industry: ''
      },
      industryList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'name',
        label: '供应商名称'
      }, {
        key: 'industry',
        label: '行业'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'scope',
        label: '经营商品范围'
      }]
    }
  },

  methods: {
    view () {
      this.$router.push({ name: 'providerDetail', params: { id: 1 } })
    },
    del () {},
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

<style scoped>

</style>


<template>
  <!-- todo 这是公共的页面 -->
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="年">
          <el-select style="width: 130px" v-model="query.year">
            <el-option v-for="item in yearList" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>
    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
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
        year: ''
      },
      yearList: [{
        key: 2018,
        label: '2018'
      }, {
        key: 2019,
        label: '2019'
      }, {
        key: 2020,
        label: '2020'
      }],
      cols: [{
        key: 'date',
        label: '日期'
      }, {
        key: 'volumn',
        label: '销售额'
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


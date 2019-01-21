<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="供应商名称"
        v-model="query.provider" />
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="商品名称"
        v-model="query.name" />
      <el-select @change='handleFilter' style="width: 130px" v-model="query.industry" placeholder="行业">
        <el-option v-for="item in industryList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="add(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import ClientAdd from './components/clientAdd'


export default {
  components: {
    ClientAdd
  },

  data () {
    return {
      dialogVisible: false,
      query: {
        name: '',
        industry: '',
      },
      industryList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        label: '门店名称',
        key: 'name'
      }, {
        label: '行业',
        key: 'contact'
      }, {
        label: '经营商品范围',
        key: 'phone'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    view () {

    },
    add () {

    },
    setting () {
      this.$router.push({ name: 'productSetting' })
    },
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

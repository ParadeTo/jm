<template>
  <div class="app-container">
    <el-row>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="客户名称"
        v-model="query.name" />
      <el-select @change='handleFilter' style="width: 130px" v-model="query.category" placeholder="商品类目">
        <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-row>

    <el-row style="margin: 20px 0;">
      <el-button type="success" v-waves icon="el-icon-plus" @click="dialogVisible = true">新增客户</el-button>
      <client-add :dialogVisible="dialogVisible" @close="dialogVisible = false" />
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
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
        type: '',
      },
      typeList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        label: '客户名称',
        key: 'name'
      }, {
        label: '联系人',
        key: 'contact'
      }, {
        label: '联系电话',
        key: 'phone'
      }, {
        label: '行业',
        key: 'industry'
      }, {
        label: '类型',
        key: 'type'
      }, {
        label: '应付',
        key: 'img'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    add () {
      this.$router.push({name: 'productAdd'})
    },
    view () {

    },
    edit () {

    },
    setting () {
      this.$router.push({ name: 'productSetting' })
    },
    async updateTableFunc ({page, limit}) {

    }
  }
}
</script>

<style scoped>

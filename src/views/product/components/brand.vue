<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <!-- TODO: debounce -->
      <el-input v-model="query.keyword" @input="handleChange" style="width: 200px" />
    </el-row>
    <my-table
      :cols="cols"
      :getListApi="getBrandListByPage"
      :query="query"
      ref="table"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </my-table>

    <brand-add
      :dialogVisible="dialogVisible"
      :id="brandId"
      :action="action"
      @close="onClose"
    />
  </div>
</template>

<script>
import BrandAdd from './brandAdd'
import { getBrandListByPage, delBrand } from '@/api/product/brand'

export default {
  components: {
    BrandAdd
  },

  data () {
    return {
      dialogVisible: false,
      query: {
        keyword: ''
      },
      cols: [
      //   {
      //   label: '品牌图片',
      //   key: 'images'
      // }, 
      {
        label: '商品单位名称',
        key: 'name'
      }, {
        label: '所属类目',
        key: 'cateName'
      }, {
        label: '创建时间',
        key: 'gmtCreated'
      }],
      brandId: 0,
      action: ''
    }
  },

  methods: {
    getBrandListByPage,
    handleChange() {
      this.$refs.table.updateListFunc()
    },
    handleAdd () {
      this.action = 'add'
      this.dialogVisible = true
    },
    view (row) {
      this.dialogVisible = true
      this.action = 'view'
      this.brandId = row.id
    },
    edit (row) {
      this.dialogVisible = true
      this.action = 'edit'
      this.brandId = row.id
    },
    async del (row) {
      await delBrand(row.id)
      this.$refs.table.updateListFunc()
    },
    onClose (type) {
      if (type === 'confirm') {
        this.$refs.table.updateListFunc()
      }
      this.dialogVisible = false
      this.action = ''
    },
  }
}
</script>


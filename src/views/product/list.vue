<template>
  <div class="app-container">
    <el-row>
      <el-input
        @keyup.enter.native="handleFilter"
        placeholder="关键字"
        style="width: 200px"
        v-model="query.keyword"
      />
      <el-input
        @keyup.enter.native="handleFilter"
        placeholder="商品条码"
        style="width: 200px"
        v-model="query.barcode"
      />
      <category-select @change="handleCategoryChange" v-model="query.cateId"/>
      <brand-select @change="handleFilter" v-model="query.brandId"/>
      <classify-select @change="handleFilter" v-model="query.classifyId"/>
      <!-- <el-select @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="上/下架">
        <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>-->
      <el-button @click="handleFilter" icon="el-icon-search" type="primary" v-waves>查询</el-button>
    </el-row>

    <el-row style="margin-top: 10px margin-bottom: 10px">
      <el-button @click="add" type="primary" v-waves>新增商品</el-button>
      <el-button @click="del" type="danger" v-waves>删除商品</el-button>
      <el-button @click="impt" type="success" v-waves>导入商品</el-button>
      <!-- <el-button type="default" v-waves @click="toggleOnOff">上/下架</el-button> -->
      <!-- <el-button type="default" v-waves @click="autoOnOff">自动上下架</el-button> -->
      <el-button @click="setting" type="default" v-waves>参数设置</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :getListApi="getProductList"
      :hasSelection="forSelect"
      :query="query"
      ref="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        label="动作"
        min-width="140"
        slot="action"
      >
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" size="mini" type="primary">查看</el-button>
          <el-button @click="edit(scope.row)" size="mini" type="default">修改</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { getProductList } from "@/api/product/index"
import { productCols } from '@/const/product'

export default {
  props: {
    forSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: {
        keyword: '',
        barcode: '',
        cateId: '',
        brandId: '',
        classifyId: '',
        status: ''
      },
      statusList: [
        {
          key: 0,
          label: '上架'
        }
      ],
      cols: productCols
    }
  },

  methods: {
    ...mapActions(['updateBrand','updateClassify']),
    handleCategoryChange(cateId) {
      this.updateBrand(cateId)
      this.updateClassify(cateId)
    },
    handleSelectionChange (selection) {
      this.$emit('selection-change', selection)
      console.log(selection)
    },
    handleFilter() {
      this.$refs.table.updateListFunc()
    },
    add() {
      this.$router.push({ name: 'productAdd' })
    },
    view() { },
    impt() { },
    edit() { },
    del() { },
    setting() {
      this.$router.push({ name: 'productSetting' })
    },
    getProductList
  }
}
</script>

<style scoped>
</style>


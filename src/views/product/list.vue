<template>
  <div class="app-container">
    <el-row style="margin-bottom: 10px;">
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
      <classify-select @change="handleFilter" v-model="query.classifyId"/>
      <brand-select @change="handleFilter" v-model="query.brandId"/>
      <!-- <el-select @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="上/下架">
        <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>-->
      <el-button @click="handleFilter" icon="el-icon-search" type="primary" v-waves>查询</el-button>
    </el-row>

    <el-row style="margin-bottom: 10px;" v-if="!isForSelect">
      <el-button @click="add" type="primary" v-waves>新增商品</el-button>
      <el-button @click="impt" type="success" v-waves>导入商品</el-button>
      <!-- <el-button type="default" v-waves @click="toggleOnOff">上/下架</el-button> -->
      <!-- <el-button type="default" v-waves @click="autoOnOff">自动上下架</el-button> -->
      <el-button @click="setting" type="default" v-waves>参数设置</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :getListApi="getProductList"
      :multiSelection="isForSelect"
      :query="query"
      :selected="selected"
      rowKey="skuId"
      ref="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        label="动作"
        min-width="80"
        slot="action"
      >
        <template slot-scope="scope">
          <!-- <i class="el-icon-view" @click="view(scope.row)" /> -->
          <el-button circle icon="el-icon-view" @click="view(scope.row)" type="primary"></el-button>
          <el-button circle icon="el-icon-edit" @click="edit(scope.row)" type="default" v-if="!isForSelect"></el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getProductList } from "@/api/product/index"
import { productCols } from '@/const/product'

export default {
  props: {
    isForSelect: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array
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
    ...mapMutations(["UPDATE_BRAND", "UPDATE_CLASSIFY"]),
    ...mapActions(['updateBrand','updateClassify']),
    handleCategoryChange(cateId) {
      this.query.brandId = ''
      this.query.classifyId = ''
      this.updateAccordingToCate(cateId);
    },
    async updateAccordingToCate(cateId) {
      if (Number(cateId) === 0) {
        this.UPDATE_BRAND([]);
        this.UPDATE_CLASSIFY([]);
        return;
      }
      await Promise.all([
        this.updateBrand(cateId),
        this.updateClassify(cateId)
      ]);
    },
    handleSelectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    handleFilter() {
      this.$refs.table.updateListFunc()
    },
    add() {
      this.$router.push({ name: 'productAdd' })
    },
    view(row) {
      this.$router.push({ name: 'productDetail', params: { id: row.productId } })
    },
    impt() { },
    edit(row) {
      this.$router.push({ name: 'productEdit', params: { id: row.productId } })
    },
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


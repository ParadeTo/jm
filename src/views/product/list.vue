<template>
  <div class="app-container">
    <el-row>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="关键字"
        v-model="query.keyword"
      />
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="商品条码"
        v-model="query.barcode"
      />
      <category-select v-model="query.cateId" @change="handleCategoryChange" />
      <brand-select v-model="query.brandId" @change="handleFilter" />
      <classify-select v-model="query.classifyId" @change="handleFilter" />
      <!-- <el-select @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="上/下架">
        <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>-->
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-row>

    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-button type="primary" v-waves @click="add">新增商品</el-button>
      <el-button type="danger" v-waves @click="del">删除商品</el-button>
      <el-button type="success" v-waves @click="impt">导入商品</el-button>
      <!-- <el-button type="default" v-waves @click="toggleOnOff">上/下架</el-button> -->
      <!-- <el-button type="default" v-waves @click="autoOnOff">自动上下架</el-button> -->
      <el-button type="default" v-waves @click="setting">参数设置</el-button>
    </el-row>

    <my-table :cols="cols" :list="list" :total="total" :updateListFunc="updateTableFunc">
      <el-table-column
        slot="action"
        align="center"
        label="动作"
        min-width="140"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getProductList } from "@/api/product"

export default {
  data() {
    return {
      pageSize: 10,
      list: [],
      total: 0,
      query: {
        keyword: "",
        barcode: "",
        cateId: "",
        brandId: "",
        classifyId: "",
        status: ""
      },
      statusList: [
        {
          key: 0,
          label: "上架"
        }
      ],
      cols: [
        {
          label: "条码",
          key: "barcode"
        },
        {
          label: "商品图片",
          key: "images"
        },
        {
          label: "商品名称",
          key: "skuName"
        },
        {
          label: "商品品牌",
          key: "brand"
        },
        {
          label: "商品类目",
          key: "img"
        },
        {
          label: "商品分类",
          key: "img"
        },
        {
          label: "单位",
          key: "img"
        },
        {
          label: "库存",
          key: "img"
        },
        {
          label: "销售价",
          key: "price"
        },
        {
          label: "上下架状态",
          key: "delFlag",
          transform: value => (value === 1 ? "已删除" : "可用")
        }
      ]
    };
  },

  methods: {
    ...mapActions([
      'updateBrand',
      'updateClassify'
    ]),
    handleCategoryChange (cateId) {
      this.updateBrand(cateId)
      this.updateClassify(cateId)
    },
    async handleFilter() {
      const response = await getProductList({ currentPage: 1, pageSize: this.pageSize, ...this.query })
      if (response.data.data) {
        this.list = response.data.data.items
        this.total = response.data.data.pageInfo.totalCount
      }
    },
    add() {
      this.$router.push({ name: "productAdd" });
    },
    view() {},
    impt() {},
    edit() {},
    del() {},
    setting() {
      this.$router.push({ name: "productSetting" });
    },
    async updateTableFunc({ currentPage, pageSize }) {
      this.pageSize = pageSize
      const response = await getProductList({ currentPage, pageSize, ...this.query })
      if (response.data.data) {
        this.list = response.data.data.items
        this.total = response.data.data.pageInfo.totalCount
      }
    }
  }
};
</script>

<style scoped>
</style>


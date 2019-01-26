<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="模板名称：">
        2017110814213007
      </el-form-item>
      <el-form-item label="供应商：">
        广州天河社区贸易有限公司
      </el-form-item>
      <el-form-item label="SKU数：">
        10
      </el-form-item>
      <el-form-item label="总数：">
        100
      </el-form-item>
      <el-form-item label="总金额：">
        230.00
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <el-form :inline="true" :model="formModel" class="demo-form-inline">
        <el-row>
          <el-form-item label="供应商商品条码">
            <el-input v-model="formModel.code" placeholder="" />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="formModel.name" placeholder="" />
          </el-form-item>
          <el-form-item label="售价">
            <el-input v-model="formModel.price" placeholder="" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="商品品牌">
            <el-select clearable style="width: 130px" v-model="formModel.brand" placeholder="">
              <el-option v-for="item in brandList" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input style="width: 80px" v-model="formModel.number" placeholder="" />
            <unit-select v-model="formModel.unit"/>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="门店商品信息">
            --
          </el-form-item>
          <el-form-item label="进货价">
            --
          </el-form-item>
        </el-row>

        <el-row>
          <el-button type="default" @click="dialogVisible=true">选择商品</el-button>
          <!-- <el-button type="default" @click="del(scope.row)">匹配门店商品</el-button> -->
          <!-- <el-button type="primary" @click="del(scope.row)">添加/保存</el-button> -->
        </el-row>
      </el-form>
    </el-card>

    <el-dialog title="导入商品" :visible.sync="dialogVisible" width="80%">
      <product-list :forSelect="true" @selection-change="handleSelectionChange"/>
    </el-dialog>

    <el-card style="margin-top: 20px;">
      <el-table
      :data="products"
      element-loading-text="loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column :key="k" v-for="(col, k) in cols" align="center" :label="col.label">
        <template slot-scope="scope">
          <img :src="scope.row[col.key]" v-if="col.img">
          <span v-else>{{getValue(col, scope.row)}}</span>
        </template>
      </el-table-column>
      <slot name="action"></slot>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import ProductList from '@/views/product/list'
import { productCols } from '@/const/product'

export default {
  components: {
    ProductList
  },
  data () {
    return {
      dialogVisible: false,
      products: [],
      formModel: {
        code: '',
        brand: '',
        name: '',
        number: '',
        unit: '',
        price: ''
      },
      brandList: [{
        key: 0,
        label: '蓝月亮'
      }],
      unitList: [{
        key: 0,
        label: '瓶'
      }],
      cols: productCols
    }
  },

  methods: {
    handleSelectionChange (selection) {
      this.products = selection
    },
    getValue (col, row) {
      const value = row[col.key]
      return col.transform ? col.transform(value) : value
    },
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-right: 15px;
}

</style>

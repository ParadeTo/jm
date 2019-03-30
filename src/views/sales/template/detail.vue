<template>
  <div class="app-container">
    <el-form :model="formModel" label-position="right" label-width="100px">
      <el-form-item label="模板名称：" prop="name">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="门店：">
        <el-input style="width: 160px;" readonly v-model="formModel.customer.name" />
        <el-button type="default" @click="pickCustomer">选择门店</el-button>
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

    <el-button type="default" @click="productDialogVisible=true">选择商品</el-button>

    <el-dialog title="选择门店" :visible.sync="customerDialogVisible" width="80%" style="max-height: 90vh;">
      <my-customer isForSelect @current-change="handleCurrentChange"/>
    </el-dialog>

    <el-dialog title="导入商品" :visible.sync="productDialogVisible" width="80%" style="max-height: 90vh;">
      <product-list isForSelect :selected="products" @selection-change="handleSelectionChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
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
import MyCustomer from '@/views/client/my'
import ProductList from '@/views/product/list'
import { productCols } from '@/const/product'

export default {
  components: {
    ProductList,
    MyCustomer
  },

  props: {
    forOrder: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      customerDialogVisible: false,
      productDialogVisible: false,
      products: [],
      formModel: {
        customer: {},
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
    confirm () {

    },
    cancel () {

    },
    handleCurrentChange (data) {
      if (data) {
        this.customerDialogVisible = false
        this.formModel.customer = data
      }
    },
    handleSelectionChange (selection) {
      this.products = selection
    },
    pickCustomer () {
      this.customerDialogVisible = true
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

<template>
<!-- sku price 是商品的价格，只做参考用
    sku 还有一个销售价格
 -->
  <div class="app-container">
    <el-form inline :model="formModel" label-position="right" label-width="100px">
      <el-form-item label="模板名称：" prop="name" v-if="!forOrder">
        <el-input style="width: 300px;" v-model="formModel.templateName" />
      </el-form-item>
      <el-form-item label="选择模板：" prop="name" v-else>
        <el-input style="width: 160px;" readonly v-model="formModel.template.templateName" />
        <el-button type="default" @click="pickTemplate">选择模板</el-button>
      </el-form-item>
      <el-form-item label="门店：">
        <el-input style="width: 160px;" readonly v-model="formModel.customer.name" />
        <el-button type="default" @click="pickCustomer">选择门店</el-button>
      </el-form-item>
      <el-form-item label="SKU数：">
        {{products.length}}
      </el-form-item>
      <el-form-item label="总数：">
        {{quantitys}}
      </el-form-item>
      <el-form-item label="总金额：" v-if="forOrder">
        {{amount}}
      </el-form-item>
    </el-form>

    <el-button type="default" @click="productDialogVisible=true" :disabled="!formModel.customer.name">选择商品</el-button>
    <el-button type="primary" @click="save" :disabled="!formModel.customer.name">保存</el-button>

    <el-dialog title="选择门店" :visible.sync="customerDialogVisible" width="80%" style="max-height: 90vh;">
      <my-customer isForSelect @current-change="handleCustomerChange"/>
    </el-dialog>

    <el-dialog title="选择模板" :visible.sync="templateDialogVisible" width="80%" style="max-height: 90vh;">
      <template-list isForSelect @current-change="handleTemplateChange"/>
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
          <el-input v-else-if="col.key === 'salesPrice'" v-model="scope.row.salesPrice" />
          <span v-else>{{getValue(col, scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        label="数量"
        min-width="80"
      >
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.quantity" min="1" />
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import MyCustomer from '@/views/client/my'
import ProductList from '@/views/product/list'
import TemplateList from '@/views/sales/template/index'
import { productCols } from '@/const/product'
import { getLastOrderItem, addPurchaseOrder } from '@/api/pdos/purchase'
import { addPurchaseOrderTemplate, getPurchaseOrderTemplateDetail } from '@/api/pdos/template'

export default {
  components: {
    ProductList,
    TemplateList,
    MyCustomer
  },

  props: {
    forOrder: {
      type: Boolean,
      default: false
    }
  },

  data () {
    const cols = productCols.filter(p => {
      if (!this.forOrder && p.key === 'price') return false
      return true
    })
    if (this.forOrder) {
      cols.push({
        label: '销售价',
        key: 'salesPrice'
      })
    }
    return {
      customerDialogVisible: false,
      templateDialogVisible: false,
      productDialogVisible: false,
      products: [],
      cachedProducts: [],
      formModel: {
        template: {},
        customer: {},
        code: '',
        brand: '',
        templateName: '',
        quantitys: '',
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
      cols
    }
  },

  computed: {
     amount () {
       return this.products.reduce((a, b) => a + b.salesPrice * b.quantity, 0)
     },
     quantitys () {
       return this.products.reduce((a, b) => a + Number(b.quantity), 0)
     }
  },

  methods: {
    async save () {
      const { id, name } = this.formModel.customer
      if (this.forOrder) {
        await addPurchaseOrder({
          purchaserUserId: id,
          purchaserName: name,
          amount: this.amount,
          orderItems: this.products.map(p => ({
            productNo: p.skuId,
            productName: p.skuName,
            specification: p.unitName,
            quantity: p.quantity,
            price: p.salesPrice,
            amount: p.quantity * p.salesPrice
          }))
        })
      } else {
        const {
          amount,
          quantitys,
          products,
          formModel: { customer }
        } = this
        await addPurchaseOrderTemplate({
          // consignee:null,
          // consigneeAddress:null,
          // consigneeAreaCode:null,
          // consigneeAreaName:null,
          // consigneeMobile:null,
          amount,
          quantitys,
          // remark:null,
          skus: products.length,
          templateType: 1,
          purchaserUserId: customer.id,
          purchaserName: customer.name,
          templateName: this.formModel.templateName,
          // supplierUserId: 1,
	        // supplierName: "测试供应商",
          orderItems: this.products.map(p => ({
            productNo: p.skuId,
            productName: p.skuName,
            quantity: p.quantity,
            price: p.price,
            amount: p.quantity * p.price
          }))
            // orderItems:[
            //     {
            //       productNo:0123456789123,
            //       productName:恰恰葵花籽,
            //       specification:250g,
            //       specifications:1,
            //       amount:10,
            //       price:12,
            //       quantity:10
            //   }
            // ]
        })
      }
    },
    async confirm () {
      const productNos = this.cachedProducts.map(p => p.skuId)
      const rsp = await getLastOrderItem({
        purchaserUserId: this.formModel.customer.id,
        productNos
      })
      if (rsp.data && rsp.data.data) {
        const orderItemInfoList = rsp.data.data
        this.products = this.cachedProducts.map(p => {
          const item = orderItemInfoList.find(item => item.productNo === p.skuId)
          const res = p
          if (item) res.salesPrice = item.price
          return res
        })
      }
      this.productDialogVisible = false
    },
    cancel () {
      this.productDialogVisible = false
    },
    handleCustomerChange (data) {
      const {
        formModel
      } = this
      if (data) {
        this.customerDialogVisible = false
        formModel.customer = data
        if (!formModel.templateName) formModel.templateName = `${formModel.customer.name}-模板`
      }
    },
    async handleTemplateChange (data) {
      this.formModel.template = data
      const rsp = await getPurchaseOrderTemplateDetail(data.id) // 得到模板的详情，主要是得到product列表
      debugger
      if (rsp && rsp.data.data) {
        const {
          orderItems,
          purchaserName,
          purchaserUserId,
        } = rsp.data.data
        this.formModel.customer = {
          id: purchaserUserId,
          name: purchaserName
        }
        debugger
        this.products = orderItems.map(item => {
          const {
            barCode,
            brandName,
            productName: skuName,
            productNo,
            unitName,
            price,
            quantity,
            costPrice
          } = item
          return {
            barCode,
            skuName,
            skuId: Number(productNo),
            brandName,
            cateName: '',
            classifyName: '',
            unitName,
            price,
            quantity,
            salesPrice: costPrice
          }
        })
      }
      this.templateDialogVisible = false
    },
    handleSelectionChange (selection) {
      if (!this.forOrder) {
        this.products = selection.map(s => ({
          ...s,
          quantity: 1
        }))
      } else {
        this.cachedProducts = selection.map(s => ({
          ...s,
          salesPrice: s.price,
          quantity: 1
        }))
      }
    },
    pickCustomer () {
      this.customerDialogVisible = true
    },
    pickTemplate () {
      this.templateDialogVisible = true
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

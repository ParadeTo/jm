<template>
  <!--
    使用到这个页面的有：
    新建编辑模板，模板详情
    新建编辑订单，订单详情
    新建编辑销售单，销售单详情
   -->
  <div class="app-container">
    <el-form inline :model="formModel" label-position="right" label-width="100px">
      <el-form-item label="模板名称：" prop="name" v-if="!forOrder">
        <el-input style="width: 300px;" v-model="formModel.templateName" />
      </el-form-item>
      <el-form-item label="选择模板：" prop="name" v-else-if="forOrder && action==='add'">
        <el-input style="width: 160px;" readonly v-model="formModel.template.templateName" />
        <el-button type="default" @click="pickTemplate">选择模板</el-button>
      </el-form-item>
      <el-form-item label="客户：">
        <el-input style="width: 160px;" readonly v-model="formModel.customer.name" />
        <el-button type="default" @click="pickCustomer" v-if="action!=='view' && !editDisabled">我的客户</el-button>
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

    <template v-if="action!=='view'">
      <el-button
        v-if="!editDisabled"
        type="default"
        @click="productDialogVisible=true"
        :disabled="!formModel.customer.name">
        选择商品
      </el-button>
      <el-button
        v-if="!editDisabled"
        type="primary"
        @click="save"
        :disabled="!formModel.customer.name">
        {{ forOrder ? '暂存' : '保存' }}
      </el-button>
      <el-button
        type="default"
        @click="goBack">
        取消
      </el-button>
      <slot name="moreOperation"></slot>
    </template>
    <template v-else>
      <el-button
        type="default"
        @click="goBack">
        返回列表
      </el-button>
    </template>

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
            <img :src="scope.row[col.key]" v-if="col.type === 'img'">
            <span v-else-if="col.render">{{col.render(scope.row)}}</span>
            <el-input type="number" :min="0" v-else-if="col.type === 'input'" v-model="scope.row[col.key]" />
            <span v-else>{{getValue(col, scope.row)}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          label="数量"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.quantity" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          label="数量"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.quantity" />
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          label="动作"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-button circle icon="el-icon-delete" @click="del(scope.row)" type="danger" />
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
import { getLastOrderItem } from '@/api/pdos/purchase'
import {
  addPurchaseOrderTemplate,
  getPurchaseOrderTemplateDetail,
  editPurchaseOrderTemplate
} from '@/api/pdos/template'
import { deepClone } from '@/utils'

const productCols = [
  {
    label: '条码',
    key: 'barCode',
    minWidth: '120'
  },
  {
    label: '商品图片',
    key: 'images'
  },
  {
    label: '商品名称',
    key: 'productName',
    minWidth: '150'
  },
  {
    label: '商品品牌',
    key: 'brandName'
  },
  // {
  //   label: '商品类目',
  //   key: 'cateName'
  // },
  // {
  //   label: '商品分类',
  //   key: 'classifyName'
  // },
  {
    label: '单位',
    key: 'unitName',
    width: '80'
  },
  {
    label: '价格',
    key: 'skuPrice',
    width: '80',
    type: 'input'
  },
  {
    label: '数量',
    key: 'quantity',
    type: 'input'
  }
]

export default {
  components: {
    ProductList,
    TemplateList,
    MyCustomer
  },

  props: {
    id: {
      type: Number
    },
    forOrder: {
      type: Boolean,
      default: false
    },
    initData: {
      type: Function
    },
    initFormModel: {
      type: Object
    },
    initProducts: {
      type: Array
    },
    action: {
      type: String,
      default: 'view'
    },
    afterTemplateChange: {
      type: Function,
      default: () => {}
    },
    saveFunc: {
      type: Function
    },
    editDisabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    const cols = [...productCols]
    if (this.forOrder) {
      cols.forEach(col => {
        if (col.key === 'skuPrice') col.type = null
      })
      cols.push(...[{
        label: '销售价',
        key: 'price',
        type: 'input'
      }, {
        label: '金额',
        key: 'skuAmount',
        render: (row) => row.price * row.quantity
      }])
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
      },
      cols
    }
  },

  watch: {
    initFormModel (val) {
      this.formModel = { ...this.formModel, ...deepClone(val) }
    },
    initProducts (val) {
      this.products = deepClone(val)
    }
  },

  computed: {
     amount () {
       return this.products.reduce((a, b) => a + b.price * b.quantity, 0)
     },
     quantitys () {
       return this.products.reduce((a, b) => a + Number(b.quantity), 0)
     }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },
    async save () {
      const { formModel, products, amount, quantitys, id } = this
      this.$emit('save', { formModel, products, amount, quantitys })
      if (this.saveFunc) {
        const { customer } = formModel
        await this.saveFunc({
          id: this.id,
          amount,
          quantitys,
          skus: products.length,
          templateType: 1,
          purchaserUserId: customer.id,
          purchaserName: customer.name,
          templateName: formModel.templateName,
          orderItems: products.map(p => {
            const obj = {
              ...p,
              barCode: p.barcode,
              quantity: p.quantity,
              price: p.price || p.skuPrice,
              amount: p.quantity * (p.price || p.skuPrice)
            }
            if (!obj.productNo) obj.productNo = p.skuId
            if (!obj.productName) obj.productName = p.skuName
            return obj
          })
        })
      }
      this.$emit('afterSave')
      this.$router.go(-1)
    },
    submit () {
      this.$emit('submit')
    },
    async confirm () { // ! for edit, need to be changed
      const products = this.products
      const productNos = products.map(p => p.skuId)
      const rsp = await getLastOrderItem({
        purchaserUserId: this.formModel.customer.id,
        productNos
      })
      if (rsp.data && rsp.data.data) {
        const orderItemInfoList = rsp.data.data
        this.products = products.map(p => {
          const item = orderItemInfoList.find(item => item.productNo === p.skuId)
          const res = p
          if (item) res.price = item.skuPrice
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
    handleTemplateChange (data) {
      this.formModel.template = data
      this.afterTemplateChange(data)
      this.templateDialogVisible = false
    },
    handleSelectionChange (selection) {
      // if (!this.forOrder) {
        this.products = selection.map(s => ({
          ...s,
          barCode: s.barcode,
          productNo: s.skuId,
          productName: s.skuName,
          quantity: 1
        }))
      // } else {
      //   this.cachedProducts = selection.map(s => ({
      //     ...s,
      //     price: s.skuPrice,
      //     quantity: 1
      //   }))
      // }
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
    del (row) {
      const index = this.products.findIndex(p => p.skuId === row.skuId)
      // debugger
      this.products.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-right: 15px;
}
</style>

<template>
  <common-page
    @save="save"
    :initData="initTemplate"
    :action="action"
  />
</template>

<script>
import CommonPage from '../components/CommonPage.vue'
import MyCustomer from '@/views/client/my'
import ProductList from '@/views/product/list'
import TemplateList from '@/views/sales/template/index'
import { productCols } from '@/const/product'
import { getLastOrderItem, addPurchaseOrder } from '@/api/pdos/purchase'
import {
  addPurchaseOrderTemplate,
  getPurchaseOrderTemplateDetail,
  editPurchaseOrderTemplate
} from '@/api/pdos/template'

export default {
  components: {
    ProductList,
    TemplateList,
    MyCustomer,
    CommonPage
  },

  props: {
    forOrder: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      action: ''
    }
  },

  mounted () {
    if (this.$route.name === 'salesTemplateDetail') this.action = 'view'
  },

  methods: {
    async save ({ formModel, products, amount, quantitys }) {
      const { customer } = formModel
      await addPurchaseOrderTemplate({
        amount,
        quantitys,
        skus: products.length,
        templateType: 1,
        purchaserUserId: customer.id,
        purchaserName: customer.name,
        templateName: formModel.templateName,
        orderItems: products.map(p => ({
          productNo: p.skuId,
          productName: p.skuName,
          quantity: p.quantity,
          price: p.skuPrice,
          amount: p.quantity * p.skuPrice
        }))
      })
      this.$router.push({ name: 'salesTemplate' })
    },
    // 得到模板的详情，主要是得到product列表
    async initTemplate (id) {
      const rsp = await getPurchaseOrderTemplateDetail(id)
      const formModel = {}
      let products
      if (rsp && rsp.data.data) {
        const {
          orderItems,
          purchaserName,
          purchaserUserId,
          templateName
        } = rsp.data.data

        formModel.customer = {
          id: purchaserUserId,
          name: purchaserName
        }
        formModel.templateName = templateName

        products = orderItems.map(item => {
          const {
            barCode,
            brandName,
            productName: skuName,
            productNo,
            unitName,
            price,
            skuPrice,
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
            costPrice,
            quantity,
            skuPrice
          }
        })
      }
      return {
        formModel,
        products
      }
    },
    handleTemplateChange (data) {
      this.formModel.template = data
      this.initTemplate(data.id)
      this.templateDialogVisible = false
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

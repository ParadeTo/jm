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
import { getLastOrderItem } from '@/api/pdos/purchase'
import {
  addPurchaseOrderTemplate,
  editPurchaseOrderTemplate,
  getPurchaseOrderTemplateDetail,
} from '@/api/pdos/template'

const routeMap = {
  salesTemplateDetail: 'view',
  salesTemplateEdit: 'edit',
  salesTemplateAdd: 'add'
}

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
    const routeName = this.$route.name
    this.action = routeMap[routeName]
  },

  methods: {
    async save ({ formModel, products, amount, quantitys, id }) {
      const { customer } = formModel
      const func = this.action === 'edit' ? editPurchaseOrderTemplate : addPurchaseOrderTemplate
      await func({
        id,
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
          price: p.skuPrice || p.price,
          amount: p.quantity * (p.skuPrice || p.price)
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
    }
  }
}
</script>

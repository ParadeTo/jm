<template>
  <common-page
    @save="save"
    :initData="initOrder"
    :action="action"
    :afterTemplateChange="afterTemplateChange"
    forOrder
  />
</template>

<script>
import CommonPage from '../components/CommonPage.vue'
import {
  addPurchaseOrder,
  getPurchaseOrderDetail,
  generatePurchaseOrderByTemplate
} from '@/api/pdos/purchase'

// 最近一次销售价costPrice，商品售价skuprice，本次订单价格price

const routeMap = {
  salesOrderDetail: 'view',
  salesOrderEdit: 'edit',
  salesOrderAdd: 'add'
}
export default {
  components: {
    CommonPage
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
    async initOrder (id) {
      const rsp = await getPurchaseOrderDetail(id)
      const formModel = {}
      let products
      if (rsp && rsp.data.data) {
        const {
          orderItems,
          purchaserName,
          purchaserUserId
        } = rsp.data.data

        formModel.customer = {
          id: purchaserUserId,
          name: purchaserName
        }

        products = orderItems.map(item => {
          const {
            barCode,
            brandName,
            productName: skuName,
            productNo,
            unitName,
            skuPrice,
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
            costPrice,
            skuPrice
          }
        })
      }
      return {
        formModel,
        products
      }
    },
    async afterTemplateChange (template) {
      const rsp = await generatePurchaseOrderByTemplate(template.id)
      if (rsp && rsp.data) {
        this.$router.push({ name: 'salesOrderEdit', params: { id: rsp.data.data } })
      }
    },
    async save ({ formModel, products, amount, quantitys }) {
      const { customer, templateName } = formModel
      await addPurchaseOrder({
        purchaserUserId: customer.id,
        purchaserName: customer.name,
        amount: amount,
        orderItems: products.map(p => ({
          productNo: p.skuId,
          productName: p.skuName,
          specification: p.unitName,
          quantity: p.quantity,
          price: p.price,
          amount: p.quantity * p.price
        }))
      })
      this.$router.push({ name: 'salesOrder' })
    }
  }
}
</script>


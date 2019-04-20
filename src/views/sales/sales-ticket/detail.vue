<template>
  <common-page
    @save="save"
    :initData="initTicket"
    :action="action"
    :afterTemplateChange="afterTemplateChange"
    forOrder
  />
</template>

<script>
import CommonPage from '../components/CommonPage.vue'
import {
  postDeliveryOrder,
  getDeliveryOrderDetail,
  // generatePurchaseTicketByTemplate
} from '@/api/pdos/delivery'

// 最近一次销售价costPrice，商品售价skuprice，本次订单价格price

const routeMap = {
  salesTicketDetail: 'view',
  salesTicketEdit: 'edit',
  salesTicketAdd: 'add'
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
    async initTicket (id) {
      const rsp = await getDeliveryOrderDetail(id)
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
      const rsp = await generatePurchaseTicketByTemplate(template.id)
      if (rsp && rsp.data) {
        this.$router.push({ name: 'salesTicketEdit', params: { id: rsp.data.data } })
      }
    },
    async save ({ formModel, products, amount, quantitys, id }) {
      const { customer, templateName } = formModel
      await postDeliveryOrder({
        id,
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
      this.$router.push({ name: 'salesTicket' })
    }
  }
}
</script>


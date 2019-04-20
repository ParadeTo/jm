<template>
  <common-page
    @save="save"
    :initFormModel="formModel"
    :initProducts="products"
    :action="action"
    :afterTemplateChange="afterTemplateChange"
    forOrder
  >
    <template slot="moreOperation">
      <el-button type="success" @click="submit" v-if="action==='edit'">提交</el-button>
      <el-button type="success" @click="send" v-if="action==='edit'">发货</el-button>
      <el-button type="success" @click="receive" v-if="action==='edit'">收货</el-button>
      <el-button type="success" @click="returnOrder" v-if="action==='edit'">退回</el-button>
    </template>
  </common-page>
</template>

<script>
import CommonPage from '../components/CommonPage.vue'
import {
  postDeliveryOrder,
  getDeliveryOrderDetail,
  submitDeliveryOrder,
  sendDeliveryOrder,
  receiveDeliveryOrder,
  returnDeliveryOrder,
  generateDeliveryOrderByTemplate
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
      action: '',
      id: null,
      formModel: {},
      products: []
    }
  },

  mounted () {
    const routeName = this.$route.name
    this.action = routeMap[routeName]
    this.id = Number(this.$route.params.id)
    if (this.id) this.initOrder()
  },

  methods: {
    async initOrder () {
      const rsp = await getDeliveryOrderDetail(this.id)
      const formModel = {}
      let products
      if (rsp && rsp.data.data) {
        const {
          orderItems,
          purchaserName,
          purchaserUserId
        } = rsp.data.data

        this.formModel = {
          customer: {
            id: purchaserUserId,
            name: purchaserName
          }
        }

        this.products = orderItems.map(item => {
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
    },
    async afterTemplateChange (template) {
      const rsp = await generateDeliveryOrderByTemplate(template.id)
      if (rsp && rsp.data) {
        this.$router.push({ name: 'salesTicketEdit', params: { id: rsp.data.data } })
      }
    },
    async save ({ formModel, products, amount, quantitys }) {
      const { customer, templateName } = formModel
      await postDeliveryOrder({
        id: this.id,
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
    },
    async submit () {
      await submitDeliveryOrder(this.id)
      this.initOrder()
    },
    async send () {
      await sendDeliveryOrder(this.id)
      this.initOrder()
    },
    async receive () {
      await receiveDeliveryOrder(this.id)
      this.initOrder()
    },
    async returnOrder () {
      await returnDeliveryOrder(this.id)
      this.initOrder()
    }
  }
}
</script>


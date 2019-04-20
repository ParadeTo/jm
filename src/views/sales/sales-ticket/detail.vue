<template>
  <common-page
    @afterSave="afterSave"
    :id="id"
    :saveFunc="postDeliveryOrder"
    :initFormModel="formModel"
    :initProducts="products"
    :action="action"
    :editDisabled="status>100"
    :afterTemplateChange="afterTemplateChange"
    forOrder
  >
    <template slot="moreOperation">
      <el-button type="success" @click="submit" v-if="action==='edit' && status===100">提交</el-button>
      <el-button type="success" @click="send" v-else-if="action==='edit' && status===200">发货</el-button>
      <el-button type="success" @click="receive" v-else-if="action==='edit' && status===300">收货</el-button>
      <el-button type="success" @click="returnOrder" v-else-if="action==='edit' && status===400">退回</el-button>
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
  returnDeliveryOrder
  // generateDeliveryOrderByTemplate
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
      status: '',
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
    postDeliveryOrder,
    async initOrder () {
      const rsp = await getDeliveryOrderDetail(this.id)
      const formModel = {}
      let products
      if (rsp && rsp.data.data) {
        const {
          orderItems,
          purchaserName,
          purchaserUserId,
          status
        } = rsp.data.data

        this.formModel = {
          customer: {
            id: purchaserUserId,
            name: purchaserName
          }
        }
        this.status = status
        this.products = orderItems
      }
    },
    // async afterTemplateChange (template) {
    //   const rsp = await generateDeliveryOrderByTemplate(template.id)
    //   if (rsp && rsp.data) {
    //     this.$router.push({ name: 'salesTicketEdit', params: { id: rsp.data.data } })
    //   }
    // },
    // async save ({ formModel, products, amount, quantitys }) {
    //   const { customer, templateName } = formModel
    //   await postDeliveryOrder({
    //     id: this.id,
    //     purchaserUserId: customer.id,
    //     purchaserName: customer.name,
    //     amount: amount,
    //     orderItems: products.map(p => ({
    //       productNo: p.skuId,
    //       productName: p.skuName,
    //       specification: p.unitName,
    //       quantity: p.quantity,
    //       price: p.price,
    //       amount: p.quantity * p.price
    //     }))
    //   })
    //   this.$router.push({ name: 'salesTicket' })
    // },
    afterSave () {
      this.$router.push({ name: 'salesTicket' })
    },
    async submit () {
      await submitDeliveryOrder(this.id)
      this.$router.push({ name: 'salesTicket' })
    },
    async send () {
      await sendDeliveryOrder(this.id)
      this.$router.push({ name: 'salesTicket' })
    },
    async receive () {
      await receiveDeliveryOrder(this.id)
      this.$router.push({ name: 'salesTicket' })
    },
    async returnOrder () {
      await returnDeliveryOrder(this.id)
      this.$router.push({ name: 'salesTicket' })
    }
  }
}
</script>


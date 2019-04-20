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
      <el-button type="success" @click="confirm" v-if="action==='edit'">确认</el-button>
      <el-button type="success" @click="reject" v-if="action==='edit'">驳回</el-button>
    </template>
  </common-page>
</template>

<script>
import CommonPage from '../components/CommonPage.vue'
import {
  postReturnOrder,
  submitReturnOrder,
  confirmReturnOrder,
  rejectReturnOrder,
  getReturnOrderDetail
} from '@/api/pdos/return'

// 最近一次销售价costPrice，商品售价skuprice，本次订单价格price

const routeMap = {
  salesReturnDetail: 'view',
  salesReturnEdit: 'edit',
  salesReturnAdd: 'add'
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
      const rsp = await getReturnOrderDetail(this.id)
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
      // const rsp = await generatePurchaseOrderByTemplate(template.id)
      // if (rsp && rsp.data) {
      //   this.$router.push({ name: 'salesOrderEdit', params: { id: rsp.data.data } })
      // }
    },
    async save ({ formModel, products, amount, quantitys }) {
      const { customer, templateName } = formModel
      await postReturnOrder({
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
      this.$router.push({ name: 'salesReturn' })
    },
    async submit () {
      await submitReturnOrder(this.id)
      this.initOrder()
    },
    async confirm () {
      await confirmReturnOrder(this.id)
      this.initOrder()
    },
    async reject () {
      await rejectReturnOrder(this.id)
      this.initOrder()
    }
  }
}
</script>


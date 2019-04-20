<template>
  <common-page
    @afterSave="afterSave"
    @submit="submit"
    :id="id"
    :initFormModel="formModel"
    :saveFunc="postPurchaseOrder"
    :initProducts="products"
    :action="action"
    :afterTemplateChange="afterTemplateChange"
    :editDisabled="status>=300"
    forOrder
  >
    <template slot="moreOperation">
      <el-button type="success" @click="submit" v-if="action==='edit' && status===100">提交</el-button>
      <el-button type="success" @click="verify" v-else-if="action==='edit' && status===200">审核</el-button>
      <el-button type="success" @click="confirm" v-else-if="action==='edit' && (status===300||status===400)">确认</el-button>
    </template>
  </common-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CommonPage from '../components/CommonPage.vue'
import {
  postPurchaseOrder,
  getPurchaseOrderDetail,
  submitPurchaseOrder,
  verifyPurchaseOrder,
  confirmPurchaseOrder,
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
      action: '',
      id: null,
      status: '',
      formModel: {},
      products: []
    }
  },

  mounted () {
    const routeName = this.$route.name
    this.id = Number(this.$route.params.id)
    this.action = routeMap[routeName]
    if (this.id) this.initOrder()
    if (!this.purchaseOrderParams) {
      this.updatePurchaseOrderParams()
    }
  },

  computed: mapGetters('pdos', ['purchaseOrderParams']),

  methods: {
    ...mapActions('pdos', ['updatePurchaseOrderParams']),
    postPurchaseOrder,
    async initOrder () {
      const rsp = await getPurchaseOrderDetail(this.id)
      const formModel = {}
      let products
      if (rsp && rsp.data.data) {
        const {
          status,
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

        this.status = status

        this.products = orderItems
        // .map(item => {
        //   const {
        //     barCode,
        //     brandName,
        //     productName: skuName,
        //     productNo,
        //     unitName,
        //     skuPrice,
        //     price,
        //     quantity,
        //     costPrice
        //   } = item
        //   return {
        //     barCode,
        //     skuName,
        //     skuId: Number(productNo),
        //     brandName,
        //     cateName: '',
        //     classifyName: '',
        //     unitName,
        //     price,
        //     quantity,
        //     costPrice,
        //     skuPrice
        //   }
        // })
      }
    },
    async afterTemplateChange (template) {
      const rsp = await generatePurchaseOrderByTemplate(template.id)
      if (rsp && rsp.data) {
        this.$router.push({ name: 'salesOrderEdit', params: { id: rsp.data.data } })
      }
    },
    // async save ({ formModel, products, amount, quantitys }) {
    //   const { customer, templateName } = formModel
    //   await postPurchaseOrder({
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
    //   this.$router.push({ name: 'salesOrder' })
    // },
    afterSave () {
      this.$router.push({ name: 'salesOrder' })
    },
    async submit () {
      await submitPurchaseOrder(this.id)
      this.initOrder()
    },
    async verify () {
      await verifyPurchaseOrder(this.id)
      this.initOrder()
    },
    async confirm () {
      await confirmPurchaseOrder(this.id)
      this.initOrder()
    }
  }
}
</script>


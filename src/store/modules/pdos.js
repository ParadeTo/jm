import { getPurchaseOrderParams } from '@/api/pdos/purchase'
import { getDeliveryOrderParams } from '@/api/pdos/delivery'
import { getReturnOrderParams } from '@/api/pdos/return'

export default {
  namespaced: true,
  state: {
    purchaseOrderParams: null,
    deliveryOrderParams: null,
    returnOrderParams: null,
    templateParams: null
  },
  mutations: {
    UPDATE_PURCHASE_ORDER_PARAMS (state, data) { state.purchaseOrderParams = data },
    UPDATE_DELIVERY_ORDER_PARAMS (state, data) { state.deliveryOrderParams = data },
    UPDATE_RETURN_ORDER_PARAMS (state, data) { state.returnOrderParams = data },
    UPDATE_TEMPLATE_PARAMS (state, data) { state.templateParams = data }
  },
  actions: {
    async updatePurchaseOrderParams ({ commit }) {
      const { data } = await getPurchaseOrderParams()
      data.data && commit('UPDATE_PURCHASE_ORDER_PARAMS', data.data)
    },
    async updateDeliveryOrderParams ({ commit }) {
      const { data } = await getDeliveryOrderParams()
      data.data && commit('UPDATE_DELIVERY_ORDER_PARAMS', data.data)
    },
    async updateReturnOrderParams ({ commit }) {
      const { data } = await getReturnOrderParams()
      data.data && commit('UPDATE_RETURN_ORDER_PARAMS', data.data)
    },
    async updateTemplateParams ({ commit }) {

    }
  },
  getters: {
    purchaseOrderParams: state => state.purchaseOrderParams,
    deliveryOrderParams: state => state.deliveryOrderParams,
    returnOrderParams: state => state.returnOrderParams,
    templateParams: state => state.templateParams
  }
}

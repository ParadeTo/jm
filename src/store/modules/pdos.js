import { getPurchaseOrderParams } from '@/api/pdos/purchase'

export default {
  state: {
    purchaseOrderParams: null,
    templateParams: null
  },
  mutations: {
    UPDATE_PURCHASE_ORDER_PARAMS (state, data) { state.purchaseOrderParams = data },
    UPDATE_TEMPLATE_PARAMS (state, data) { state.templateParams = data }
  },
  actions: {
    async updatePurchaseOrderParams ({ commit }) {
      const { data } = await getPurchaseOrderParams()
      data.data && commit('UPDATE_PURCHASE_ORDER_PARAMS', data.data)
    },
    async updateTemplateParams ({ commit }) {

    }
  },
  getters: {
    purchaseOrderParams: state => state.purchaseOrderParams,
    templateParams: state => state.templateParams
  }
}

import { getPurchaseOrderParams } from '@/api/pdos/supply/purchase'

export default {
  state: {
    purchaseOrderParams: null
  },
  mutations: {
    UPDATE_PURCHASE_ORDER (state, data) { state.purchaseOrderParams = data }
  },
  actions: {
    async updatePurchaseOrder ({ commit }) {
      const { data } = await getPurchaseOrderParams()
      data.data && commit('UPDATE_PURCHASE_ORDER', data.data)
    }
  },
  getters: {
    purchaseOrderParams: state => state.purchaseOrderParams
  }
}

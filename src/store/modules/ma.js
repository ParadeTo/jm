import { getAllCategory } from '@/api/product/category'

export default {
  namespace: true,
  state: {
    customer: []
  },
  mutations: {
    UPDATE_CUSTOMER (state, customer) { state.customer = customer }
  },
  actions: {
    async updateCustomer ({ commit }) {
      const { data } = await getAllCategory({})
      data.data.length && commit('UPDATE_CATEGORY', data.data)
    }
  },
  getters: {
    category: state => state.category,
    brand: state => state.brand,
    classify: state => state.classify,
    unit: state => state.unit
  }
}

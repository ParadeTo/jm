import { getAllCategory } from '@/api/product/category'
import { getUnitList } from '@/api/product/unit'
import { getAllBrand } from '@/api/product/brand'
import { getAllClassify } from '@/api/product/classify'

export default {
  namespace: true,
  state: {
    category: [],
    unit: [],
    brand: [],
    classify: []
  },
  mutations: {
    UPDATE_CATEGORY (state, category) { state.category = category },
    UPDATE_UNIT (state, unit) { state.unit = unit },
    UPDATE_BRAND (state, brand) { state.brand = brand },
    UPDATE_CLASSIFY (state, classify) { state.classify = classify }
  },
  actions: {
    async updateCategory ({ commit }) {
      const { data } = await getAllCategory({})
      data.data.length && commit('UPDATE_CATEGORY', data.data)
    },
    async updateUnit ({ commit }) {
      const { data } = await getUnitList({})
      data.data.items && commit('UPDATE_UNIT', data.data.items)
    },
    async updateBrand ({ commit }, cateId) {
      const { data } = await getAllBrand({ cateId })
      Array.isArray(data.data) && commit('UPDATE_BRAND', data.data)
    },
    async updateClassify ({ commit }, parentId) {
      const { data } = await getAllClassify({ parentId: -parentId })
      Array.isArray(data.data) && commit('UPDATE_CLASSIFY', data.data)
    }
  },
  getters: {
    category: state => state.category,
    brand: state => state.brand,
    classify: state => state.classify,
    unit: state => state.unit
  }
}

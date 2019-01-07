import { getAllCategory } from '@/api/category'
import { getAllBrand } from '@/api/brand'
import { getAllClassify } from '@/api/classify'
import { getAttributeList } from '@/api/attribute'
import { getUnitList } from '@/api/unit'

const cachedData = {
  state: {
    category: [],
    brand: [],
    classify: [],
    attribute: [],
    unit: []
  },
  mutations: {
    UPDATE_CATEGORY: (state, category) => { state.category = category },
    UPDATE_BRAND: (state, brand) => { state.brand = brand },
    UPDATE_CLASSIFY: (state, classify) => { state.classify = classify },
    UPDATE_ATTRIBUTE: (state, attribute) => { state.attribute = attribute },
    UPDATE_UNIT: (state, unit) => { state.unit = unit }
  },
  actions: {
    updateCategory: async ({ commit }) => {
      const rsp = await getAllCategory({})
      rsp.data.length && commit('UPDATE_CATEGORY', rsp.data)
    },
    updateBrand: async ({ commit }, { cateId }) => {
      const rsp = await getAllBrand({ cateId })
      Array.isArray(rsp.data) && commit('UPDATE_BRAND', rsp.data)
    },
    updateClassify: async ({ commit }) => {
      const rsp = await getAllClassify({})
      rsp.data.length && commit('UPDATE_CLASSIFY', rsp.data)
    },
    updateAttribute: async ({ commit }) => {
      const rsp = await getAttributeList({})
      commit('UPDATE_ATTRIBUTE', rsp.data)
    },
    updateUnit: async ({ commit }) => {
      const rsp = await getUnitList({})
      rsp.data.items && commit('UPDATE_UNIT', rsp.data.items)
    }
  }
}

export default cachedData

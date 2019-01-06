import { getCategoryList } from "@/api/category";

const cachedData = {
  state: {
    category: []
  },
  mutations: {
    UPDATE_CATEGORY: (state, category) => {
      console.log('category', category)
      state.category = category
    }
  },
  actions: {
    updateCategory: async ({ commit }) => {
      const rsp = await getCategoryList({})
      commit('UPDATE_CATEGORY', rsp.data.items)
    }
  }
}

export default cachedData

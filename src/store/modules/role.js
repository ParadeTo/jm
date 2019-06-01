import { getAllRoles } from '@/api/ma/role'

export default {
  namespaced: true,
  state: {
    roles: []
  },
  mutations: {
    UPDATE_ROLES (state, roles) { state.roles = roles }
  },
  actions: {
    async updateRoles ({ commit }) {
      const { data } = await getAllRoles()
      data.data.length && commit('UPDATE_ROLES', data.data)
    }
  },
  getters: {
    roles: state => state.roles,
  }
}

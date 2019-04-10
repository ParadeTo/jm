
import store from '@/store'
import { getToken } from '@/utils/auth'

export default {
  request: {
    onSuccess (req) {
      // Do something before request is sent
      if (store.getters.token) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        req.headers['token'] = getToken()
      }
      return req
    },
    onError () {}
  },
  response: {
    onSuccess (rsp) {
      // tryHideFullScreenLoading()
      return rsp
    },
    onError (err) {
      const { response } = err
      if (response.status === 401) {
        store.dispatch('user/resetToken').then(() => {
          window.location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject(err)
      // tryHideFullScreenLoading()
    }
  }
}

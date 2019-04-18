import { Message } from 'element-ui'

export default {
  request: {
    onSuccess (req) {
      return req
    },
    onError () {}
  },
  response: {
    onSuccess (rsp) {
      if (!rsp) return
      const data = rsp.data
      const code = data.code
      const conf = rsp.config
      const opt = {
        message: rsp.data.msg,
        duration: 3 * 1000
      }
      if (code === '0000') {
        conf.showSuccess && Message({
          ...opt,
          type: 'success'
        })
      } else {
        (conf.showError || code === '401') && Message({
          ...opt,
          type: 'error'
        })
      }
      return rsp
    },
    onError (error) {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
}

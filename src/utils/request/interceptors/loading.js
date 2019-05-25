import { Loading } from 'element-ui'

let needLoadingRequestCount = 0
let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}

function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export default {
  request: {
    onSuccess (req) {
      !req.hideLoading && showFullScreenLoading()
      return req
    },
    onError () {}
  },
  response: {
    onSuccess (rsp) {
      tryHideFullScreenLoading()
      return rsp
    },
    onError (error) {
      tryHideFullScreenLoading()
      return Promise.reject(error)
    }
  }
}

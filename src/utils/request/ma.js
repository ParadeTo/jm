import axios from 'axios'
import loadingInterceptor from './interceptors/loading'
import toastInterceptor from './interceptors/toast'

// create an axios instance
const maService = axios.create({
  baseURL: '/ma', // process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// interceptors
;[
  loadingInterceptor,
  toastInterceptor
].forEach(interceptor => {
  maService.interceptors.request.use(
    interceptor.request.onSuccess,
    interceptor.request.onError
  )
  maService.interceptors.response.use(
    interceptor.response.onSuccess,
    interceptor.response.onError
  )
})

export default maService

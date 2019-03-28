import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import loadingInterceptor from './interceptors/loading'
import toastInterceptor from './interceptors/toast'

// create an axios instance
const pdosService = axios.create({
  baseURL: '/pdos',
  timeout: 5000 // request timeout
})

// interceptors
;[
  loadingInterceptor,
  toastInterceptor
].forEach(interceptor => {
  pdosService.interceptors.request.use(
    interceptor.request.onSuccess,
    interceptor.request.onError
  )
  pdosService.interceptors.response.use(
    interceptor.response.onSuccess,
    interceptor.response.onError
  )
})

export default pdosService

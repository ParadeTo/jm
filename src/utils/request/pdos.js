import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import loadingInterceptor from './interceptors/loading'
import toastInterceptor from './interceptors/toast'

// create an axios instance
const productService = axios.create({
  baseURL: '/pdos', // process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// interceptors
;[
  loadingInterceptor,
  toastInterceptor
].forEach(interceptor => {
  productService.interceptors.request.use(
    interceptor.request.onSuccess,
    interceptor.request.onError
  )
  productService.interceptors.response.use(
    interceptor.response.onSuccess,
    interceptor.response.onError
  )
})

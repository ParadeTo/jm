import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import loadingInterceptor from './interceptors/loading'
import toastInterceptor from './interceptors/toast'

// create an axios instance
export const pdosSupplyService = axios.create({
  baseURL: '/pdos/supply/pdos',
  timeout: 5000 // request timeout
})

export const pdosMarketerService = axios.create({
  baseURL: '/pdos/marketer/pdos',
  timeout: 5000 // request timeout
})

// interceptors
;[
  loadingInterceptor,
  toastInterceptor
].forEach(interceptor => {
  ;[pdosSupplyService, pdosMarketerService].forEach(service => {
    service.interceptors.request.use(
      interceptor.request.onSuccess,
      interceptor.request.onError
    )
    service.interceptors.response.use(
      interceptor.response.onSuccess,
      interceptor.response.onError
    )
  })
})

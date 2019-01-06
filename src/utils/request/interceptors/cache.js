/**
  {
    key: {
      value,
      maxAge, // 秒
      updateTime,
    }
  }
 */
const maxAge = 10 * 60
const store = {}

const getKey = (method, url, params) =>
  `${method},${url},${params ? Object.keys(params).map(k => `${k}=${params[key]}`).join('&'): ''}`

// request interceptor
export default config => {
  
  getKey()
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
}
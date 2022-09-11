//  yarn  add axios
//  2.引入axios
//  3.配置axios
//  基础版配置
// import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
// export default axios

// 升级版克隆 const  request=axios.create({}) 克隆axios
import store from '@/store'
import axios from 'axios'
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {}
)
export default request

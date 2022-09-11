//  user.js划分是跟后端接口文档登录接口文档
import request from '@/utils/request'
//  import store from '@/store'
/**
 *登录
 * @param {string} mobile 手机号
 * @param {Number} code 验证码
 * @returns promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
//  获取用户信息
/**
 *获取用户信息接口
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

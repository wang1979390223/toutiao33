//  关于所有频道的接口
import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @return Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 *获取所有的频道
 * @returns Promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *删除频道
 * @param {Number/String} id
 * @returns promise
 */
export const delChannelAPI = (id) => {
  return request({
    //  url: '/v1_0/user/channels'
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {String/Number} id
 * @param {Number} seq
 * @returns promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

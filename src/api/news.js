import request from '@/utils/request'

/**
 *
 * @param {string|number} id频道的id
 * @param {*number} timestamp 请求新的推荐数据传当前时间戳，
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}

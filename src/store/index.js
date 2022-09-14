import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// 1.下载
// yarn add vuex-persistedstate@3.2.1
// 2.引入
// - import createPersistedState from 'vuex-persistedstate'
// 3.调用
// - plugins: [createPersistedState()]

// 封装本地存储，vuex-persistedstate
//  yarn add vuex-persistedstate@3.2.1
//  配置项
// key：默认值是vuex
// storage；存储的方式，默认方式是本地存储，
// reducer
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj, myChannels }) {
        return { tokenObj, myChannels }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: {}
  },

  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      //  将token存在vuex
      state.tokenObj = token
    },
    /**
     *
     * @param {*} state
     * @param {Array} channels 删除或者添加后的最新channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    }
  }
})

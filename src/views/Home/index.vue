<template>
  <div>
    <!-- 搜索框 -->

    <van-nav-bar class="navbar">
      <!-- 插槽 -->
      <template #title>
        <van-button icon="search" size="small" round block @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道和文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="isshow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      v-model="isshow"
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <ChannelEdit
        v-if="isshow"
        @change-active=";[(isshow = false), (active = $event)]"
        :myChannels="channels"
        @del-channel="delchannel"
        @add-channel="addChannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
//  引入API
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList'
import ChannelEdit from './components/ChannelEdit.vue'
//  引入文章详情
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isshow: false
    }
  },
  created() {
    this.initChannels()
    // this.getChannel()
  },
  //  1，??==>相当于||,常用于语句
  //  2，?.==>可选择运算符，?前面是undifined，那么不会往后取值
  methods: {
    initChannels() {
      if (this.isLogin) {
        // 如果你登陆了
        // channels应该发请求获取用户自己的频道
        this.getChannel()
      } else {
        //  2.未登录
        //  1，本地存储有数据，channels用本地存储
        //  2本地存储没有数据，发送请求，获取默认频道的数据

        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    ...mapMutations(['SET_MY_CHANNELS']),
    async getChannel() {
      try {
        const { data } = await getChannelAPI() // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        //  js的错误，给程序元，axios状态码507，提示用户刷新
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    //  删除编辑频道@del-channel="delchannel"

    async delchannel(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 把我的频道存入本地
          this.SET_MY_CHANNELS(newChannels)
        }
        //  1发送删除请求
        this.channels = newChannels

        // this.channels = this.channels.filter((item) => item.id !== id)
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录在删除')
        } else {
          throw error
        }
      }
    },
    //  添加频道功能。@add-channel="addChannel"
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 把我的频道存入本地
          this.SET_MY_CHANNELS([...this.channels, channel])
        }

        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response.status && error.response.status === 401) {
          this.$toast.fail('请登录在添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa; // inherit 继承 // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }
  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>

<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登陆的状态 -->
      <div class="login banner" v-if="isLogin">
        <van-row> </van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="UserInfo.photo"
              />
              <span class="mobile">{{ UserInfo.name }}</span>
            </van-row>
          </van-col>

          <van-col span="7"> </van-col>
          <van-col span="5">
            <van-row type="fllex" justify="center" align="center">
              <van-button round size="mini" class="edit-btn">
                编辑按钮
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row
          ><van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon
                >{{ UserInfo.art_count }}
              </template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>{{
                UserInfo.fans_count
              }}</template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon
                >{{ UserInfo.follow_count }}
              </template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon
                >{{ UserInfo.like_count }}
              </template></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <!-- 未登陆的状态 -->
      <div class="logout banner" v-else @click="$route.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileImg">
        </van-image>
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item icon="photo-o" text="收藏"
          ><template #icon>
            <span class="toutiao toutiao-shoucang"></span> </template
        ></van-grid-item>
        <van-grid-item icon="photo-o" text="历史"
          ><template #icon>
            <span class="toutiao toutiao-lishi"></span> </template
        ></van-grid-item>
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小志同学" is-link />
    </main>
    <!-- 底部 -->
    <footer>
      <button
        class="edit-btn"
        v-if="isLogin"
        @click="logout"
        block
        style="color: red"
      >
        退出
      </button>
    </footer>
  </div>
</template>

<script>
import mobileImg from '@/assets/images/mobile.png'
import { mapGetters } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      mobileImg,
      UserInfo: {}
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({ title: '黑马头条', message: '是否退出账号' })
      this.$$store.commit('SET_TOKEN', {})
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        //  用户登陆了继续，调用函数
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.UserInfo = data.data
        //  console.log(data)
      } catch (error) {
        //  error
        //  js和400，501给程序员提示，401提示用户，重新登陆
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败,请重新登录')
        } else {
          //  错误上抛
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  background-color: #fff;
  height: 100vh;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shousuo {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
  //background-size:cove
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: aliceblue;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  :deep(.edit-btn) {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(grid) {
    color: #fff;
    .van-grid-item__text {
      color: #fff;
    }
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
  }
  //  button
}
</style>
>

<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <!-- :rules="mobileRules"抽离到rules.js中再引用  { pattern:
/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
message: '手机格式错误' } pattern vant里面正则表达式写法 -->
        <!-- 字体图标插槽 -->
        <template #label>
          <span class="toutiao toutiao-shouji"></span
        ></template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标插槽 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码插槽 -->
        <template #button>
          <van-button
            round
            type="default"
            size="small"
            class="btn"
            native-type="button"
            block
            v-if="isshowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="60 * 1000"
            format="ss秒"
            @finish="isshowCodeBtn = true"
          />
        </template>
        <!-- 验证码插槽 -->
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <!-- 登录按钮 -->
  </div>
</template>

<script>
// 引入rules
import { codeRules, mobileRules } from './rules'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      // isshowBtn验证码的判断
      isshowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit(values) {
      // Submit事件只有在成功后才会被触发
      //  console.log('submit', values)
      //  loading
      //  message：提示文案
      // forbidClick：禁止点击
      //  duration：展示的时长，为0，一直展示
      this.loading()
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 0
      // })
      //  最开始的请求 const { data } = await login(this.mobile, this.code) console.log(data)

      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        //  设置token存进vuex
        this.SET_TOKEN(data.data)
        //  console.log(this.SET_TOKEN(data.data))
        //  跳转路由
        this.$router.push('/profile')
        //  成功的提示
        this.$toast.success('登录成功')
      } catch (error) {
        //  细分失败提示用户手机号和验证码
        //  如果是手机号或者验证码错了，用户可以知道
        //  error ：1，js报错，2.axios封装的error对象
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
        this.$toast.fail('登录失败')
      }
    },
    async sendCode() {
      //  1验证用户是否输入了有效的手机号
      //  2在表单form绑定ref
      //  3$refs.form.validate(name)
      //  跟<van-field>await this.$refs.form.validate('mobile')name一致

      await this.$refs.form.validate('mobile')
      this.loading()
      //  1发送请求
      //  console.log('发送请求')
      try {
        await sendCodeAPI(this.mobile)
        //  2显示倒计时组件
        this.isshowCodeBtn = false

        this.$toast.success('验证码发送成功')
      } catch (error) {
        if (error.response.status === 429 || error.response.status === 404) {
          //  axios的错误
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
      //  this.isshowCodeBtn = false替换成 @click="sendCode"
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
//:deep深度穿透
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 19;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>

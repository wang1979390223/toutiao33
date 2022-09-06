<template>
  <div>
    <span class="toutiao toutiao-dianzan"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    黑马头条
    <div class="box" >登录</div>
  </div>
</template>

<script>
//  1，git仓库管理
//  git log 查看commit记录
//  git status 查看当前仓库的状态
//  git add .  提交到暂存区
//  git commit
//  2，引入vant组件
//  3，rem适配  下包yarn add amfe-flexible
//  自动把css中的px转成rem post-css css的预处理器
//  下包yarn add postcss-pxtorem
//  在根目录下创建   .postcssrc.js

export default {}
</script>

<style scoped>
.box {
  width:750px;
  height: 90px;
background-color:skyblue;
font-size: 40px;
}

</style>

<template>
  <div>
    <ArticleItem v-for="item in articles" :key="item.act_id" :article='item'></ArticleItem>
  </div>
</template>

<script>
// 发送请求，拿到当前文章的详情数据
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      //  new Date().valueof()
      // Date.now()
      // +new Date
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
      } catch (error) {
        //  js的错误上抛，400 上抛中文，507原封不动上抛
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>

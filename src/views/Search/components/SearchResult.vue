<template>
  <!-- div固定 -->
  <div class="results">
    <!-- 绑定下拉页面 -->
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击刷新"
    >
      <!-- 单元格 -->
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      >
        <!-- @click=" $router.push({ path: '/detail', query: { articleId: item.art_id } }) " 路由跳转带参数-->
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 引入API
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // 5.测试捕获错误
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        //
        console.log('getResults') // 1发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        // 4添加finished
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 2保存数据
        //  this.results = [...this.results, ...data.data.results]
        this.results.push(...data.data.results)
      } catch (error) {
        this.error = true
      } finally {
        // 3关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.results {
  // 滚动条设置
  //  overlay和auto用法基本一致
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>

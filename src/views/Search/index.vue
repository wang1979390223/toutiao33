<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// class和style属性的特殊
//  -vue自动会把class和style合并到组件的根节点上
//   引入组件
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'

// yinru
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      //  搜索历史 //1.手动敲回车 ，2.点击了搜索//3,对数组进行去重
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      //  点击文案进行跳转
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: azure;
  }
}
</style>

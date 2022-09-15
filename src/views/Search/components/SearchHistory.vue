<template>
  <div>
    <!-- 搜索历史的标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon
          name="delete-o"
          v-if="!isEdit"
          @click="isEdit = true"
        ></van-icon>
        <div v-else>
          <!-- 全部删除功能 -->
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <van-icon
        name="close"
        v-show="isEdit"
        @click="
          $store.commit(
            'SET_HISTORIES',
            histories.filter((i) => item !== i)
          )
        "
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 声明变量接受
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>

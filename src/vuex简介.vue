<template>
  <div>
    <!-- <router-view> </router-view> -->
    <!-- <h1>{{ $store.state.count }}</h1> -->
    <!-- <h1>count的十倍{{ $store.getters.bigNum }}</h1> -->
    <h1>{{ count }}</h1>
    <h1>
      {{ bigNum }}
    </h1>
    <button @click="SET_COUNT(10)">点击++</button>

    <!-- <button @click="addcuont">点击++</button> -->
  </div>
</template>

<script>
//  mapState--> 将vuex里面的state映射到计算属性computed里面
// getters--> 将vuex里面的state映射到计算属性computed里面

// 使用
//  引入import { mapState } from 'vuex'
//  参数：['映射的属性']
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // addcuont() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    //  ...展开运算符
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>

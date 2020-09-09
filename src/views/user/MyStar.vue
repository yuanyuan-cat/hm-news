<template>
  <div>
    <hm-topbar></hm-topbar>
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      list: []
    }
  },
  methods: {
    // 封装一个请求收藏数据渲染页面的函数
    async getStars () {
      const res = await this.$axios.get('/user_star', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.list = data
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
    }
  },
  created () {
    this.getStars()
  }
}
</script>

<style>

</style>

<template>
  <div>
      <hm-topbar></hm-topbar>
      <hm-header>我的关注</hm-header>
      <div class="follow" v-for="item in follows" :key="item.id">
          <div class="avatar">
              <img :src="$base + item.head_img" alt="">
          </div>
          <div class="content">
              <p>{{item.nickname}}</p>
              <p class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
          </div>
          <div class="cancel">
              <van-button round size="small" type="default" @click="cancel(item.id)">取消关注</van-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      follows: []
    }
  },
  methods: {
    // 封装一个给后台发请求，获取渲染页面数据的函数
    async getFollow () {
      const res = await this.$axios.get('/user_follows')
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.follows = data
      }
    },
    // 点击取消关注按钮，弹出确认框
    async cancel (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要取消关注此用户吗？'
        })
      } catch {
        return this.$toast('取消操作')
      }
      // 发送请求进行取消
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      // 取消成功后，提示成功并重新渲染数据
      if (statusCode === 200) {
        this.$toast(message)
        this.getFollow()
      }
    }
  },
  created () {
    this.getFollow()
  }
}
</script>

<style lang="less" scoped>
  .follow {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    .avatar img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .content {
      flex: 1;
      padding-left: 20px;
      font-size: 18px;
      .time {
        margin-top: 10px;
        font-size: 16px;
        color: #999;
      }
    }
  }
</style>

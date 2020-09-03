<template>
  <div>
    <hm-topbar></hm-topbar>
    <hm-header>我的收藏</hm-header>
    <div class="post" v-for="item in stars" :key="item.id">
      <div class="content">
        <div class="title">
          {{item.title}}
        </div>
        <div class="ref">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$URL(item.cover[0].url)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      stars: []
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
        this.stars = data
      }
    }
  },
  created () {
    this.getStars()
  }

}
</script>

<style lang="less" scoped>
  .post {
    display: flex;
    padding: 20px 10px;
    border-bottom: 1px solid #ccc;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 18px;
      }
      .ref {
        font-size: 16px;
        color: #999;
        :first-child {
          margin-right: 20px;
        }
      }
    }
    .img {
      margin-left: 3px;
      img {
        width: 120px;
        height: 74px;
        object-fit: cover;
      }
    }
  }
</style>

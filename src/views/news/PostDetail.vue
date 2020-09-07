<template>
  <div>
    <hm-topbar></hm-topbar>
    <!-- 头部 -->
    <van-sticky>
      <div class="header">
        <div class="back" @click="$router.back()">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew" @click="$router.push('/')"></span>
        </div>
        <div class="follow">
          <div class="followed" v-if="post.has_follow" @click="unfollow(post.user.id)">已关注</div>
          <div class="unfollowed" v-else @click="follow(post.user.id)">关注</div>
        </div>
      </div>
    </van-sticky>
    <!-- 文章主体内容 -->
    <div class="post">
        <!-- 标题 -->
      <div class="title">
        <h5>{{post.title}}</h5>
        <span class="user">{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <!-- 正文 -->
      <!-- 文本内容 -->
      <div class="content" v-html="post.content" v-if="post.type === 1"></div>
      <!-- 视频内容 -->
      <video :src="getUrl (post.content)" controls v-else></video>
      <!-- 正文底部 -->
      <div class="content-floor">
        <span @click="like" :class="{like: post.has_like}">
          <i class="iconfont icondianzan"></i>
          {{post.like_length}}
        </span>
        <span>
          <i class="iconfont iconweixin"></i>
          微信
        </span>
      </div>
    </div>
    <!-- 页面底部 -->
    <div class="newsBottom">
      <div class="reply">
        <input type="text" placeholder="写跟帖">
      </div>
      <div class="comments">
        <span class="iconfont iconpinglun-"></span>
        <span class="commentsNum">{{post.comment_length}}</span>
      </div>
      <div class="star" @click="collect" :class="{collect: post.has_star}">
        <span class="iconfont iconshoucang"></span>
      </div>
      <div class="share">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    // 封装请求渲染文章数据的函数
    async getDetail () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log(data)
        this.post = data
      }
    },
    // 封装获取视频地址的函数
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    // 封装判断是否登录的函数
    unLogin () {
      // 没有登录的时候，跳转到登录页面
      if (!localStorage.getItem('token')) {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      }
    },
    // 取消关注功能
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确认要取消关注该用户吗？'
        })
      } catch {
        return
      }
      // 点击确认后，发送请求
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },
    // 关注功能
    async follow (id) {
      // 判断未登录的时候，return
      if (this.unLogin()) {
        return
      }
      // 登录的时候，发送请求
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getDetail()
      }
    },
    // 点赞功能
    async like () {
      // 判断未登录的时候，return
      if (this.unLogin()) {
        return
      }
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.getDetail()
      }
    },
    // 收藏功能
    async collect () {
      // 判断未登录的时候，return
      if (this.unLogin()) {
        return
      }
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.getDetail()
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 头部样式
  /deep/ .van-sticky--fixed {
    z-index: 999;
    top:40px;
    background-color: #fff;
  }
  .header {
    height: 60px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    .logo {
      flex: 1;
      .iconnew {
        font-size: 70px;
        line-height: 70px;
      }
    }
    .back {
      margin-right: 5px;
      .iconjiantou2 {
        font-size: 20px;
        line-height: 50px;
      }
    }
    .follow {
      div {
        height: 30px;
        width: 80px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        border-radius: 15px;
      }
      .unfollowed {
        color: #fff;
        background-color: red;
        border: 1px solid red;
      }
    }
  }
// 主体内容样式
.post {
  padding: 10px;
  border-bottom: 3px solid #ddd;
  .title {
    span {
      margin-right: 15px;
      color: #999;
      font-size: 16px;
    }
  }
  .content {
    margin: 20px 0;
    font-size: 18px;
    // line-height: 26px;
    /deep/ img {
      width: 100%;
    }
    // /deep/ p{
    //   text-indent: 2em;
    // }
  }
  video {
    margin: 10px 0;
    width: 100%;
  }
  .content-floor {
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    span {
      width: 100px;
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      border: 1px solid #999;
      border-radius: 15px;
      .iconweixin {
        color: limegreen;
      }
    }
    .like {
      border: 1px solid rgb(255, 102, 0);
      color: rgb(255, 102, 0);
    }
  }
}
// 页面底部样式
.newsBottom {
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .reply {
    width: 200px;
    input {
      padding-left: 20px;
      width: 100%;
      height: 40px;
      font-size: 18px;
      background-color: #ddd;
      border: 1px solid #ddd;
      border-radius: 20px;
    }
  }
  .comments {
    position: relative;
    .commentsNum {
      position: absolute;
      top: -5px;
      left: 13px;
      padding: 0 3px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: #fff;
      border: 1px solid red;
      background-color: red;
      border-radius: 9px;
    }
    .iconpinglun- {
      font-size: 30px;
    }
  }
  .iconshoucang {
    font-size: 28px;
  }
  .iconfenxiang {
    font-size: 28px;
  }
  .collect {
    color: orange;
  }
}
</style>

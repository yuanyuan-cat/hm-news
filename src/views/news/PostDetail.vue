<template>
  <div>
    <hm-topbar></hm-topbar>
    <!-- 头部 -->
    <div class="header">
      <div class="back" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew" @click="$router.push('/')"></span>
      </div>
      <div class="follow">
        <div class="followed" v-if="post.has_follow">已关注</div>
        <div class="unfollowed" v-else>关注</div>
      </div>
    </div>
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
      <video :src="getUrl (post.content)" controls></video>
      <!-- 正文底部 -->
      <div class="content-floor">
        <span>
          <i class="iconfont icondianzan"></i>
          {{post.like_length}}
        </span>
        <span>
          <i class="iconfont iconweixin"></i>
          微信
        </span>
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
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang="less" scoped>
// 头部样式
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
  }
}
</style>

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
    <!-- 评论列表 -->
    <div class="commentsList">
      <h4>精彩跟帖</h4>
      <!-- 评论列表组件 -->
      <!-- <hm-comment @reply="onReply" :comment="item" v-for="item in commentsList" :key="item.id"></hm-comment> -->
      <hm-comment :comment="item" v-for="item in commentsList" :key="item.id"></hm-comment>
    </div>
    <!-- 页面底部 -->
    <!-- textarea模块 -->
    <div class="textareaBottom replyBottom" v-if="isShowTextarea">
      <div class="replyTextarea">
        <textarea
        :placeholder="'回复' + nickname"
        ref="textarea"
        @keyup.enter="publish"
        @blur="onBlur"
        v-model="commentContent">
        </textarea>
      </div>
      <van-button type="danger" @click="publish">发送</van-button>
    </div>
    <!-- input框模块 -->
    <div class="inputBottom replyBottom" v-else>
      <div class="replyInput">
        <input type="text" placeholder="写跟帖" @focus="onFocus">
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
      },
      commentsList: [],
      isShowTextarea: false,
      commentContent: '',
      commentId: '',
      nickname: ''
    }
  },
  created () {
    this.getDetail()
    this.getComments()
    // 给bus注册reply事情
    this.$bus.$on('reply', this.onReply)
  },
  destroyed () {
    // 组件摧毁时候，摧毁reply事件
    this.$bus.$off('reply', this.onReply)
  },
  methods: {
    // 封装请求渲染文章数据的函数
    async getDetail () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    // 封装请求渲染评论列表的函数
    async getComments () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        console.log(data)
        this.commentsList = data
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
    },
    // 底部评论模块显示功能
    async onFocus () {
      this.isShowTextarea = true
      // 等待DOM更新
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    // 底部评论发表
    async publish () {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.commentContent,
        parent_id: this.commentId
      })
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.commentContent = ''
        this.isShowTextarea = false
        this.getComments()
        this.getDetail()
      }
    },
    // 底部评论框隐藏
    onBlur () {
      if (!this.commentContent.trim()) {
        this.isShowTextarea = false
      }
    },
    // 评论列表回复显示评论框功能
    async onReply (id, nickname) {
      this.isShowTextarea = true
      this.nickname = '@' + nickname
      this.commentId = id
      await this.$nextTick()
      this.$refs.textarea.focus()
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
// 评论列表样式
.commentsList {
  padding-bottom: 70px;
  h4 {
    margin: 10px 0;
    text-align: center;
    font-weight: 400;
  }
}
// 页面底部样式
.replyBottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: 10px;
  background-color: #fff;
}
// 搜索input样式
.inputBottom {
  justify-content: space-between;
  align-items: center;
  .replyInput {
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
// 搜索textarea样式
.textareaBottom {
  align-items: flex-end;
  justify-content: space-between;
  font-size: 16px;
  .replyTextarea {
    width: 280px;
    height: 100px;
    textarea {
      padding: 15px;
      width: 100%;
      height: 100%;
      border: none;
      background-color: #ddd;
      border-radius: 10px;
    }
  }
  .van-button {
    height: 30px;
    width: 70px;
    border-radius: 15px;
  }
}
</style>

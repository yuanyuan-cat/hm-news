<template>
  <div>
    <hm-topbar></hm-topbar>
    <hm-header>我的跟帖</hm-header>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="200"
      >
        <div class="comment" v-for="item in comments" :key="item.id">
          <!-- 时间 -->
          <div class="time">
            {{item.create_date | time('YYYY-MM-DD HH:mm')}}
          </div>
          <!-- 之前的评论 -->
          <div class="oldComment" v-if="item.parent">
            <p class="name">回复：{{item.parent.user.nickname}}</p>
            <p>{{item.parent.content}}</p>
          </div>
          <!-- 最新评论 -->
          <div class="newComment">
            <p>{{item.content}}</p>
            <div class="origin">
              <span>原文：{{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 封装发送评论列表请求的函数
    async getComments () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        // 追加评论列表
        this.comments = [...this.comments, ...data]
        // 加载数据的时候会自动把loading改为true，加载完成，改为false
        this.loading = false
        // 下拉加载后，把refreshing改为false
        this.refreshing = false
        // 判断是否加载完全部数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    // 上拉刷新，页面自增
    onLoad () {
      this.pageIndex++
      this.getComments()
    },
    // 下拉刷新，恢复到原始状态
    onRefresh () {
      this.comments = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.getComments()
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang="less" scoped>
  .comment {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    .time {
      font-size: 15px;
      color: #999;
    }
    .oldComment {
      margin: 20px 0;
      padding: 10px;
      background-color: #e4e4e4;
      color: #999;
      font-size: 18px;
      .name {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
    .newComment {
      font-size: 18px;
      .origin {
        margin-top: 10px;
        color: #999;
      }
    }
  }
</style>

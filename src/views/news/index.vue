<template>
  <div>
    <hm-topbar></hm-topbar>
    <!-- 顶部搜索框 -->
    <div class="top">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- 导航 -->
    <van-tabs v-model="active" sticky animated swipeable @change="change">
      <!-- 导航栏目列表 -->
      <van-tab :title="item.name" v-for="item in tabName" :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- list加载更多列表 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <!-- 文章列表组件 -->
            <hm-post :post="item" v-for="item in posts" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      tabId: '',
      tabName: [],
      posts: [],
      pageIndex: 1,
      pageSize: 5,
      // 加载更多和刷新的初始化设置
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 封装获取导航栏目的函数
    async getTabs () {
      const res = await this.$axios.get('/category')
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.tabName = data
        // 导航栏目请求成功后，发送请求获取第一栏的新闻列表
        this.tabId = this.tabName[0].id
        this.getPosts(this.tabId)
      }
    },
    // 封装获取栏目文章列表的函数
    async getPosts (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        // 累加数据
        this.posts = [...this.posts, ...data]
        // 修改loading和refreshing的值
        this.loading = false
        this.refreshing = false
        // 判断是否加载完毕
        if (data.length < this.pageSize) {
          // 修改finished的值
          this.finished = true
        }
      }
    },
    // 上拉刷新，页面增1，请求新数据
    onLoad () {
      this.pageIndex++
      this.getPosts(this.tabId)
    },
    // 下拉刷新
    onRefresh () {
      // 还原初始化值
      this.pageIndex = 1
      this.finished = false
      this.posts = []
      this.getPosts(this.tabId)
    },
    // 导航栏目切换
    change (name) {
      // 还原初始化值
      this.pageIndex = 1
      this.finished = false
      this.posts = []
      // 根据传来的下标来重新发送请求
      this.tabId = this.tabName[name].id
      this.getPosts(this.tabId)
    }
  },
  created () {
    this.getTabs()
  }
}
</script>

<style lang="less" scoped>
// 顶部搜索栏
  .top {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 50px;
    background-color: red;
    color: #fff;
    text-align: center;
    .logo {
      width: 70px;
      .iconnew {
        font-size: 60px;
      }
    }
    .user {
      width: 70px;
      .iconwode {
        font-size: 30px;
      }
    }
    .search {
      flex: 1;
      padding: 5px;
      margin: 0 10px;
      background-color: rgba(250, 250, 250, .5);
      font-size: 20px;
      border-radius: 17px;
      span:first-child {
        font-size: 24px;
        margin-right: 5px;
      }
    }
  }
  /deep/ .van-sticky {
    z-index: 999;
  }
  /deep/ .van-tab__text {
    font-size: 18px;
  }
</style>

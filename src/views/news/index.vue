<template>
  <div>
    <hm-topbar></hm-topbar>
    <!-- 顶部搜索框 -->
    <div class="top">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <span class="iconfont iconwode" @click="$router.push('/user')"></span>
      </div>
    </div>
    <!-- 导航 -->
    <!-- 导航管理图标 -->
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
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
  name: 'index',
  data () {
    return {
      active: 0,
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
      // 判断本地缓存是否有数据
      if (localStorage.getItem('delTabs')) {
        this.tabName = JSON.parse(localStorage.getItem('delTabs'))
        // 导航栏目请求成功后，发送请求获取第一栏的新闻列表
        this.getPosts(this.tabName[this.active].id)
        return
      }
      const res = await this.$axios.get('/category')
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.tabName = data
        // 导航栏目请求成功后，发送请求获取第一栏的新闻列表
        this.getPosts(this.tabName[this.active].id)
      }
    },
    // 封装获取栏目文章列表的函数
    async getPosts (id) {
      // 判断是否需要清空posts数据
      if (this.pageIndex === 1) {
        this.posts = []
      }
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
      this.getPosts(this.tabName[this.active].id)
    },
    // 下拉刷新
    onRefresh () {
      // 还原初始化值
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.posts = []
      this.getPosts(this.tabName[this.active].id)
    }
  },
  created () {
    this.getTabs()
  },
  // 导航栏切换，监听active的数据
  watch: {
    active (value) {
      this.pageIndex = 1
      this.posts = []
      this.loading = true
      this.finished = false
      this.getPosts(this.tabName[value].id)
    }
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
  /deep/ .van-sticky--fixed {
    top: 40px;
  }
  /deep/ .van-tab__text {
    font-size: 18px;
  }
  /deep/ .van-tabs__wrap {
    width: 85%;
  }
  .more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 1000;
    top: 40px;
  }
}
</style>

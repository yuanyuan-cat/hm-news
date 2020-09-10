<template>
  <div class="search">
    <hm-topbar></hm-topbar>
    <!-- 头部搜索框 -->
    <div class="header">
      <div class="back" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="keyword">
        <span class="iconfont iconsearch"></span>
        <input type="search" @input="recommend" placeholder="请输入搜索关键词" v-model="key" @keyup.enter="search">
      </div>
      <div class="search" @click="search">
        搜索
      </div>
    </div>
    <!-- 搜索推荐列表 -->
    <div class="recommend" v-if="recommendList.length">
      <div class="recommendItem one-line-cut" v-for="item in recommendList" :key="item.id" @click="goSearch(item.title)">
        {{item.title}}
      </div>
    </div>
    <!-- .搜索结果列表 -->
    <div class="searchList" v-else-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <!-- 历史记录 -->
      <div class="history list">
        <h5>历史记录</h5>
        <button class="clear" @click="clear">清空历史记录</button>
        <div class="item" v-for="item in history" :key="item" @click="goSearch(item)">{{item}}</div>
      </div>
      <!-- 热门搜索 -->
      <div class="hot list">
        <h5>热门搜索</h5>
        <button class="hiden" v-if="isHiden" @click="hide">隐藏</button>
        <button class="show" v-else @click="show">显示</button>
        <div v-show="isHotShow" class="item" v-for="item in hot" :key="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入lodash
import _ from 'lodash'
export default {
  data () {
    return {
      hot: ['情火', '茄子', '关晓彤'],
      key: '',
      list: [],
      recommendList: [],
      history: [],
      isHiden: true,
      isHotShow: true
    }
  },
  // 创建页面的时候，加载缓存中的搜索关键词
  created () {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    // 搜索功能
    async search () {
      // 搜索关键词非空判断
      if (!this.key.trim()) {
        return this.$toast('请输入搜索关键字')
      }
      // 发送请求获取数据
      const res = await this.$axios.get('post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        // 判断是否有该文章
        if (!total) {
          this.$toast.fail('很抱歉，没有相关文章')
          this.key = ''
          return
        }
        this.list = data
        // 删除和之前搜索一样的关键词
        this.history = this.history.filter(item => item !== this.key)
        // 关键词放在最前面
        this.history.unshift(this.key)
        // 更新缓存的数据
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    // 历史记录搜索功能
    goSearch (item) {
      this.key = item
      this.search()
    },
    // 显示推荐内容功能
    recommend: _.debounce(async function () {
      if (!this.key.trim()) {
        this.recommendList = []
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (!data.length) {
        this.recommendList = []
        this.$toast.fail('很抱歉，没有相关的文章')
        return
      }
      if (statusCode === 200) {
        this.recommendList = data
        console.log(_)
      }
    }, 1000),
    // 一键清空历史记录
    clear () {
      this.history = []
      localStorage.setItem('history', JSON.stringify(this.history))
    },
    // 显示隐藏热门搜索
    hide () {
      this.isHiden = false
      this.isHotShow = false
    },
    show () {
      this.isHiden = true
      this.isHotShow = true
    },
    // 回退功能
    back () {
      if (this.key.trim()) {
        this.key = ''
      } else {
        this.$router.back()
      }
    }
  },
  // 搜索框值的实时监听
  watch: {
    key (value) {
      if (!value) {
        this.list = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 头部样式
  .header {
    display: flex;
    padding: 10px 20px;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    .keyword {
      position: relative;
      height: 26px;
      width: 220px;
      .iconsearch {
        position: absolute;
        top: 3px;
        left: 7px;
      }
      input {
        padding-left: 30px;
        width: 100%;
        height: 100%;
        border-radius: 13px;
        border: 1px solid #ccc;
      }
    }
  }
// 内容样式
.list {
  position: relative;
  padding: 20px;
  overflow: hidden;
  h5 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .item {
    float: left;
    margin: 8px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    background-color: #ddd;
  }
}
.clear,
.show,
.hiden {
  position: absolute;
  top: 20px;
  right: 10px;
  font-size: 14px;
}
// 推荐模块
.recommend {
  padding: 20px;
  .recommendItem {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
}
</style>

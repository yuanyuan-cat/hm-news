<template>
  <div>
    <hm-topbar></hm-topbar>
    <hm-header>栏目管理</hm-header>
    <!-- 删除栏目 -->
    <div class="del">
      <p>点击删除以下频道</p>
      <div class="tabs">
        <div class="item" v-for="item in delTabs" :key="item.id" @click="del(item.id)">{{item.name}}</div>
      </div>
    </div>
    <!-- 添加栏目 -->
    <div class="add">
      <p>点击添加以下频道</p>
      <div class="tabs">
        <div class="item" v-for="item in addTabs" :key="item.id" @click="add(item.id)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 已存在，待删除的栏目数据
      delTabs: [],
      // 未存在，待添加的栏目数据
      addTabs: []
    }
  },
  methods: {
    // 发送请求，获取栏目数据
    async getTabs () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.delTabs = data
      }
    },
    // 删除栏目
    del (id) {
      if (this.delTabs.length <= 4) {
        this.$toast('请至少选择4个栏目')
        return
      }
      const index = this.delTabs.findIndex(item => item.id === id)
      this.addTabs.push(this.delTabs[index])
      this.delTabs.splice(index, 1)
    },
    // 添加栏目
    add (id) {
      const index = this.addTabs.findIndex(item => item.id === id)
      this.delTabs.push(this.addTabs[index])
      this.addTabs.splice(index, 1)
    }
  },
  // 渲染栏目数据
  created () {
    // 先判断本地缓存是否有数据
    if (localStorage.getItem('delTabs')) {
      this.delTabs = JSON.parse(localStorage.getItem('delTabs'))
      this.addTabs = JSON.parse(localStorage.getItem('addTabs'))
      return
    }
    this.getTabs()
  },
  // 监听栏目变化，存入本地缓存
  watch: {
    delTabs: {
      deep: true,
      handler (value) {
        localStorage.setItem('delTabs', JSON.stringify(this.delTabs))
        localStorage.setItem('addTabs', JSON.stringify(this.addTabs))
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .del,
  .add {
    padding: 15px;
    font-size: 16px;
    p {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-betwen;
      align-items: center;
      text-align: center;
      .item {
        margin: 5px;
        width: 76px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ccc;
      }
    }
  }
</style>

<template>
  <div class="navItem" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn () {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang="less" scoped>
  .navItem {
    display: flex;
    margin-left: 20px;
    padding-right: 20px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    .content {
      flex: 1;
      padding-right: 10px;
      text-align: right;
      color: #ccc;
    }
  }
</style>

<template>
  <div class="hm-header">
      <div class="back" @click="back">
          <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="empty"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  .hm-header {
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    .back,
    .empty {
      width: 50px;
    }
    .title {
        flex: 1;
        font-weight: 700;
    }
  }
</style>

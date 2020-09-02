<template>
  <div>
    <div class="hm-header">
          <div class="back" @click="back">
              <span class="iconfont iconjiantou2"></span>
          </div>
          <div class="title"><slot></slot></div>
          <div class="empty"></div>
    </div>
    <div class="placeholder"></div>
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
  .placeholder {
    height: 50px;
    width: 100%;
  }
  .hm-header {
    display: flex;
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
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

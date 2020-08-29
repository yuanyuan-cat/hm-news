<template>
  <div class="user">
    <!-- 头部 -->
    <div class="header">
      <div class="avatar">
        <img src="../assets/1.gif" alt="">
      </div>
      <div class="info">
        <span class="iconfont iconxingbienan"></span>
        <span>火星网友</span>
        <div class="time">2019-10-10</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 导航 -->
    <hm-navitem>
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的跟帖</template>
      <template v-slot:content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </hm-navitem>
    <hm-navitem>
      <template>设置</template>
    </hm-navitem>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .user {
    border-top: 40px solid #666;
    .header {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      font-size: 16px;
      border-bottom: 5px solid #ccc;
      .avatar img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 20px;
        .iconxingbienan {
          margin-right: 5px;
          color: skyblue;
        }
        .time {
          margin-top: 5px;
          color: #ccc;
        }
      }
    }
  }
</style>

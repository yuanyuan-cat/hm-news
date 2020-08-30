<template>
  <div class="user">
    <!-- 头部 -->
    <div class="header">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <div class="info">
        <span class="iconfont" :class="user.gender === 1 ? 'iconxingbienan' : 'iconxingbienv'"></span>
        <span>{{user.nickname}}</span>
        <div class="time">{{user.create_date | time}}</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 导航 -->
    <hm-navitem to="/follow">
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </hm-navitem>
    <hm-navitem to="/comment">
      <template>我的跟帖</template>
      <template v-slot:content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template to="/star">我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to="/edit">
      <template>设置</template>
    </hm-navitem>
    <!-- 底部 -->
    <div class="exit">
      退出当前账号
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async created () {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const res = await this.$axios.get(`/user/${id}`, {
      headers: {
        Authorization: token
      }
    })
    const { data, statusCode } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  }
}
</script>

<style lang="less" scoped>
  .user {
    border-top: 40px solid #666;
    font-size: 16px;
    .header {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      border-bottom: 5px solid #ccc;
      .avatar img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 20px;
        .iconfont {
          margin-right: 5px;
        }
        .iconxingbienan {
          color: skyblue;
        }
        .iconxingbienv {
          color: pink;
        }
        .time {
          margin-top: 5px;
          color: #ccc;
        }
      }
    }
    .exit {
      margin-top: 20px;
      text-align: center;
      color: red;
    }
  }
</style>

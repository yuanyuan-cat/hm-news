<template>
  <div class="user">
    <!-- 头部 -->
    <hm-topbar></hm-topbar>
    <div class="header" @click="$router.push('/user-edit')">
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
    <hm-navitem to="/star">
      <template>我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to="/user-edit">
      <template>设置</template>
    </hm-navitem>
    <div class="footer">
      <van-button type="danger" block @click="logout">退出</van-button>
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
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出吗？'
        })
      } catch {
        return this.$toast('取消退出')
      }
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  }
}
</script>

<style lang="less" scoped>
  .user {
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
    .footer {
      padding: 20px;
    }
  }
</style>

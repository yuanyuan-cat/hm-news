<template>
  <div class="user-edit">
    <hm-topbar></hm-topbar>
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <hm-navitem>
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem>
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem>
      <template>性别</template>
      <template #content>{{user.gender === 0 ? '女' : '男'}}</template>
    </hm-navitem>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  created () {
    this.updateUser()
  },
  methods: {
    // 封装一个发送ajax请求获取渲染数据的函数
    async updateUser () {
      const id = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${id}`)
      const { data, statusCode } = res.data
      // 请求成功后，获取渲染的数据
      if (statusCode === 200) {
        this.user = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar {
    padding: 40px 20px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
</style>

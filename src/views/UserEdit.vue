<template>
  <div class="user-edit">
    <hm-topbar></hm-topbar>
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <!-- 导航 -->
    <hm-navitem @click="showNickname">
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
    <!-- 弹出的dialog框 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-cell-group>
        <van-field v-model="nickname" placeholder="请输入昵称" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      show: false,
      nickname: '',
      id: localStorage.getItem('userId')
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 封装一个发送ajax请求获取渲染数据的函数
    async getUserInfo () {
      const res = await this.$axios.get(`/user/${this.id}`)
      const { data, statusCode } = res.data
      // 请求成功后，获取渲染的数据
      if (statusCode === 200) {
        this.user = data
      }
    },
    // 封装一个发送修改信息的ajax请求函数
    async updateUser (data) {
      const res = await this.$axios.post(`/user_update/${this.id}`, data)
      if (res.data.statusCode === 200) {
        // 调用渲染页面数据的函数
        this.getUserInfo()
        // 提示修改成功
        this.$toast.success('修改成功')
      }
    },
    // 显示昵称修改框
    showNickname () {
      // 显示修改框
      this.show = true
      // 渲染昵称
      this.nickname = this.user.nickname
    },
    // 确定修改昵称并更新昵称
    updateNickname () {
      this.updateUser({ nickname: this.nickname })
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
  // 修改框的样式设置
  /deep/ .van-dialog__content {
    padding: 15px;
  }
  .van-field {
    border: 1px solid #ccc;
  }
</style>

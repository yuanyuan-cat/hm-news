<template>
  <div>
    <hm-topbar></hm-topbar>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
      v-model="username"
      label="账号"
      placeholder="请输入账号"
      :rules="rules.username"
      />
      <van-field
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      :rules="rules.password"
      />
      <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        登录
      </van-button>
      </div>
    </van-form>
    <div class="footer">
      没有账号？去<router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '账号长度为5-11为数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', triggle: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度为3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      // 储存id和token
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.user.id)
      // 登录成功，跳转到user页面
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  created () {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  }
}
</script>

<style lang="less" scoped>
  .van-form {
    margin-top: 30px;
  }
  .footer {
    padding: 20px;
    text-align: right;
    font-size: 16px;
    a {
      color: red;
    }
  }
</style>

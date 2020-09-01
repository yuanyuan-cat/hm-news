<template>
  <div class="user-edit">
    <hm-topbar></hm-topbar>
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <van-uploader :after-read="afterRead" />
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <!-- 导航 -->
    <hm-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{user.gender === 0 ? '女' : '男'}}</template>
    </hm-navitem>
    <!-- 弹出的dialog框 -->
    <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-cell-group>
        <van-field ref="nickname" v-model="nickname" placeholder="请输入昵称" />
      </van-cell-group>
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="updatePassword">
      <van-cell-group>
        <van-field ref="password" v-model="password" placeholder="请输入密码" />
      </van-cell-group>
    </van-dialog>
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-cell-group>
        <van-radio-group v-model="gender">
          <van-cell-group>
            <van-cell title="男" clickable @click="gender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="gender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
    </van-dialog>
    <!-- 图片裁剪器模态框 -->
    <div class="mask" v-show="isShowMask">
      <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="isShowMask=false">取消</van-button>
      <vue-cropper
      ref="cropper"
      :img="url"
      autoCrop
      autoCropWidth="100"
      autoCropHeight="100"
      fixed
      ></vue-cropper>
    </div>
  </div>
</template>

<script>
// 引入裁剪器
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      id: localStorage.getItem('userId'),
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: '',
      isShowMask: false,
      url: ''
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
    // 封装一个判断上传图片类型是否正确的函数
    isFile (name) {
      if (name.endsWith('.gif') || name.endsWith('png') || name.endsWith('jpg') || name.endsWith('jpeg')) {
        return true
      } else {
        return false
      }
    },
    // 显示昵称修改框
    async showNickname () {
      // 显示修改框
      this.isShowNickname = true
      // 渲染昵称
      this.nickname = this.user.nickname
      // 自动获取焦点设置
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    // 确定修改昵称并更新昵称
    updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    // 显示密码修改框
    async showPassword () {
      this.isShowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    // 确定修改密码并更新密码
    updatePassword () {
      this.updateUser({ password: this.password })
    },
    // 显示性别修改框
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    // 确定修改性别并更新性别
    updateGender () {
      this.updateUser({ gender: this.gender })
    },
    // 上传图片点击完毕后，判断上传的图片大小和类型是否正确；不正确则return、不允许继续下一步操作
    async afterRead (file) {
      const { size, name } = file.file
      if (!this.isFile(name)) {
        return this.$toast.fail('图片格式不正确')
      }
      if (size > 30 * 1024) {
        return this.$toast.fail('图片大小不能超过30kb')
      }
      // 验证无误后，显示图片裁剪器
      this.isShowMask = true
      // 设置需要裁剪的文件
      this.url = file.content
    },
    // 点击裁剪按钮后，获取裁剪器的图片信息
    crop () {
      this.$refs.cropper.getCropBlob(async blob => {
      // 将获取的图片信息上传到服务器
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        // 拿到服务器返回的url后发送给服务器并渲染页面
        if (statusCode === 200) {
          this.updateUser({ head_img: data.url })
        }
        // 隐藏裁剪器
        this.isShowMask = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar {
    position: relative;
    padding: 40px 20px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
  // 修改框的样式设置
  /deep/ .van-dialog__content {
    padding: 15px;
  }
  .van-field {
    border: 1px solid #ccc;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    .crop,
    .cancel {
      position: absolute;
      top: 0;
      z-index: 1;
    }
    .cancel {
      right: 0;
    }
  }
</style>

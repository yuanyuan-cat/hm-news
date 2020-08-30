<template>
  <div class="user-edit">
    <hm-topbar></hm-topbar>
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img src="../assets/1.gif" alt="">
    </div>
    <hm-navitem>
      <template>昵称</template>
      <template #content>火星网友</template>
    </hm-navitem>
    <hm-navitem>
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem>
      <template>性别</template>
      <template #content>男</template>
    </hm-navitem>
  </div>
</template>

<script>
export default {

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

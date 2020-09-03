<template>
  <div>
    <!-- 单图片模板 -->
    <div class="singlePicPost" v-if="post.cover.length===1 && !post.content.startsWith('http')">
      <div class="content">
        <div class="title">
          {{post.title}}
        </div>
        <div class="ref">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$URL(post.cover[0].url)" alt="">
      </div>
    </div>
    <!-- 三张图片模式 -->
    <div class="mutiplePicPost" v-if="post.cover.length===3 && !post.content.startsWith('http')">
      <div class="title">
        {{post.title}}
      </div>
      <div class="img">
        <img :src="$URL(post.cover[0].url)" alt="">
        <img :src="$URL(post.cover[1].url)" alt="">
        <img :src="$URL(post.cover[2].url)" alt="">
      </div>
      <div class="ref">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 视频模板 -->
    <div class="vedioPost" v-if="post.content.startsWith('http')">
      <div class="title">
        {{post.title}}
      </div>
      <div class="img">
        <img :src="$URL(post.cover[0].url)" alt="">
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="ref">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
// 公共的样式
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
  }
  .ref {
    font-size: 16px;
    color: #999;
    :first-child {
      margin-right: 20px;
    }
  }
// 单张图片模板
  .singlePicPost {
    display: flex;
    padding: 20px 10px;
    border-bottom: 1px solid #ccc;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      }
    .img {
      margin-left: 3px;
      img {
        width: 120px;
        height: 74px;
        object-fit: cover;
      }
    }
  }
// 三张图片模板
  .mutiplePicPost {
    padding: 20px 10px;
    border-bottom: 1px solid #ccc;
    .img {
      display: flex;
      margin: 10px 0;
      justify-content: space-between;
      img {
        width: 116px;
        height: 70px;
        object-fit: cover;
      }
    }
  }
// 视频模板
  .vedioPost {
    padding: 20px 10px;
    border-bottom: 1px solid #ccc;
    .img {
      position: relative;
      margin: 10px 0;
      width: 100%;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: #fff;
        background-color: rgba(0, 0, 0, .3);
        border-radius: 50%;
      }
    }
  }
</style>

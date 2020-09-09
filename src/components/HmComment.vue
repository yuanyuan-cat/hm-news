<template>
  <div class="comment">
    <!-- 评论头部 -->
    <div class="header">
      <div class="avatar">
        <img :src="$URL(comment.user.head_img)" alt="">
      </div>
      <div class="user">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | now}}</div>
      </div>
      <div class="reply" @click="reply">回复</div>
    </div>
    <!-- 楼层组件 -->
    <!-- @reply="onReply" -->
    <hm-floor
    :count="count"
    class="first"
    :comment="comment.parent"
    v-if="comment.parent">
    </hm-floor>
    <!-- 评论内容 -->
    <div class="content">
      {{comment.content}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  data () {
    return {
      count: this.getCount(0, this.comment)
    }
  },
  methods: {
    // 定义一个函数计算楼层数
    getCount (num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    },
    reply () {
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
    // // 把id和nickname传给父组件
    // reply (id, nickname) {
    //   this.$emit('reply', this.comment.id, this.comment.user.nickname)
    // },
    // // 把从floor接收到的id和nickname传给父组件
    // onReply (id, nickname) {
    //   this.$emit('reply', id, nickname)
    // }
  }
}
</script>

<style lang="less" scoped>
  .comment {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .header {
      display: flex;
      margin-bottom: 10px;
      .avatar {
        margin-right: 20px;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .user {
        flex: 1;
        .name {
          margin-bottom: 5px;
          font-size: 18px;
        }
        .time {
          font-size: 16px;
          color: #999;
        }
      }
      .reply {
        font-size: 16px;
        color: #999;
      }
    }
    .content {
      margin-top: 20px;
      font-size: 18px;
    }
  }
</style>

<template>
  <div>
    <!-- <hm-floor @reply="replyFn" :count="count - 1" :comment="comment.parent" v-if="comment.parent"></hm-floor> -->
    <hm-floor :count="count - 1" :comment="comment.parent" v-if="comment.parent"></hm-floor>
    <div class="floor">
      <div class="header">
        <div class="user">
          <span class="name">{{count}} {{comment.user.nickname}}</span>
          <span class="time">{{comment.create_date | now}}</span>
        </div>
        <div class="reply" @click="reply">
          回复
        </div>
      </div>
      <div class="content">
        {{comment.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    count: Number
  },
  methods: {
    reply () {
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
    // reply () {
    //   this.$emit('reply', this.comment.id, this.comment.user.nickname)
    // },
    // replyFn () {
    //   this.$emit('reply', this.comment.id, this.comment.user.nickname)
    // }
  }
}
</script>

<style lang="less" scoped>
  .first > .floor {
    border-bottom: 1px solid #ccc;
  }
  .floor {
    padding: 10px;
    border: 1px solid #ccc;
    border-bottom: none;
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .user {
        .name {
          margin-right: 10px;
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
      font-size: 18px;
    }
  }
</style>

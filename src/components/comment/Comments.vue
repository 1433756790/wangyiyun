<template>
  <div>
    <div class="commentBox">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="留下你的评论"
        maxlength="150"
        show-word-limit
        v-model="content"
        style="margin-bottom: 15px"
        @blur="isBlur"
        ref="inputTextArea"
      >
      </el-input>
      <div class="commentBtn" @click="pushComment">
        <el-button round size="medium">评论</el-button>
      </div>
    </div>
    <div class="commentDetailsBox" v-loading="commentLoading">
      <div
        v-for="(item, index) in commentInfo"
        :key="index"
        class="commentDetails"
      >
        <el-avatar
          :size="45"
          :src="item.user.avatarUrl"
          style="margin-right: 10px; flex-shrink: 0"
        ></el-avatar>
        <div style="width: 100%">
          <div style="margin-bottom: 20px">
            <span style="cursor: pointer; color: #5a8ab9"
              >{{ item.user.nickname }}：</span
            >
            <span style="color: #666666">{{ item.content }}</span>
          </div>
          <div
            v-for="(item1, index) in item.beReplied"
            :key="index"
            class="replied"
          >
            <span class="reName">@{{ item1.user.nickname }}：</span>
            <span style="color: #666666; font-size: 14px">{{
              item1.content
            }}</span>
          </div>
          <div class="commentBtns">
            <div>{{ item.time | datefmt("YYYY-MM-DD") }}</div>
            <div>
              <i
                @click="commentLike(item.commentId, item.liked)"
                :class="item.liked ? 'liked' : ''"
              >
                <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                {{ item.likedCount }}
              </i>
              <i><font-awesome-icon :icon="['far', 'share-square']" /></i>
              <i
                class="el-icon-chat-dot-square"
                @click="replyFor(item.commentId)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
      :current-page="currentPage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["getCommentsStyle", "commentType"],
  data() {
    return {
      content: "",
      // 当前页数
      currentPage: 1,
      // 上一条数据的Time
      cursor: "",
      // 评论数据
      commentInfo: [],
      total: 0,
      // 回复的ID
      commentId: "",
      // 回复的类型:1发送，2回复
      t: 1,
      commentLoading: false,
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 获取评论
    async getComments() {
      let timestamp = Date.parse(new Date());
      this.commentLoading = true;
      const { data: res } = await this.$http("/comment/new", {
        id: this.$route.params.id,
        type: this.commentType,
        pageNo: this.currentPage,
        sortType: this.getCommentsStyle,
        cursor: this.currentPage === 1 ? "" : this.cursor,
        timestamp,
      });
      this.commentInfo = res.data.comments;
      this.total = res.data.totalCount;
      this.cursor = res.data.cursor;
      this.commentLoading = false;
    },
    pageChange(page) {
      window.scrollTo(0, 200);
      this.currentPage = page;
      this.getComments();
      this.$emit("scrollToComment");
    },
    // 给评论点赞
    async commentLike(cid, liked) {
      const { data: res } = await this.$http("/comment/like", {
        id: this.$route.params.id,
        cid,
        type: this.commentType,
        t: liked ? 0 : 1,
      });
      this.getComments();
    },
    // 发送评论
    async pushComment() {
      if (this.content === "") {
        return this.$message.warning("评论不能为空！");
      }
      let timestamp = Date.parse(new Date());
      const { data: res } = await this.$http("/comment", {
        t: this.t,
        type: this.commentType,
        id: this.$route.params.id,
        content: this.content,
        commentId: this.commentId,
      });
      this.content = "";
      this.t = 1;
      this.content = "";
      this.commentId = "";
      console.log(res);
      this.getComments();
    },
    replyFor(id) {
      this.$refs.inputTextArea.focus();
      this.commentId = id;
      this.t = 2;
      this.$emit("scrollToComment");
    },
    isBlur() {
      if (this.content) return;
      this.t = 1;
    },
  },
  watch: {
    getCommentsStyle: function () {
      this.currentPage = 1;
      this.cursor = "";
      this.getComments();
    },
  },
};
</script>

<style lang="less" scoped>
.commentBox {
  padding-bottom: 10px;
  border-bottom: #e4e7ed solid 2px;
  margin-bottom: 20px;
  /deep/ .el-textarea .el-textarea__inner {
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      border-color: #898a8b;
    }
  }
  .commentBtn {
    text-align: right;
  }
}
.commentDetails {
  display: flex;
  font-size: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.commentBtns {
  margin-top: 8px;
  display: flex;
  color: rgb(172, 172, 172);
  align-items: center;
  justify-content: space-between;
  i {
    margin-right: 18px;
    cursor: pointer;
  }
}
/deep/.el-pagination {
  text-align: center;
  margin-bottom: 30px;
}
.replied {
  background-color: #f4f4f4;
  padding: 10px 10px;
  border-radius: 5px;
  .reName {
    font-size: 14px;
    color: rgb(90, 138, 185);
  }
}
.liked {
  color: #ec4747;
}
</style>
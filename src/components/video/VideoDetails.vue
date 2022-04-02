<template>
  <div class="videoDetails">
    <div class="left">
      <div style="font-size: 20px; font-weight: 600">MV详情</div>
      <div class="videoWrap">
        <video
          :src="videoUrl"
          class="videoPlayer"
          controls
          width="625px"
          height="350px"
        ></video>
      </div>
      <!-- Video -->
      <div class="videoInfo" v-if="isVideo">
        <div class="avator vrow">
          <el-avatar
            :size="50"
            :src="videoInfo.creator.avatarUrl"
            style="margin-right: 10px"
          ></el-avatar>
          {{ videoInfo.creator.nickname }}
        </div>

        <div class="vrow titleInfo">
          <span style="font-weight: 600; margin-right: 10px">{{
            videoInfo.title
          }}</span>
        </div>
        <div class="vrow">
          <span style="font-size: 13px; color: #aaaaaa; margin-right: 20px"
            >发布:{{ videoInfo.publishTime | datefmt("YYYY-MM-DD") }}</span
          >
          <span style="font-size: 13px; color: #aaaaaa; margin-right: 20px"
            >播放：{{ videoInfo.playTime | playcountfmt }}万</span
          >
        </div>
        <div class="btns vrow">
          <el-button round
            ><i><font-awesome-icon :icon="['fas', 'thumbs-up']" /></i>
            赞</el-button
          >
          <el-button round
            ><i><font-awesome-icon :icon="['far', 'heart']" /></i
            >收藏收藏</el-button
          >
          <el-button round
            ><i><font-awesome-icon :icon="['far', 'share-square']" /></i
            >分享</el-button
          >
        </div>
      </div>
      <!-- Mv -->
      <div class="videoInfo" v-else>
        <div class="avator vrow">
          <el-avatar
            :size="50"
            :src="videoInfo.artists[0].img1v1Url"
            style="margin-right: 10px"
          ></el-avatar>
          {{ videoInfo.artistName }}
        </div>

        <div class="vrow titleInfo">
          <span style="font-weight: 600; margin-right: 10px">{{
            videoInfo.name
          }}</span>
        </div>
        <div class="vrow">
          <span style="font-size: 13px; color: #aaaaaa; margin-right: 20px"
            >发布:{{ videoInfo.publishTime | datefmt("YYYY-MM-DD") }}</span
          >
          <span style="font-size: 13px; color: #aaaaaa; margin-right: 20px"
            >播放：{{ videoInfo.playCount | playcountfmt }}万</span
          >
        </div>
        <div class="btns vrow">
          <el-button round
            ><i><font-awesome-icon :icon="['fas', 'thumbs-up']" /></i>
            赞</el-button
          >
          <el-button round
            ><i><font-awesome-icon :icon="['far', 'heart']" /></i
            >收藏收藏</el-button
          >
          <el-button round
            ><i><font-awesome-icon :icon="['far', 'share-square']" /></i
            >分享</el-button
          >
        </div>
      </div>
      <div class="comment">
        <el-tabs v-model="activeName">
          <el-tab-pane label="按热度排序" name="2"></el-tab-pane>
          <el-tab-pane label="按时间排序" name="3"></el-tab-pane>
        </el-tabs>
        <div style="font-size: 20px; font-weight: 600; margin-bottom: 20px">
          评论
        </div>
        <comments
          :getCommentsStyle="activeName"
          :commentType="commentType"
          @scrollToComment="scrollToComment"
        ></comments>
      </div>
    </div>
    <div class="right">
      <div style="font-size: 20px; font-weight: 600">相关推荐</div>
      <div
        v-for="(item, index) in similarVideo"
        :key="index"
        class="similarList"
        @click="goVideoDetails(item.vid)"
      >
        <div class="videoImgWrap">
          <img :src="item.coverUrl + '?param=300y180'" />
          <div class="playTime">
            <i class="el-icon-video-play"
              >{{ item.playTime | playcountfmt }}万</i
            >
          </div>
          <div class="durationmsTime">
            {{ item.durationms | datefmt("mm:ss") }}
          </div>
        </div>
        <div class="autherAndTitle">
          <div style="margin: 10px 0 15px 0">{{ item.title }}</div>
          <div style="color: rgb(156, 156, 156)">
            by {{ item.creator[0].userName }}
          </div>
        </div>
      </div>
    </div>
    <el-backtop
      target=".el-main"
      :visibility-height="300"
      :bottom="100"
      :right="30"
    >
    </el-backtop>
  </div>
</template>

<script>
import Comments from "../comment/Comments.vue";
export default {
  inject: ["reload"],
  components: {
    Comments,
  },
  data() {
    return {
      videoUrl: "",
      videoInfo: {},
      activeName: "2",
      // 评论类型
      commentType: 5,
      similarVideo: [],
      isVideo: false,
    };
  },
  created() {
    if (this.$route.params.type === "video") {
      this.isVideo = true;
      this.commentType = 5;
      this.getVideoUrl();
      this.getVideoDetails();
    }
    if (this.$route.params.type === "mv") {
      this.commentType = 1;
      this.getMVUrl();
      this.getMVDetails();
    }
    this.getSimilarVideo();
  },
  methods: {
    //获取video的url
    async getVideoUrl() {
      const { data: res } = await this.$http("/video/url", {
        id: this.$route.params.id,
      });
      this.videoUrl = res.urls[0].url;
    },
    //获取video的数据
    async getVideoDetails() {
      const { data: res } = await this.$http("/video/detail", {
        id: this.$route.params.id,
      });
      this.videoInfo = res.data;
    },
    // 滚动到指定位置
    scrollToComment() {
      let videoDetails = document.querySelector(".el-main");
      let commentTitle = document.querySelector(".comment");
      videoDetails.scrollTo({
        behavior: "smooth",
        top: commentTitle.offsetTop - 70,
      });
    },
    // 获取相关视频
    async getSimilarVideo() {
      const { data: res } = await this.$http("/related/allvideo", {
        id: this.$route.params.id,
      });
      this.similarVideo = res.data;
      console.log(res);
    },
    goVideoDetails(id) {
      let regx = /[a-zA-Z]+/;
      let type = regx.test(id) ? "video" : "mv";
      this.$router.push({ name: "VideoDetails", params: { id: id, type } });
    },
    async getMVUrl() {
      const { data: res } = await this.$http("/mv/url", {
        id: this.$route.params.id,
      });
      this.videoUrl = res.data.url;
    },
    async getMVDetails() {
      const { data: res } = await this.$http("/mv/detail", {
        mvid: this.$route.params.id,
      });
      this.videoInfo = res.data;
      console.log(res);
    },
  },
  watch: {
    $route() {
      this.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.videoDetails {
  display: flex;
}
.left {
  margin-left: 33px;
  margin-right: 30px;
  width: 625px;
}
.right {
  flex-shrink: 0;
}
.videoWrap {
  margin-top: 15px;
  height: 350px;
  .videoPlayer {
    height: 100%;
  }
}
.videoInfo {
  margin-top: 20px;
}
.avator {
  display: flex;
  align-items: center;
}
.vrow {
  margin-bottom: 20px;
}
.titleInfo {
  font-size: 26px;
}
.btns i {
  margin-right: 5px;
}
.videoImgWrap {
  position: relative;
  color: white;
  font-size: 14px;
  overflow: hidden;
  width: 50%;
  margin-right: 10px;
  .durationmsTime {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
  .playTime {
    position: absolute;
    top: 6%;
    right: 5%;
  }
}
.similarList {
  width: 380px;
  margin-top: 15px;
  display: flex;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 10px;
  }
  .autherAndTitle {
    width: 50%;
    font-size: 14px;
  }
}
</style>
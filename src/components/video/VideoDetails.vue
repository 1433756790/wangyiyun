<template>
  <div>
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
      <div class="videoInfo">
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
      <div class="comment">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: "",
      videoInfo: {},
    };
  },
  created() {
    this.getVideoUrl();
    this.getVideoDetails();
  },
  methods: {
    //获取mv的url
    async getVideoUrl() {
      const { data: res } = await this.$http("/video/url", {
        id: this.$route.params.id,
      });
      this.videoUrl = res.urls[0].url;
    },
    //获取mv的数据
    async getVideoDetails() {
      const { data: res } = await this.$http("/video/detail", {
        id: this.$route.params.id,
      });
      console.log(res);
      this.videoInfo = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.left {
  margin-left: 33px;
  width: 625px;
}
.videoWrap {
  margin-top: 15px;
  .videoPlayer {
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
</style>
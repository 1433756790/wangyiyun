<template>
  <div>
    <audio
      :src="musicUrl"
      ref="audioPlayer"
      autoplay
      @timeupdate="timeupdate"
      @ended="changeMusic('next')"
    ></audio>
    <div class="bottomCtrl">
      <div class="left">
        <el-avatar
          :size="50"
          fit="fit"
          :src="leftImg"
          shape="square"
        ></el-avatar>
      </div>
      <div class="center">
        <div class="topButton">
          <i><font-awesome-icon icon="redo" class="fontasesome" /></i>
          <i><font-awesome-icon icon="step-backward" class="fontasesome" /></i>
          <div>
            <i v-if="!this.$store.state.isPlay"
              ><font-awesome-icon
                icon="play"
                class="fontasesome playBtn"
                @click="playAudio"
            /></i>
            <i v-else
              ><font-awesome-icon
                icon="pause"
                class="fontasesome playBtn"
                @click="stopAudio"
            /></i>
          </div>
          <i><font-awesome-icon icon="step-forward" class="fontasesome" @click="changeMusic('next')"/></i>
          <i
            ><font-awesome-icon :icon="['far', 'heart']" class="fontasesome"
          /></i>
        </div>
        <div class="botttmSlider">
          <span>{{ hasPlayTime | datefmt("mm:ss") }}</span>
          <el-slider
            v-model="timeProgress"
            :show-tooltip="false"
            class="progressSlider"
            @change="changePlayProgress"
          ></el-slider>
          <span>{{ allPlayTime | datefmt("mm:ss") }}</span>
        </div>
      </div>
      <div class="right">
        <i @click="volumeDown"><font-awesome-icon icon="volume-down" /></i>
        <el-slider
          v-model="volumeProgress"
          :show-tooltip="false"
          class="volumeProgress"
          @input="changeVolume"
        ></el-slider>
        <i class="el-icon-s-unfold" @click="drawer = !drawer"></i>
      </div>
      <el-drawer title="我是标题" :visible.sync="drawer" width="25%">
        <span>我来啦!</span>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    "$store.state.musicId"(id) {
      this.getMusicDetail(id);
      this.leftImg = this.$store.state.playMusicMessage.al.picUrl;
    },
    "$store.state.isPlay"() {},
  },
  data() {
    return {
      leftImg: require("@/../public/img/test.jpg"),
      timeProgress: 0,
      volumeProgress: 30,
      drawer: false,
      // 音乐url
      musicUrl: "",
      // 音乐总时长
      allPlayTime: "0",
      // 已经播放了多长时间
      hasPlayTime: "0",
    };
  },
  methods: {
    // 音量变为0
    volumeDown() {
      this.volumeProgress = 0;
    },
    // 获取歌曲的url
    async getMusicDetail(id) {
      const { data: res } = await this.$http("/song/url", { id });
      this.$refs.audioPlayer.volume = this.volumeProgress / 100;
      this.hasPlayTime = "0";
      this.allPlayTime = this.$store.state.allPlayTime;
      this.musicUrl = res.data[0].url;
    },
    // 播放音乐
    playAudio() {
      if (!this.musicUrl) return;
      this.$refs.audioPlayer.play();
      this.$store.commit("updatePlayState");
    },
    // 暂停播放
    stopAudio() {
      this.$refs.audioPlayer.pause();
      this.$store.commit("updatePlayState");
    },
    // 播放的时间变化
    timeupdate() {
      let time = Math.floor(this.$refs.audioPlayer.currentTime) * 1000;
      if (time >= 1000) {
        this.hasPlayTime = time;
      }
      this.timeProgress = Math.floor(
        (time / 1000 / Math.floor(this.allPlayTime / 1000)) * 100
      );
    },
    // 改变声音大小
    changeVolume(e) {
      this.$refs.audioPlayer.volume = e / 100;
    },
    // 改变歌曲的播放进度
    changePlayProgress(time) {
      let changeTime = Math.floor(((time / 100) * this.allPlayTime) / 1000);
      this.$refs.audioPlayer.currentTime = changeTime;
    },
    // 切换歌曲
    changeMusic(type) {
      if (type === "next") {
        this.$store.commit("updateMusicIndex", this.$store.state.playIndex + 1);
        let newRow = this.$store.state.musicDetailsList.tracks[
          this.$store.state.playIndex
        ];
        this.$store.commit("updateMusicId", newRow);
        this.$store.commit("updateAllPlayTime", newRow.dt);
      }
    },
  },
};
</script>

<style scoped lang="less">
.bottomCtrl {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  z-index: 9999;
  background-color: #fff;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(48px);
}
.topButton {
  display: flex;
  align-items: center;
  height: 18.75px;
  transform: translateY(5px);
}
.topButton i {
  display: inline-block;
  box-sizing: border-box;
  width: 62.5px;
  text-align: center;
}
.fontasesome {
  cursor: pointer;
  font-size: 16px;
}
.playBtn {
  font-size: 20px;
}
.botttmSlider {
  font-size: 13px;
  color: #c0c4cc;
  width: 480px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transform: translateY(8px);
}
.progressSlider {
  width: 380px;
}
.el-slider /deep/ .el-slider__button {
  width: 8px;
  height: 8px;
}
.right {
  display: flex;
  align-items: center;
  transform: translateY(3px);
  width: 140px;
  justify-content: space-between;
  margin-right: 5px;
}
.right i {
  cursor: pointer;
  font-size: 20px;
}
.volumeProgress {
  width: 80px;
  margin-left: 3px;
}
</style>>

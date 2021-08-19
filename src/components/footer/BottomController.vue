<template>
  <div>
    <audio :src="musicUrl" ref="audioPlayer" autoplay></audio>
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
          <i><font-awesome-icon icon="play" class="fontasesome playBtn" /></i>
          <i><font-awesome-icon icon="step-forward" class="fontasesome" /></i>
          <i
            ><font-awesome-icon :icon="['far', 'heart']" class="fontasesome"
          /></i>
        </div>
        <div class="botttmSlider">
          <span>00:00</span>
          <el-slider
            v-model="timeProgress"
            :show-tooltip="false"
            class="progressSlider"
            disabled
          ></el-slider>
          <span>00:00</span>
        </div>
      </div>
      <div class="right">
        <i @click="volumeDown"><font-awesome-icon icon="volume-down" /></i>
        <el-slider
          v-model="volumeProgress"
          :show-tooltip="false"
          class="volumeProgress"
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
    // 监听vuex中musicId的变化
    "$store.state.musicId"(id) {
      this.getMusicDetail(id);
    },
  },
  data() {
    return {
      leftImg: require("@/../public/img/test.jpg"),
      timeProgress: 0,
      volumeProgress: 0,
      drawer: false,
      // 音乐url
      musicUrl: "",
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
      this.musicUrl = res.data[0].url;
      console.log(this.musicUrl);
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

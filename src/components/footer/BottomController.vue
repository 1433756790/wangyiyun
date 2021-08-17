<template>
  <div class="bottomCtrl">
    <div class="left">
      <el-avatar :size="50" fit="fit" :src="leftImg" shape="square"></el-avatar>
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
      <i><font-awesome-icon icon="volume-down"/></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftImg: require("@/../public/img/test.jpg"),
      timeProgress: 0,
    };
  },
};
</script>

<style scoped>
.bottomCtrl {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>>

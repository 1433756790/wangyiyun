<template>
  <div class="detailsContent">
    <div class="top">
      <!-- 左侧歌单图片 -->
      <div class="avatorImg">
        <img :src="singerInfo.cover" />
      </div>
      <div class="right">
        <div class="singerName">{{ singerInfo.name }}</div>
        <div class="buttons">
          <el-button round size="medium">
            <i><font-awesome-icon :icon="['far', 'heart']" /></i>收藏
          </el-button>
          <el-button round size="medium">
            <i><font-awesome-icon :icon="['fas', 'link']" /></i>个人主页
          </el-button>
        </div>
        <div class="details">
          <span>单曲数：{{ singerInfo.musicSize }}</span>
          <span>专辑数：{{ singerInfo.albumSize }}</span>
          <span>MV数：{{ singerInfo.mvSize }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="专辑" name="1"></el-tab-pane>
      <el-tab-pane label="MV" name="2"></el-tab-pane>
      <el-tab-pane label="歌手详情" name="3"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singerInfo: [],
      activeName: "1",
    };
  },
  created() {
    this.getSingerInfo();
  },
  methods: {
    //获取歌手详情
    async getSingerInfo() {
      const { data: res } = await this.$http("/artist/detail", {
        id: this.$route.params.id,
      });
      console.log(res);
      this.singerInfo = res.data.artist;
    },
    handleClick(tab, event) {},
  },
};
</script>

<style lang="less" scoped>
.detailsContent {
  margin-top: 20px;
  .top {
    display: flex;
    margin-bottom: 35px;
    .avatorImg {
      height: 187.5px;
      width: 187.5px;
      margin-right: 20px;
      flex-shrink: 0;
      img {
        width: 100%;
        border-radius: 12px;
        height: 100%;
      }
    }
  }
}
.right {
  color: #373737;
  .singerName {
    margin-top: 15px;
    font-size: 28px;
    font-weight: 600;
  }
  .buttons {
    margin-top: 25px;
    margin-bottom: 25px;
    i {
      margin-right: 4px;
    }
  }
  .details {
    font-size: 14px;
    color: #666666;
    span {
      margin-right: 10px;
    }
  }
}
.el-tabs /deep/.el-tabs__nav-wrap::after {
  height: 0 !important;
}
.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #ec4141;
}
.el-tabs /deep/ .el-tabs__item {
  font-size: 15px;
}
.el-tabs /deep/ .el-tabs__item:hover {
  color: black;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  color: black;
  font-size: 15px;
  font-weight: 600;
}
</style>
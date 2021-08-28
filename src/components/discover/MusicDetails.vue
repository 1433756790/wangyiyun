<template>
  <div>
    <div class="detailsContent">
      <div class="top">
        <!-- 左侧歌单图片 -->
        <div class="avatorImg">
          <img :src="listDetailsData.coverImgUrl" alt="" />
        </div>
        <!-- 右侧歌单介绍 -->
        <div class="right">
          <div class="row1">
            <el-tag type="danger" size="mini">歌单</el-tag>
            <h1>{{ listDetailsData.name }}</h1>
          </div>
          <div class="row2">
            <el-avatar
              :size="30"
              :src="listDetailsData.creator.avatarUrl"
            ></el-avatar>
            <div class="nickname">
              {{ listDetailsData.creator.nickname }}
            </div>
            <div class="createTime">
              {{ listDetailsData.createTime | datefmt("YYYY-MM-DD") }}创建
            </div>
          </div>
          <div class="row3">
            <el-button type="danger" round size="medium">
              <i><font-awesome-icon icon="play" /></i>播放全部
            </el-button>
            <el-button round size="medium">
              <i><font-awesome-icon :icon="['far', 'heart']" /></i>收藏
            </el-button>
            <el-button round size="medium">
              <i><font-awesome-icon :icon="['far', 'share-square']" /></i>分享
            </el-button>
          </div>
          <div class="row4">
            <span>标签:</span>
            <span v-for="(item, index) in listDetailsData.tags" :key="index"
              >{{ item }}
            </span>
          </div>
          <div class="row5">
            <div>歌曲：{{ listDetailsData.trackCount }}</div>
            <div>播放量：{{ listDetailsData.playCount }}</div>
          </div>
          <div class="row6">
            <div>简介：{{ listDetailsData.description }}</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <music-details-bottom
          :musicList="musicList"
          :listDetailsData="listDetailsData"
        ></music-details-bottom>
      </div>
    </div>
  </div>
</template>

<script>
import MusicDetailsBottom from "./musicDetailsChild/MusicDetailsBottom.vue";
export default {
  components: { MusicDetailsBottom },
  data() {
    return {
      listDetailsData: {},
      musicList: [],
    };
  },
  created() {
    this.getMusicListDetails();
  },
  methods: {
    //根据id获取歌单详情
    async getMusicListDetails() {
      const { data: res } = await this.$http(`/playlist/detail`, {
        id: this.$route.params.id,
      });
      this.listDetailsData = res.playlist;
      this.musicList = res.playlist.tracks;
      console.log(res);
    },
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
        height: 100%;
        border-radius: 12px;
      }
    }
    .right {
      height: 187.5px;
      /deep/ .el-tag.el-tag--danger {
        background-color: transparent;
        border-color: red;
        color: red;
        border-radius: 0;
      }
    }
  }
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 700px;
  .row1 {
    display: flex;
    align-items: center;
    h1 {
      font-size: 25px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
    }
    /deep/ .el-tag {
      margin-right: 10px;
    }
  }
  .row2 {
    display: flex;
    align-items: center;
    font-size: 15px;
    > * {
      margin-right: 10px;
    }
    .nickname {
      color: #6191c2;
    }
  }
  .row3 i {
    margin-right: 4px;
  }
  .row4 {
    font-size: 13px;
  }
  .row5 {
    display: flex;
    align-items: center;
    font-size: 13px;
    > * {
      margin-right: 15px;
    }
  }
  .row6 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
  }
}
</style>>
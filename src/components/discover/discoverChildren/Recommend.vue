<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="243px">
      <el-carousel-item v-for="(item, index) in bannerData" :key="index">
        <img :src="item.imageUrl" alt="" style="width: 100%; height: 100%" />>
      </el-carousel-item>
    </el-carousel>
    <div class="recommmendMusic">
      <h2>推荐歌单<i class="el-icon-arrow-right"></i></h2>
      <div class="listCard">
        <div
          class="musicItem"
          v-for="(item, index) in musicList"
          :key="index"
          @click="pushMusicDetails(item.id)"
        >
          <img :src="item.picUrl" />
          <div class="musicDescribe">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      bannerData: [],
      musicList: [],
    };
  },
  created() {
    this.getBanners();
    this.getMusicList();
  },
  methods: {
    //获取轮播图数据
    async getBanners() {
      const { data: res } = await this.$http("/banner");
      this.bannerData = res.banners;
    },
    // 获取推荐歌单
    async getMusicList() {
      const { data: res } = await this.$http("/personalized", { limit: 10 });
      this.musicList = res.result;
    },
    // 跳转到歌单详情
    pushMusicDetails(id) {
      this.$router.push({ name: "musicDetails", params: { id } });
    },
  },
};
</script>

<style scoped>
.recommend /deep/ .el-carousel {
  margin: 10px 60px;
}
.recommend img {
  border-radius: 15px;
}
.recommend /deep/ .el-carousel__button {
  width: 37.5px;
  height: 2.5px;
}
.recommmendMusic h2 {
  color: black;
  font-size: 24px;
  font-weight: 600;
}
.recommmendMusic h2 i {
  color: black;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.listCard {
  display: flex;
  flex-flow: wrap;
  margin: 14px 0;
  margin-bottom: 0;
}
.musicItem {
  flex-shrink: 0;
  width: 18%;
  margin: 0 2% 20px 0;
  overflow: hidden;
  cursor: pointer;
}
.musicItem img {
  width: 100%;
}
</style>
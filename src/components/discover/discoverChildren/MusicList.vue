<template>
  <div>
    <div class="top">
      <div class="right">
        <span style="margin-right: 10px; font-size: 24px; font-weight: 500">{{
          currentTag
        }}</span>
        <el-popover
          placement="bottom"
          width="350"
          trigger="click"
          :offset="80"
          popper-class="categoriesPopover"
        >
          <div class="categories">
            <div
              v-for="(item, index) in categoriesList"
              :key="index"
              class="cateItem"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <el-button slot="reference" size="medium">选择分类</el-button>
        </el-popover>
      </div>
    </div>
    <div class="bottom">
      <div class="wrap">
        <div
          class="playlistItem"
          v-for="(item, index) in musicList"
          :key="index"
        >
          <img :src="item.coverImgUrl" />
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
      // 歌单分类
      categoriesList: [],
      // 当前标签
      currentTag: "流行",
      currentPage: 1,
      // 歌单列表
      musicList: [],
      total: 0,
    };
  },
  created() {
    this.getCategoriesList();
    this.getMusicSheetList();
  },
  methods: {
    // 获取歌单分类
    async getCategoriesList() {
      const { data: res } = await this.$http("/playlist/catlist");
      this.categoriesList = res.sub;
    },
    // 获取歌单
    async getMusicSheetList() {
      const { data: res } = await this.$http("/top/playlist", {
        cat: this.currentTag,
        offset: 50 * (this.currentPage - 1),
      });
      this.musicList = res.playlists;
      this.total = res.total;
      console.log(this.musicList);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./cssStyle/MusicList.css";
.top {
  border-bottom: 2px solid #c20c0c;
  padding: 5px 0;
  margin: 10px 0;
  .right {
    display: flex;
    align-items: center;
  }
}
.categories {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .cateItem {
    height: 30px;
    width: 25%;
    cursor: pointer;
    text-align: center;
    border-radius: 30px;
    line-height: 30px;
    margin: 5px 0;
    transform: scale(0.9);
  }
}
.wrap {
  display: flex;
  flex-flow: wrap;
  margin: 14px 0;
  margin-bottom: 0;
}
.playlistItem {
  flex-shrink: 0;
  width: 18%;
  margin: 0 2% 20px 0;
  overflow: hidden;
  cursor: pointer;
}
.playlistItem img {
  width: 100%;
  border-radius: 10px;
}
</style>>

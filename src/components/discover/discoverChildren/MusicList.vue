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
          v-model="isCategories"
        >
          <div class="categories">
            <div
              v-for="(item, index) in categoriesList"
              :key="index"
              class="cateItem"
              @click="swithTag(item.name)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <el-button size="medium" slot="reference">选择分类</el-button>
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
          <img :src="item.coverImgUrl" @click="pushMusicDetails(item.id)" />
          <div class="musicDescribe">{{ item.name }}</div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="50"
        @current-change="pageChange"
      >
      </el-pagination>
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
      isCategories: false,
    };
  },
  created() {
    if (window.sessionStorage.getItem("currentTag")) {
      this.currentTag = window.sessionStorage.getItem("currentTag");
    }
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
      // console.log(this.musicList);
    },
    // 切换标签
    swithTag(tag) {
      this.isCategories = !this.isCategories;
      if (this.currentTag === tag) return;
      this.currentTag = tag;
      window.sessionStorage.setItem("currentTag", this.currentTag);
      // console.log(tag);
      this.getMusicSheetList();
    },
    // 翻页
    pageChange(page) {
      this.currentPage = page;
      this.$router.push({
        name: "MusicList",
        query: { offest: 50 * (this.currentPage - 1) },
      });
      this.getMusicSheetList();
    },
    // 跳转到歌单详情
    pushMusicDetails(id) {
      this.$router.push({ name: "musicDetails", params: { id } });
    },
  },
  watch: {
    // currentPage:function(){
    // }
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
/deep/.el-pagination {
  margin: 10px 0;
  text-align: center;
}
</style>>

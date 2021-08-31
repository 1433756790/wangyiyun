<template>
  <div
    v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
    :infinite-scroll-distance="300"
    :infinite-scroll-immediate="false"
  >
    <div class="top">
      <el-popover
        placement="bottom"
        width="350"
        trigger="click"
        :offset="140"
        popper-class="categoriesPopover"
        v-model="isCategories"
      >
        <div class="categories">
          <div
            v-for="(item, index) in sortList"
            :key="index"
            class="cateItem"
            @click="swithTag(item)"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <el-button size="medium" slot="reference"
          >{{ currentTag.name
          }}<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </el-popover>
    </div>
    <div class="bottom">
      <div class="wrap">
        <div
          class="playlistItem"
          v-for="(item, index) in videoList"
          :key="index"
        >
          <img :src="item.data.coverUrl" />
          <div>{{ item.data.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 视频分类
      videoCategory: [],
      // 当前标签
      currentTag: {},
      // 当前视频页数
      videoPage: 1,
      // 是否还有更多视频数据
      hasMore: true,
      // 视频列表数据
      videoList: [],
      // 视频分类tag列表
      sortList: [],
      isCategories: false,
      // 无限滚动是否可用
      disabled: true,
      hasMore: false,
    };
  },
  async created() {
    this.getSortList();
  },
  methods: {
    // 获取视频标签
    async getSortList() {
      const { data: res } = await this.$http("/video/group/list");
      this.sortList = res.data;
      this.currentTag = res.data[0];
      this.getVideoList(this.currentTag.id);
      console.log(res);
    },
    swithTag(item) {
      this.videoPage = 1;
      this.videoList = [];
      this.currentTag = item;
      this.getVideoList(item.id);
      this.isCategories = false;
    },
    // 获取视频标签/分类下的视频
    async getVideoList(id) {
      const { data: res } = await this.$http("/video/group", {
        id,
        offset: 8 * (this.videoPage - 1),
      });
      this.videoPage++;
      console.log(res);
      this.videoList.push(...res.datas);
      this.hasMore = res.hasMore;
      this.disabled = false;
    },
    // 上拉触底触发
    load() {
      if (this.hasMore) {
        this.getVideoList(this.currentTag.id);
      }
      this.disabled = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../discover/discoverChildren/cssStyle/MusicList.css";
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
.top {
  margin-top: 20px;
}
.wrap {
  display: flex;
  flex-flow: wrap;
  margin: 14px 0;
  margin-bottom: 0;
}
.playlistItem {
  flex-shrink: 0;
  width: 23%;
  margin: 0 2% 20px 0;
  overflow: hidden;
  cursor: pointer;
}
.playlistItem img {
  width: 100%;
  // height: 100%;
  border-radius: 10px;
}
</style>>
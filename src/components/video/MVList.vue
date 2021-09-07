<template>
  <div>
    <div class="top">
      <div class="languageType itemWrap">
        <span style="margin-right: 20px; color: #666666">地区:</span>
        <div
          v-for="(item, index) in areaList"
          :key="index"
          class="typeItem"
          :class="index == activeNum1 ? 'typeItem_active' : ''"
          @click="switchLanguage(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="typeSort itemWrap">
        <span style="margin-right: 20px; color: #666666">类型:</span>
        <div
          v-for="(item, index) in typeList"
          :key="index"
          class="typeItem"
          :class="index == activeNum2 ? 'typeItem_active' : ''"
          @click="switchType(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="initialSort">
        <span style="margin-right: 20px; color: #666666; margin-top: 4px"
          >排序:</span
        >
        <span class="initialWrap">
          <div
            v-for="(item, index) in orderList"
            :key="index"
            class="typeItem initial"
            :class="index == activeNum3 ? 'typeItem_active' : ''"
            @click="switchSort(index)"
          >
            {{ item.name }}
          </div>
        </span>
      </div>
    </div>
    <div
      class="bottom"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="100"
      :infinite-scroll-immediate="false"
    >
      <div class="wrap">
        <div
          class="playlistItem"
          v-for="(item, index) in mvlist"
          :key="index"
          @click="goVideoDetails(item.id)"
        >
          <div class="videoImgWrap">
            <img :src="item.cover" />
            <div class="playTime">
              <i class="el-icon-video-play"
                >{{ item.playCount | playcountfmt }}万</i
              >
            </div>
            <div class="durationmsTime">
              {{ item.duration | datefmt("mm:ss") }}
            </div>
          </div>
          <div class="ItemText">{{ item.name }}</div>
          <div class="ItemText" style="color: #666666; font-size: 14px">
            {{ item.artistName }}
          </div>
        </div>
      </div>
    </div>
    <el-backtop
      target=".el-main"
      :visibility-height="300"
      :bottom="100"
      :right="20"
    >
    </el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // mv 地区
      areaList: [
        { name: "全部", path: "" },
        { name: "内地", path: "内地" },
        { name: "港台", path: "港台" },
        { name: "欧美", path: "欧美" },
        { name: "日本", path: "日本" },
        { name: "韩国", path: "韩国" },
      ],
      // mv 类型
      typeList: [
        { name: "全部", path: "" },
        { name: "官方版", path: "官方版" },
        { name: "原生", path: "原生" },
        { name: "现场版", path: "现场版" },
        { name: "网易出品", path: "网易出品" },
      ],
      // 排序
      orderList: [
        { name: "上升最快", path: "" },
        { name: "最热", path: "最热" },
        { name: "最新", path: "最新" },
      ],
      mvlist: [],
      currentPage: 1,
      // 当前地区
      area: "",
      // 当前类型
      type: "",
      // 当前排序
      order: "",
      // 是否还有更多数据
      hasMore: false,
      // 无限滚动是否可用
      disabled: false,
      activeNum1: 0,
      activeNum2: 0,
      activeNum3: 0,
    };
  },
  created() {
    this.getMvList();
  },
  methods: {
    // 获取mv
    async getMvList() {
      const { data: res } = await this.$http("/mv/all", {
        area: this.area,
        type: this.type,
        order: this.order,
        limit: 30,
        offset: (this.currentPage - 1) * 30,
      });
      this.currentPage++;
      this.hasMore = res.hasMore;
      this.mvlist.push(...res.data);
      this.disabled = false;
    },
    switchLanguage(index) {
      this.currentPage = 1;
      this.activeNum1 = index;
      this.area = this.areaList[index].path;
      this.mvlist = [];
      this.getMvList();
    },
    switchType(index) {
      this.currentPage = 1;
      this.activeNum2 = index;
      this.type = this.typeList[index].path;
      this.mvlist = [];
      this.getMvList();
    },
    switchSort(index) {
      this.currentPage = 1;
      this.activeNum3 = index;
      this.initial = this.orderList[index].path;
      this.mvlist = [];
      this.getMvList();
    },
    // 上拉触底触发
    load() {
      if (this.hasMore) {
        this.getMvList();
      }
      this.disabled = true;
    },
    goVideoDetails(id) {
      this.$router.push({
        name: "VideoDetails",
        params: { id: id, type: "mv" },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.itemWrap {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  flex-wrap: wrap;
}
.typeItem {
  font-size: 15px;
  width: 80px;
  height: 30px;
  margin-right: 10px;
  line-height: 30px;
  border-radius: 15px;
  cursor: pointer;
  color: #666666;
  flex-shrink: 0;
  text-align: center;
}
.typeItem_active {
  background-color: #fdf5f5;
  color: #ec4747;
}
.initialSort {
  display: flex;
  margin-top: 10px;
}
.initialWrap {
  display: flex;
  // align-items: center;
  max-width: 80%;
  flex-wrap: wrap;
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
  .videoImgWrap {
    position: relative;
    color: white;
    font-size: 14px;
    overflow: hidden;
    .durationmsTime {
      position: absolute;
      bottom: 5%;
      right: 5%;
    }
    .playTime {
      position: absolute;
      top: 6%;
      right: 5%;
    }
  }
}
.playlistItem img {
  flex-shrink: 0;
  width: 100%;
  max-height: 144px;
  border-radius: 10px;
}
.ItemText {
  margin-top: 10px;
  font-size: 15px;
}
</style>
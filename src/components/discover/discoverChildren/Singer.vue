<template>
  <div>
    <div class="top">
      <div class="languageType itemWrap">
        <span style="margin-right: 20px; color: #666666">语种:</span>
        <div
          v-for="(item, index) in languageType"
          :key="index"
          class="typeItem"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="typeSort itemWrap">
        <span style="margin-right: 20px; color: #666666">分类:</span>
        <div v-for="(item, index) in typeSort" :key="index" class="typeItem">
          {{ item.name }}
        </div>
      </div>
      <div class="initialSort">
        <span style="margin-right: 20px; color: #666666">筛选:</span>
        <span class="initialWrap">
          <div
            v-for="(item, index) in initialSort"
            :key="index"
            class="typeItem initial"
          >
            {{ item.name }}
          </div>
        </span>
      </div>
    </div>
    <div class="artistCard">
      <div v-for="(item, index) in artists" :key="index" class="artistItem">
        <img :src="item.img1v1Url" alt="" />
        <div style="margin-top: 10px">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languageType: [
        { area: -1, name: "全部" },
        { area: 7, name: "华语" },
        { area: 96, name: "欧美" },
        { area: 8, name: "日本" },
        { area: 16, name: "韩国" },
        { area: 0, name: "其它" },
      ],
      typeSort: [
        { type: -1, name: "全部" },
        { type: 1, name: "男歌手" },
        { type: 2, name: "女歌手" },
        { type: 3, name: "乐队" },
      ],
      initialSort: [
        { initial: -1, name: "热门" },
        { initial: "a", name: "A" },
        { initial: "b", name: "B" },
        { initial: "c", name: "C" },
        { initial: "d", name: "D" },
        { initial: "e", name: "E" },
        { initial: "f", name: "F" },
        { initial: "g", name: "G" },
        { initial: "h", name: "H" },
        { initial: "i", name: "I" },
        { initial: "j", name: "J" },
        { initial: "k", name: "K" },
        { initial: "l", name: "L" },
        { initial: "m", name: "M" },
        { initial: "n", name: "N" },
        { initial: "o", name: "O" },
        { initial: "p", name: "P" },
        { initial: "q", name: "Q" },
        { initial: "r", name: "R" },
        { initial: "s", name: "S" },
        { initial: "t", name: "T" },
        { initial: "u", name: "U" },
        { initial: "v", name: "V" },
        { initial: "w", name: "W" },
        { initial: "x", name: "X" },
        { initial: "y", name: "Y" },
        { initial: "z", name: "Z" },
        { initial: 0, name: "#" },
      ],
      artists: [],
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在页数
      currentPage: 1,
      singerList: [],
      // 是否还有更多数据
      isMore: false,
    };
  },
  created() {
    this.getArtistList();
  },
  methods: {
    async getArtistList() {
      const { data: res } = await this.$http("/artist/list", {
        type: this.type,
        area: this.area,
        initial: this.initial,
        offset: (this.currentPage - 1) * 30,
      });
      this.artists.push(...res.artists);
      console.log(res);
      this.isMore = res.more;
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
  width: 60px;
  height: 25px;
  margin-right: 10px;
  line-height: 25px;
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
.initial {
  margin-bottom: 10px;
}
.artistCard {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .artistItem {
    flex-shrink: 0;
    width: 18%;
    margin: 0 2% 20px 0;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>>
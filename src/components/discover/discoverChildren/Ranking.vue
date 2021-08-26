<template>
  <div>
    <div class="characterList">
      <h2 class="title">云音乐特色榜</h2>
      <div class="sumContainer">
        <div
          class="characterListItem"
          v-for="(item, index) in characterList"
          :key="index"
        >
          <img :src="item.coverImgUrl" @click="pushMusicDetails(item.id)" />
        </div>
      </div>
    </div>
    <div class="worlList">
      <h2 class="title">全球媒体榜</h2>
      <div class="sumContainer">
        <div
          class="characterListItem"
          v-for="(item, index) in worlList"
          :key="index"
        >
          <img :src="item.coverImgUrl" @click="pushMusicDetails(item.id)" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characterList: [],
      worlList: [],
    };
  },
  created() {
    this.getAllTopList();
  },
  methods: {
    async getAllTopList() {
      const { data: res } = await this.$http("/toplist");
      this.characterList = res.list.slice(0, 4);
      this.worlList = res.list.slice(4);
      // console.log(res.list);
    },
    // 跳转到歌单详情
    pushMusicDetails(id) {
      this.$router.push({ name: "musicDetails", params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.characterList {
  margin-top: 20px;
}
.title {
  font-weight: 600;
  color: black;
  font-size: 20px;
  font-weight: 600;
}
.sumContainer {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
}
.characterListItem {
  width: 18%;
  margin: 0 2% 20px 0;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 10px;
  }
  p {
    text-align: center;
  }
}
</style>>
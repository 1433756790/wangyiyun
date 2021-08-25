<template>
  <div>
    <div class="characterList">
      <h2 class="title">云音乐特色榜</h2>
      <div>
        
      </div>
    </div>
    <div class="worlList">
      <h2 class="title">全球媒体榜</h2>
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
  },
};
</script>

<style lang="less" scoped>
.characterList{
  margin-top: 20px;
}
.title {
  font-weight: 600;
  color: black;
  font-size: 20px;
  font-weight: 600;
}
</style>>
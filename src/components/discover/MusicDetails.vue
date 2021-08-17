<template>
  <div>
    <div class="detailsContent">
      <div class="top">
        <div class="avatorImg">
          <img :src="listDetailsData.playlist.coverImgUrl" alt="" />
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listDetailsData: {},
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
      this.listDetailsData = res;
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.detailsContent {
  margin-top: 20px;
  .top {
    .avatorImg {
      height: 187.5px;
      width: 187.5px;
      background-color: #bfa;
      img {
        width: 100%;
        border-radius: 15px;
      }
    }
  }
}
</style>>
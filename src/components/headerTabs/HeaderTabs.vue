<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="/discover/recommend"></el-tab-pane>
      <el-tab-pane label="歌单" name="/discover/musciclist"></el-tab-pane>
      <el-tab-pane label="排行榜" name="/discover/ranking"></el-tab-pane>
      <el-tab-pane label="歌手" name="/discover/singer"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push(tab.name);
    },
  },
  updated() {
    this.activeName = this.$route.path;
  },
  created() {
    this.activeName = this.$route.path;
  },
};
</script>

<style scoped>
.el-tabs /deep/.el-tabs__nav-wrap::after {
  height: 0 !important;
}
.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #ec4141;
}
.el-tabs /deep/ .el-tabs__item {
  font-size: 17px;
}
.el-tabs /deep/ .el-tabs__item:hover {
  color: black;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  color: black;
  font-size: 21px;
  font-weight: 600;
}
</style>
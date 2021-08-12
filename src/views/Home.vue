<template>
  <div class="Home">
    <!-- 布局 -->
    <el-container>
      <el-header>
        <header-bar></header-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderBar from "../components/header/HeaderBar.vue";
export default {
  components: {
    HeaderBar,
  },
};
</script>

<style lang="less" scoped>
.Home {
  /deep/ .el-header {
    height: 64px !important;
    width: 100%;
    background-color: red;
  }
}
</style>>

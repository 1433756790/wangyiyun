<template>
  <div class="Home">
    <!-- 布局 -->
    <el-container>
      <el-header>
        <header-bar></header-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            active-text-color="#000000"
          >
            <el-menu-item index="2">
              <i><font-awesome-icon icon="music" /></i>
              <span slot="title">发现音乐</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i><font-awesome-icon :icon="['fab', 'youtube']" /></i>
              <span slot="title">视频</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i><font-awesome-icon :icon="['fas', 'thumbs-up']" /></i>
              <span slot="title">收藏</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i><font-awesome-icon :icon="['fas', 'thumbs-up']" /></i>
              <span slot="title">每日推荐</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
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
  /deep/ .el-aside {
    height: calc(100vh - 105px);
    border-right: 1px solid #ccc;
  }
}
.el-menu {
  /deep/ .el-menu-item {
    font-size: 15px;
    color: #303133;
    display: flex;
    i {
      margin-right: 10px;
      transform: translate(0, -3px);
    }
    /deep/.is-active {
      font-weight: 600;
    }
  }
}
</style>>

<template>
  <div class="Home">
    <!-- 布局 -->
    <el-container>
      <el-header>
        <header-bar></header-bar>
      </el-header>
      <el-container v-if="isRouterAlive">
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            active-text-color="#000000"
          >
            <el-menu-item index="2" @click="pushRouter('/discover')">
              <i><font-awesome-icon icon="music" /></i>
              <span slot="title">发现音乐</span>
            </el-menu-item>
            <el-menu-item index="3" @click="pushRouter('/video')">
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
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>
        <bottom-controller></bottom-controller>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import BottomController from "../components/footer/BottomController.vue";
import HeaderBar from "../components/header/HeaderBar.vue";
export default {
  components: {
    HeaderBar,
    BottomController,
  },
  methods: {
    pushRouter(route) {
      this.$router.push(route);
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
};
</script>

<style lang="less" scoped>
.Home {
  height: 100%;
  /deep/ .el-header {
    height: 64px !important;
    width: 100%;
    background-color: red;
  }
  /deep/ .el-aside {
    height: calc(100vh - 131px);
    border-right: 1px solid #ccc;
  }
  .el-container {
    height: 100%;
  }
}
/deep/.el-menu {
  border: none;
  .el-menu-item {
    font-size: 15px;
    color: #303133;
    display: flex;
    i {
      margin-right: 10px;
      transform: translate(0, -3px);
    }
  }
}
/deep/.el-main {
  padding-top: 12px;
  padding-left: 30px;
  max-height: calc(100vh - 131px);
  padding-bottom: 0;
  &::-webkit-scrollbar {
    width: 10px;
  }
}
/deep/.el-footer {
  border-top: 1px solid #ccc;
  box-sizing: content-box;
  padding-top: 6px;
  z-index: 9999;
  background-color: #fff;
}
</style>>

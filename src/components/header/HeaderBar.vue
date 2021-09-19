<template>
  <div>
    <div class="header">
      <div class="left"><img src="@/../public/img/logo.47591c5c.png" /></div>
      <div class="center">
        <!-- 控制页面向前向后跳转的按钮 -->
        <div class="arrows">
          <span><i class="el-icon-arrow-left" @click="pushPage(-1)"></i></span>
          <span><i class="el-icon-arrow-right" @click="pushPage(1)"></i></span>
        </div>
        <!-- 输入框弹窗 -->
        <el-popover
          placement="bottom"
          width="350"
          trigger="focus"
          :visible-arrow="false"
          popper-class="inputPopover"
          v-model="isPopover"
        >
          <!-- 热搜作品榜 -->
          <div class="hot" v-if="!searchInput">热搜榜</div>
          <div class="hot" v-else style="cursor: pointer">
            搜"{{ searchInput }}"相关用户>
          </div>
          <el-table
            :data="hotList"
            style="width: 100%"
            :show-header="false"
            v-if="!searchInput"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column>
              <template slot-scope="scoped">
                <div class="name">{{ scoped.row.searchWord }}</div>
                <div class="description">{{ scoped.row.content }}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="searchSuggest" v-else>
            <!-- 单曲 -->
            <div class="single" v-show="suggestList.songs">
              <div class="iWrap">
                <i><font-awesome-icon icon="music" />&nbsp;单曲</i>
              </div>
              <div
                v-for="(item, index) in suggestList.songs"
                :key="index"
                class="searchContent"
                @click="pushSelected('songs', item.id)"
              >
                <div>{{ item.name }}-{{ item.artists[0].name }}</div>
              </div>
            </div>
            <!-- 歌手 -->
            <div class="singer" v-show="suggestList.artists">
              <div class="iWrap"><i class="el-icon-user">&nbsp;歌手</i></div>
              <div
                v-for="(item, index) in suggestList.artists"
                :key="index"
                class="searchContent"
                @click="pushSelected('singer', item.id)"
              >
                <div>{{ item.name }}</div>
              </div>
            </div>
            <!-- 专辑 -->
            <div class="album" v-show="suggestList.albums">
              <div class="iWrap">
                <i><font-awesome-icon icon="compact-disc" />&nbsp;专辑</i>
              </div>
              <div
                v-for="(item, index) in suggestList.albums"
                :key="index"
                class="searchContent"
                @click="pushSelected('album', item.id)"
              >
                <div>{{ item.name }}-{{ item.artist.name }}</div>
              </div>
            </div>
            <!-- 歌单 -->
            <div class="songList" v-show="suggestList.playlists">
              <div class="iWrap">
                <i><font-awesome-icon icon="headphones" />&nbsp;歌单</i>
              </div>
              <div
                v-for="(item, index) in suggestList.playlists"
                :key="index"
                class="searchContent"
                @click="pushSelected('playlists', item.id)"
              >
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>
          <!-- 输入框 -->
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchInput"
            slot="reference"
            v-popover:popover
            @input="getSearchSuggest"
          >
          </el-input>
        </el-popover>
      </div>
      <div class="right">
        <div>
          <!-- 未登录状态 -->
          <el-popover
            placement="bottom"
            width="330"
            trigger="click"
            v-if="!userInfo.avatarUrl"
          >
            <el-form ref="form" :model="loginData" label-width="80px">
              <el-form-item label="手机号码"
                ><el-input
                  placeholder="请输入电话"
                  prefix-icon="el-icon-phone"
                  v-model="loginData.phone"
                >
                </el-input
              ></el-form-item>
              <el-form-item label="密码"
                ><el-input
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  v-model="loginData.password"
                  type="password"
                >
                </el-input
              ></el-form-item>
              <el-form-item
                ><el-button type="danger" @click="login"
                  >登录</el-button
                ></el-form-item
              >
            </el-form>
            <el-avatar
              :size="37.5"
              fit="fit"
              :src="avatorImg"
              slot="reference"
              @click="isPopoverShow = !isPopoverShow"
            ></el-avatar>
          </el-popover>
          <!-- 登录状态 -->
          <el-popover
            placement="bottom"
            width="150"
            trigger="hover"
            popper-class="personalPopover"
            v-else
          >
            <div class="personalBtn">
              <div @click="goPersonalHome">
                <i class="el-icon-user"></i>我的主页
              </div>
              <div @click="loginOut">
                <i class="el-icon-switch-button"></i>退出
              </div>
            </div>
            <el-avatar
              :size="37.5"
              fit="fit"
              :src="userInfo.avatarUrl"
              slot="reference"
              v-model="isPopoverShow"
            ></el-avatar>
          </el-popover>
        </div>
        <!-- 按钮 -->
        <span v-if="!userInfo.nickname">点击头像登录</span>
        <span v-else>{{ userInfo.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
      avatorImg: require("@/../public/img/test.jpg"),
      loginData: {
        phone: "15715268261",
        password: "yyh502498",
      },
      // 登录登出显示
      isPopoverShow: false,
      // 用户信息
      userInfo: {},
      // 热搜作品榜
      hotList: [],
      suggestList: {},
      isPopover: false,
    };
  },
  methods: {
    // 登录
    async login() {
      const { data: res } = await this.$http("/login/cellphone", {
        phone: this.loginData.phone,
        password: this.loginData.password,
        withCredentials: true,
      });
      if (res.code === 200) {
        console.log(res);
        window.localStorage.setItem("userInfo", JSON.stringify(res.profile));
        this.userInfo = res.profile;
        this.isPopoverShow = false;
        this.$message.success("登录成功");
        this.$router.go(0);
      }
    },
    // 判断是否已经登录
    isLogin() {
      if (window.localStorage.getItem("userInfo")) {
        this.$store.commit("updataLoginState");
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      }
    },
    // 退出登录的回调
    async loginOut() {
      const { data: res } = await this.$http("/logout");
      if (res.code === 200) {
        console.log(res);
        this.userInfo = {};
        window.localStorage.setItem("userInfo", "");
        this.$store.commit("updataLoginState");
        this.isPopoverShow = false;
        this.$message.success("退出成功");
        this.$router.go(0);
      }
    },
    // 控制页面前进后退跳转
    pushPage(a) {
      this.$router.go(a);
    },
    // 获取热搜作品榜
    async getHotList() {
      const { data: res } = await this.$http("/search/hot/detail");
      this.hotList = res.data;
      console.log("热搜", res);
    },
    async getSearchSuggest() {
      let timestamp = Date.parse(new Date());
      const { data: res } = await this.$http("/search/suggest", {
        keywords: this.searchInput,
        timestamp,
      });
      this.suggestList = res.result;
    },
    //根据类别到达指定的搜索内容区
    pushSelected(type, id) {
      this.isPopover = false;
      switch (type) {
        case "singer":
          this.$router.push({ name: "SingerDetails", params: { id } });
          break;
        case "playlists":
          this.$router.push({ name: "musicDetails", params: { id } });
          break;
        case "songs":
          this.$router.push({ name: "Song", params: { id } });
          break;
        case "album":
          this.$router.push({ name: "AlbumDetails", params: { id } });
          break;
        default:
          break;
      }
    },
    goPersonalHome() {
      this.$router.push({
        name: "PersonalHome",
        params: { id: this.userInfo.userId },
      });
    },
  },
  created() {
    this.isLogin();
    this.getHotList();
  },
};
</script>


<style lang="less" scoped>
@import "./headerCss/HeaderCss.css";
.header {
  height: 64px !important;
  width: 100%;
  background-color: red;
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  .left {
    width: 140px;
    margin-right: 62px;
    img {
      width: 100%;
    }
  }
  .center {
    display: flex;
    align-items: center;
    .arrows {
      display: flex;
      align-items: center;
      margin-right: 13px;
      span {
        font-size: 15px;
        width: 27.5px;
        height: 27.5px;
        display: block;
        border-radius: 50%;
        color: white;
        background-color: #e13e3e;
        text-align: center;
        &:first-child {
          margin-right: 8px;
        }
        i {
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
    .el-input {
      /deep/ .el-input__inner {
        border-radius: 20px;
        background-color: #e13e3e;
        border: none;
        height: 35px;
        line-height: 35px;
        width: 175px;
        color: white;
        &::placeholder {
          color: white;
        }
      }
      /deep/ .el-input__prefix,
      .el-input__suffix {
        color: white;
        .el-input__icon {
          line-height: 35px;
          cursor: pointer;
        }
      }
    }
  }
  .right {
    position: absolute;
    right: 62.5px;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    .el-avatar {
      margin-right: 10px;
      cursor: pointer;
      transform: translateY(2px);
    }
  }
}
.loginOut {
  transform: translateX(115px);
}
.hot {
  font-size: 18px;
  padding-left: 13px;
  border-bottom: 1px solid #666666;
}
.searchSuggest {
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  > div {
    display: flex;
    flex-direction: column;
    .iWrap {
      font-size: 16px;
      background-color: rgba(245, 245, 247);
      i {
        margin-left: 13px;
      }
    }
    .searchContent {
      line-height: 30px;
      cursor: pointer;
      font-size: 15px;
      width: 100%;
      &:hover {
        background-color: rgba(147, 147, 158, 0.4);
      }
      > div {
        height: 100%;
        padding-left: 33px;
        padding-right: 3px;
      }
    }
  }
}
</style>
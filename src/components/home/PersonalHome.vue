<template>
  <div class="personalHome">
    <div class="top">
      <el-avatar
        shape="square"
        :size="188"
        :src="userInfo.avatarUrl"
      ></el-avatar>
      <div class="personalMessage">
        <div class="topRow">
          <div class="userName">
            <span>{{ userInfo.nickname }}</span>
            <span class="lv">
              {{ level }}
              <i class="lvi"></i>
            </span>
          </div>
          <el-button v-if="isUser">编辑个人资料</el-button>
        </div>
        <div class="m-proifo">
          <div class="mwrap">
            <strong>{{ userInfo.eventCount }}</strong>
            <div>动态</div>
          </div>
          <div class="mwrap">
            <strong>{{ userInfo.follows }}</strong>
            <div>关注</div>
          </div>
          <div class="mwrap">
            <strong>{{ userInfo.followeds }}</strong>
            <div>粉丝</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="personalList"
      infinite-scroll-disabled="isDisabled"
      infinite-scroll-distance="100"
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
    >
      <div class="mySongList">
        <div class="title" v-if="isUser">
          我创建的歌单（{{ userInfo.playlistCount }}）
        </div>
        <div class="title" v-else>
          {{ userInfo.nickname }}创建的歌单（{{ userInfo.playlistCount }}）
        </div>
        <div class="songList">
          <div
            v-for="(item, index) in createdSongList"
            :key="index"
            class="songItem"
          >
            <div style="position: relative">
              <a :href="`/#/musicDetails/${item.id}`" :title="item.name">
                <img :src="item.coverImgUrl" alt="" />
                <div class="msk"></div
              ></a>
            </div>
            <div class="itemName">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="mySongList" v-if="collectedSongList.length != 0">
        <div class="title" v-if="isUser">我收藏的歌单</div>
        <div class="title" v-else>{{ userInfo.nickname }}收藏的歌单</div>
        <div class="songList">
          <div
            v-for="(item, index) in collectedSongList"
            :key="index"
            class="songItem"
          >
            <a :href="`/#/musicDetails/${item.id}`" :title="item.name">
              <img :src="item.coverImgUrl" />
              <div class="itemName">{{ item.name }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <el-backtop
      target=".el-main"
      :visibility-height="300"
      :bottom="100"
      :right="30"
    >
    </el-backtop>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      userInfo: {},
      uid: "",
      currentPage: 1,
      level: "",
      createdSongList: [],
      collectedSongList: [],
      // 是否还有未获取的歌单
      isMore: false,
      // 是否还有user创建的歌单
      isHasCreated: true,
      // 是否是本用户
      isUser: false,
      playId: "",
      isDisabled: false,
    };
  },
  created() {
    this.playId = JSON.parse(window.localStorage.getItem("userInfo")).userId;
    this.uid = this.$route.params.id;
    if (this.playId == this.uid) {
      this.isUser = true;
    }
    this.getUserInfo();
    this.getUserCreateSongList();
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http("/user/detail", {
        uid: this.uid,
      });
      this.level = res.level;
      this.userInfo = res.profile;
      console.log("用户信息", res);
    },
    //获取用户歌单
    async getUserCreateSongList() {
      const { data: res } = await this.$http("/user/playlist", {
        uid: this.uid,
        limit: 30,
        offset: (this.currentPage - 1) * 30,
      });
      if (res.more) {
        this.currentPage++;
      }
      this.isMore = res.more;
      if (this.isHasCreated) {
        // 用户创造的歌单
        this.createdSongList.push(
          ...res.playlist.filter((item) => {
            return item.userId == this.uid;
          })
        );
        // 用户收藏的歌单
        let result = res.playlist.filter((item) => {
          return item.userId != this.uid;
        });
        if (result.length != 0) {
          this.isHasCreated = false;
        }
        this.collectedSongList.push(...result);
      } else {
        this.collectedSongList.push(...res.playlist);
      }
      this.isDisabled = false;
      console.log("用户歌单", res);
      // console.log(this.collectedSongList);
      // console.log(this.createdSongList)
    },
    load() {
      if (this.isMore) {
        this.getUserCreateSongList();
      }
      this.isDisabled = true;
    },
  },
  watch: {
    $route() {
      this.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  margin-bottom: 40px;
}
.personalHome {
  padding: 20px 60px 0 10px;
  .top {
    display: flex;
    justify-content: space-between;
    .personalMessage {
      width: 78%;
      .topRow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        padding-top: 5px;
        border-bottom: 1px solid #ddd;
        /deep/.el-button {
          padding: 8px 18px;
          background-color: rgba(228, 227, 227, 0.7);
          &:hover {
            background-color: rgba(238, 236, 236, 0.7);
            color: #606266;
            border-color: #dcdfe6;
          }
        }
        .userName {
          font-size: 22px;
          font-weight: bold;
          display: flex;
          // align-items: center;
          justify-content: space-between;
          .lv {
            margin-left: 10px;
            background-image: url("https://s2.music.126.net/style/web2/img/icon2.png?5d44a80cca06420cc76fe015a918acad");
            background-position: -135px -190px;
            display: inline-block;
            height: 19px;
            overflow: hidden;
            padding-left: 29px;
            line-height: 21px;
            color: #e03a24;
            font-size: 14px;
            font-weight: bold;
            font-style: italic;
            .lvi {
              background-image: url("https://s2.music.126.net/style/web2/img/icon2.png?5d44a80cca06420cc76fe015a918acad");
              width: 9px;
              height: 19px;
              background-position: -191px -190px;
              float: right;
            }
          }
        }
      }
    }
  }
}
.m-proifo {
  display: flex;
  margin-top: 10px;
  .mwrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 20px;
    height: 40px;
    border-right: 1px solid #ddd;
    font-size: 12px;
    color: #666666;
    strong {
      display: block;
      margin-top: -4px;
      font-size: 24px;
      font-weight: normal;
      cursor: pointer;
    }
  }
}
.m-proifo div {
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
  }
}
.title {
  font-size: 20px;
  line-height: 28px;
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.itemName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songList {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .songItem {
    width: 18%;
    margin: 0 2.5% 20px 0;
    flex-shrink: 0;
    cursor: pointer;
    img {
      width: 100%;
    }
    .msk {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("https://s2.music.126.net/style/web2/img/coverall.png?02c886ac5c83e495e40365a3a249a469")
        no-repeat;
      background-position: 0 0;
    }
  }
  .songItem:nth-child(5n) {
    margin-right: 0;
  }
}
</style>
<template>
  <div class="song">
    <div class="left">
      <div class="leftContentWrap">
        <div class="iconImg">
          <div class="msk">
            <img :src="songData.al.picUrl + '?param=130y130'" alt="" />
          </div>
        </div>
        <div class="songDetails">
          <div class="songName">
            <i class="u-icn"></i>
            <div class="tit">
              <div class="songname">{{ songData.name }}</div>
              <div v-if="songMVUrl" @click="pushMv" class="mvTag">
                <div class="u-icn2"></div>
              </div>
            </div>
          </div>
          <div class="singerName">
            <span>歌手：</span>
            <span :title="songData.ar[0].name"
              ><a href="">{{ songData.ar[0].name }}</a></span
            >
          </div>
          <div class="ofalbum">
            <span>所属专辑：</span>
            <span
              ><a href="">{{ songData.al.name }}</a></span
            >
          </div>
          <div class="songBtn">
            <el-button
              type="primary"
              size="mini"
              class="Btn"
              @click="playSong(songData, 'current')"
            >
              <i class="el-icon-video-play"></i>播放
            </el-button>
            <el-button size="mini" class="btn-cl Btn"
              ><i><font-awesome-icon :icon="['fas', 'folder-plus']" /></i
              >收藏</el-button
            >
            <el-button size="mini" class="btn-share Btn"
              ><i><font-awesome-icon :icon="['fas', 'share-square']" /></i
              >分享</el-button
            >
            <el-button size="mini" class="btn-dload Btn"
              ><i><font-awesome-icon :icon="['fas', 'download']" /></i
              >下载</el-button
            >
          </div>
          <div class="lyric">
            <div v-if="ishaveLyric">
              <div
                v-for="(item, index) in lyric"
                :key="index"
                class="lyricItem"
              >
                <div v-show="index < extendLine">{{ item }}</div>
              </div>
              <div class="extend" @click="extendCtrl">
                <div v-if="!isExtend">
                  展开<i class="el-icon-arrow-down"></i>
                </div>
                <div v-else>收起<i class="el-icon-arrow-up"></i></div>
              </div>
            </div>
            <div v-else>暂时没有歌词 求歌词</div>
          </div>
        </div>
      </div>
      <div class="comment">
        <el-tabs v-model="activeName">
          <el-tab-pane label="按热度排序" name="2"></el-tab-pane>
          <el-tab-pane label="按时间排序" name="3"></el-tab-pane>
        </el-tabs>
        <div style="font-size: 20px; font-weight: 600; margin-bottom: 20px">
          评论
        </div>
        <comments
          :getCommentsStyle="activeName"
          :commentType="commentType"
          @scrollToComment="scrollToComment"
        ></comments>
      </div>
    </div>
    <div class="right">
      <div class="aboutAlbum">
        <div class="aboutTitle">包含这首歌的歌单</div>
        <div v-for="(item, index) in aboutAlbum" :key="index" class="albumWrap">
          <el-avatar
            shape="square"
            :size="50"
            :src="item.coverImgUrl"
          ></el-avatar>
          <div class="nameWrap">
            <div class="albumName" @click="pushAbout('album', item.id)">
              {{ item.name }}
            </div>
            <div class="nickName" @click="pushAbout('home', item.userId)">
              By {{ item.creator.nickname }}
            </div>
          </div>
        </div>
      </div>
      <div class="aboutSongs">
        <div class="aboutTitle">相似歌曲</div>
        <div class="songWrap" v-for="(item, index) in aboutSongs" :key="index">
          <div>
            <div class="songName" @click="pushAbout('song', item.id)">
              {{ item.name }}
            </div>
            <div
              class="artistName"
              @click="pushAbout('singer', item.artists[0].id)"
            >
              {{ item.artists[0].name }}
            </div>
          </div>
          <div class="aboutSongBtn">
            <i style="margin-right: 20px" @click="playSong(item, 'about')"
              ><font-awesome-icon :icon="['fas', 'play']"
            /></i>
            <i><font-awesome-icon :icon="['fas', 'plus']" /></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "../comment/Comments.vue";

export default {
  components: { Comments },
  inject: ["reload"],
  data() {
    return {
      songData: {},
      songMVUrl: "",
      routeId: "",
      lyric: [],
      isExtend: false,
      extendLine: 13,
      activeName: "2",
      // 评论类型
      commentType: 0,
      aboutAlbum: [],
      ishaveLyric: false,
      aboutSongs: [],
      topDistance: 0,
    };
  },
  created() {
    this.getSongData();
    this.getLyric();
    this.getAboutAlbum();
    this.getAboutSongs();
  },
  methods: {
    // 获取歌曲详情
    async getSongData() {
      const { data: res } = await this.$http("/song/detail", {
        ids: this.$route.params.id,
      });
      this.songData = res.songs[0];
      if (this.songData.mv) {
        this.songMVUrl = `/videoDetails/${this.songData.mv}/mv`;
      }
      console.log("歌曲详情", res);
    },
    pushMv() {
      this.$router.push(this.songMVUrl);
    },
    //获取歌词
    async getLyric() {
      const { data: res } = await this.$http("/lyric", {
        id: this.$route.params.id,
      });
      if (!res.lrc) return (this.ishaveLyric = false);
      let lyric = res.lrc.lyric.replace(/\[.*?\]/g, "").split("\n");
      this.lyric = lyric;
      this.ishaveLyric = true;
    },
    //控制歌词的展开
    extendCtrl() {
      let videoDetails = document.querySelector(".el-main");
      if (!this.isExtend) {
        this.topDistance = videoDetails.scrollTop;
      } else {
        videoDetails.scrollTop = this.topDistance;
      }
      this.isExtend = !this.isExtend;
      this.extendLine = this.isExtend ? this.lyric.length : 13;
    },
    // 滚动到指定位置
    scrollToComment() {
      let videoDetails = document.querySelector(".el-main");
      let commentTitle = document.querySelector(".comment");
      videoDetails.scrollTo({
        behavior: "smooth",
        top: commentTitle.offsetTop - 70,
      });
    },
    // 获取相关歌单
    async getAboutAlbum() {
      const { data: res } = await this.$http("/simi/playlist", {
        id: this.$route.params.id,
      });
      this.aboutAlbum = res.playlists;
      console.log(res);
    },
    // 进入指定歌单
    pushAbout(type, id) {
      switch (type) {
        case "album":
          this.$router.push({ name: "musicDetails", params: { id } });
          break;
        case "song":
          this.$router.push({ name: "Song", params: { id } });
          break;
        case "singer":
          this.$router.push({ name: "SingerDetails", params: { id } });
          break;
        case "home":
          this.$router.push({ name: "PersonalHome", params: { id } });
        default:
          break;
      }
    },
    // 获取相似歌曲
    async getAboutSongs() {
      const { data: res } = await this.$http("/simi/song", {
        id: this.$route.params.id,
      });
      this.aboutSongs = res.songs;
      console.log("相似歌曲", res);
    },
    // 播放音乐
    async playSong(item, type) {
      if (type === "about") {
        const { data: res } = await this.$http("/song/detail", {
          ids: item.id,
        });
        item = res.songs[0];
      }
      this.$store.commit("updateMusicId", item);
      this.$store.commit("updatePlayState", true);
      this.$store.commit("updateAllPlayTime", item.dt);
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
.song {
  padding: 20px 20px;
  display: flex;
  .left {
    width: 65%;
    padding-right: 30px;
    padding-top: 10px;
    border-right: 1px solid rgb(219, 218, 218);
    .leftContentWrap {
      display: flex;
      margin-bottom: 40px;
      .iconImg {
        position: relative;
        margin-right: 20px;
        // transform: translateY(-10px);
        .msk {
          position: relative;
          width: 206px;
          height: 205px;
          background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?949df909edc228254368f933d62e0ae2");
          background-position: -140px -580px;
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
          }
        }
      }
    }
    .songDetails {
      .songName {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .u-icn {
          background-image: url("https://s2.music.126.net/style/web2/img/icon.png?76a0ca33082793ef9f4ebdcbd5f90738");
          width: 54px;
          height: 24px;
          background-position: 0 -463px;
          margin-right: 10px;
        }
        .tit {
          display: flex;
          align-items: center;
          .songname {
            font-size: 25px;
            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
            margin-right: 10px;
          }
          .mvTag {
            cursor: pointer;
            width: 21px;
            height: 27px;
            display: flex;
            align-items: center;
            .u-icn2 {
              width: 21px;
              height: 18px;
              background-image: url("https://s2.music.126.net/style/web2/img/icon.png?76a0ca33082793ef9f4ebdcbd5f90738");
              background-position: 0 -18px;
            }
          }
        }
      }
      .singerName,
      .ofalbum {
        color: #999;
        font-size: 14px;
        margin-bottom: 10px;
        a {
          color: #0c73c2;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .right {
    padding-left: 35px;
    padding-top: 10px;
    width: 200px;
  }
}
.songBtn {
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  .Btn {
    font-size: 15px;
  }
  i {
    margin-right: 3px;
  }
}
.lyric {
  font-size: 13px;
  .lyricItem {
    font-family: "隶书";
    line-height: 20px;
    letter-spacing: 1px;
  }
  .extend {
    margin-top: 10px;
    color: #0c73c2;
    cursor: pointer;
  }
}
.aboutAlbum {
  margin-bottom: 50px;
}
.aboutTitle {
  font-size: 13px;
  font-weight: 550;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.albumWrap {
  display: flex;
  margin-bottom: 15px;
}
.nameWrap {
  font-size: 14px;
  margin-left: 10px;
  .albumName {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 24px;
    max-width: 140px;
    margin-bottom: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
  .nickName {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.songWrap {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .songName {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 154px;
    color: #333333;
    line-height: 25px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .artistName {
    color: #999999;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .aboutSongBtn {
    font-size: 11px;
    i {
      cursor: pointer;
      color: #ccc;
    }
  }
}
</style>
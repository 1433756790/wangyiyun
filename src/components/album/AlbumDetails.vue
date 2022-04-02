<template>
  <div class="albumDetails">
    <div class="left">
      <div class="leftContentWrap">
        <div class="iconImg">
          <div class="msk">
            <img :src="albumData.picUrl + '?param=177y177'" alt="" />
          </div>
        </div>
        <div class="songDetails">
          <div class="songName">
            <i class="u-icn"></i>
            <div class="tit">
              <div class="songname">{{ albumData.name }}</div>
            </div>
          </div>
          <div class="singerName">
            <span>歌手：</span>
            <span :title="albumData.artists[0].name"
              ><a href="">{{ albumData.artists[0].name }}</a></span
            >
          </div>
          <div style="margin-bottom: 10px">
            发行时间：{{ albumData.publishTime | datefmt("YYYY-MM-DD") }}
          </div>
          <div style="margin-bottom: 10px">
            发行公司：{{ albumData.company }}
          </div>
          <div class="songBtn">
            <el-button type="primary" size="mini" class="Btn">
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
        </div>
      </div>
      <div class="description">
        <div>专辑介绍：</div>
        <div
          v-html="description"
          class="albumdes limitSize"
          v-show="isExtend"
          v-if="isNeedExtend"
        ></div>
        <div v-html="description" class="albumdes" v-show="!isExtend"></div>
        <div class="extend" @click="extendCtrl" v-if="isNeedExtend">
          <div v-show="isExtend">展开<i class="el-icon-arrow-down"></i></div>
          <div v-show="!isExtend">收起<i class="el-icon-arrow-up"></i></div>
        </div>
      </div>
      <div>
        <div class="titleWrap">
          <span style="margin-right: 10px; font-size: 18px">包含歌曲列表</span>
          <span style="font-size: 12px; color: #666666"
            >{{ albumSong.length }}首歌</span
          >
        </div>
        <el-table
          :data="albumSong"
          stripe
          highlight-current-row
          style="width: 100%"
          :row-class-name="tabRowClassName"
        >
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column label="歌曲标题" width="400" prop="name">
          </el-table-column>
          <el-table-column label="时长" width="80">
            <template slot-scope="scoped">
              {{ scoped.row.dt | datefmt("mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column label="歌手" width="140">
            <template slot-scope="scoped">
              <div class="overCell">
                <span v-for="(item, index) in scoped.row.ar" :key="index">
                  {{ item.name }}/
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
      <div class="otherAlbum">
        <div class="aboutTitle">Ta的其他热门专辑></div>
        <div>
          <div
            v-for="(item, index) in singerAlbums"
            :key="index"
            class="albumWrap"
          >
            <el-avatar shape="square" :size="50" :src="item.picUrl"></el-avatar>
            <div class="nameWrap">
              <div class="albumName">
                {{ item.name }}
              </div>
              <div class="publishTime">
                {{ item.publishTime | datefmt("YYYY-MM-DD") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "../comment/Comments.vue";

export default {
  inject: ["reload"],
  components: { Comments },
  created() {
    this.albumId = this.$route.params.id;
    this.getAlbumData();
  },
  data() {
    return {
      albumData: {},
      albumId: "",
      description: "",
      isExtend: true,
      isNeedExtend: false,
      albumSong: [],
      activeName: "2",
      commentType: 3,
      singerAlbums: [],
      topDistance: 0,
    };
  },
  methods: {
    //自定义斑马纹
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 1) {
        return "warning-row";
      }
    },
    //获取album详情
    async getAlbumData() {
      const { data: res } = await this.$http("/album", { id: this.albumId });
      this.albumData = res.album;
      this.albumSong = res.songs;
      this.getSingerAlbums(res.album.artist.id);

      let description =
        "<p>" +
        res.album.description.replace(/\n*$/g, "").replace(/\n/g, "</p><p>") +
        "</p>";
      if (description.length > 200) {
        this.isNeedExtend = true;
      }
      this.description = description;
      console.log("专辑详情", res);
    },
    extendCtrl() {
      let videoDetails = document.querySelector(".el-main");
      if (this.isExtend) {
        this.topDistance = videoDetails.scrollTop;
      } else {
        videoDetails.scrollTop = this.topDistance;
      }
      this.isExtend = !this.isExtend;
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
    // 获取歌手专辑
    async getSingerAlbums(id) {
      const { data: res } = await this.$http("/artist/album", {
        id: this.albumData.artist.id,
        limit: 5,
      });
      this.singerAlbums = res.hotAlbums;
      console.log("歌手的专辑", res);
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
.albumDetails {
  display: flex;
  padding: 20px 20px;
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
          width: 209px;
          height: 177px;
          background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?949df909edc228254368f933d62e0ae2");
          background-position: 0 -986px;
          img {
            position: absolute;
            left: 0;
            z-index: -1;
          }
        }
      }
    }
    .songDetails {
      font-size: 14px;
      color: #999;
      .songName {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        color: black;
        .u-icn {
          background-image: url("https://s2.music.126.net/style/web2/img/icon.png?76a0ca33082793ef9f4ebdcbd5f90738");
          width: 54px;
          height: 24px;
          background-position: 0 -186px;
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
.albumdes {
  text-indent: 2rem;
  margin-top: 5px;
  font-size: 14px;
  color: #666666;
  line-height: 24px;
}
.limitSize {
  display: -webkit-box;
  overflow: hidden;
  /*autoprefixer:off*/
  -webkit-box-orient: vertical;
  /*autoprefixer:on*/
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
}
.description {
  margin-bottom: 20px;
}
.extend {
  float: right;
  margin-top: 10px;
  color: #0c73c2;
  cursor: pointer;
  font-size: 13px;
}
.el-tabs /deep/.el-tabs__nav-wrap::after {
  height: 0 !important;
}
.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #ec4141;
}
.el-tabs /deep/ .el-tabs__item {
  font-size: 15px;
  color: rgb(66, 65, 65);
}
.el-tabs /deep/ .el-tabs__item:hover {
  color: black;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  color: black;
  font-weight: 600;
}
.overCell {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/deep/.el-table .cell {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/deep/ .el-table td,
.el-table th {
  padding: 4px 0;
}
/deep/ .el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
/deep/.el-table .warning-row {
  background: #f9f9f9;
}
/deep/ .el-table .el-table__row {
  cursor: pointer;
}
/deep/.el-table__body tr.current-row > td {
  color: #fff;
  background: rgba(90, 90, 90, 0.66) !important;
}
/deep/.el-table {
  border: 1px solid #ebeef5;
}
/deep/ .el-table::before {
  height: 0;
}
.titleWrap {
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.aboutTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  .publishTime {
    font-size: 12px;
    color: #666;
  }
}
</style>>

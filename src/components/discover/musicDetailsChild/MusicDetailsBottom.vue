<template>
  <div>
    <div class="top">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="musicList">
          <!-- 歌曲列表 -->
          <el-table
            :data="musicList"
            style="width: 100%"
            :row-class-name="tabRowClassName"
            @row-dblclick="clickRow"
            highlight-current-row
            ref="musicTable"
          >
            <el-table-column type="index" label="#" width="40">
            </el-table-column>
            <el-table-column width="60" label="下载">
              <i><font-awesome-icon :icon="['fas', 'download']" /></i>
            </el-table-column>
            <el-table-column
              prop="name"
              label="音乐标题"
              min-width="350"
              style="color: #ec4141 !important"
            ></el-table-column>
            <el-table-column
              prop="ar[0].name"
              label="歌手"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="al.name"
              label="专辑"
              min-width="170"
            ></el-table-column>
            <el-table-column label="时长" min-width="100">
              <template scope="scoped">
                {{ scoped.row.dt | datefmt("mm:ss") }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comments"></el-tab-pane>
        <el-tab-pane label="收藏者" name="collector"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    "$store.state.playIndex"(index) {
      this.$refs.musicTable.setCurrentRow(this.musicList[index]);
    },
  },
  props: ["musicList", "listDetailsData"],
  data() {
    return {
      activeName: "musicList",
    };
  },
  methods: {
    //自定义斑马纹
    tabRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
      let index = rowIndex + 1;
      if (index % 2 == 1) {
        return "warning-row";
      }
    },
    // 点击选中行
    clickRow(row) {
      if (
        this.$store.state.musicDetailsList.id !== this.listDetailsData.id ||
        this.$store.state.musicDetailsList === ""
      ) {
        this.$store.commit("updateMusicList", this.listDetailsData);
      }
      if (this.$store.state.musicId !== row.id) {
        this.$store.commit("updateMusicIndex", row.index);
        this.$store.commit("updateMusicId", row);
        this.$store.commit("updateAllPlayTime", row.dt);
      }
      if (!this.$store.state.isPlay) {
        this.$store.commit("updatePlayState");
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>
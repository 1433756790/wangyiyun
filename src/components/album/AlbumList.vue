<template>
  <div class="albumWrap">
    <div v-for="(item, index) in singerAlbum" :key="index">
      <div class="albumItem">
        <div>
          <img :src="singerAlbumList[index].picUrl + '?param=200y200'" alt="" />
        </div>
        <div>
          <div class="albumTitle">{{ singerAlbumList[index].name }}</div>
          <el-table
            :data="item"
            :show-header="false"
            :row-class-name="tabRowClassName"
            style="margin-top: 20px; width: 100%"
            @row-dblclick="(row, column, cell, event) => clickRow(row, item)"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" min-width="400"></el-table-column>
            <el-table-column align="right" min-width="300">
              <template slot-scope="scoped">
                {{ scoped.row.ar[0].name }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerAlbum: {
      type: Array,
      default() {
        return;
      },
    },
    singerAlbumList: {
      type: Array,
      default() {
        return;
      },
    },
  },
  data() {
    return {
      newSingerAlbum: [],
    };
  },
  watch: {
    // singerAlbum(newVal) {
    //   this.newSingerAlbum = newVal;
    // },
  },
  created() {
    console.log(this.singerAlbum)
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
    clickRow(row, item) {
      this.$store.commit("updateMusicId", row);
      if (!this.$store.state.isPlay) {
        this.$store.commit("updatePlayState",true);
      }
      this.$store.commit("updateAllPlayTime", row.dt);
      this.$store.commit("updateMusicList", item);
      this.$store.commit("updateMusicIndex", row.index);
    },
  },
};
</script>

<style lang="less" scoped>
.albumWrap {
  width: 100%;
}
.albumItem {
  display: flex;
  margin-bottom: 40px;
  img {
    border-radius: 10px;
    margin-right: 20px;
  }
  .albumTitle {
    font-weight: 600;
    font-size: 20px;
  }
}
/deep/ .el-table td,
.el-table th {
  padding: 4px 0;
  border-bottom: none;
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
/deep/ .el-table::before {
  height: 0;
}
</style>
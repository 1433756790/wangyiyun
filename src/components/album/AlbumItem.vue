<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albumItemData: [],
    };
  },
  created() {
    // this.getAlbumItemData();
  },
  methods: {
    // async getAlbumItemData(id) {
    //   const { data: res } = await this.$http("/album", {
    //     id: id,
    //   });
    //   console.log(res);
    // },
  },
};
</script>

<style>
</style>
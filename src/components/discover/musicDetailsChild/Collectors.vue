<template>
  <div class="subscriber">
    <div class="subWrap">
      <div class="subItem" v-for="(item, index) in subscribers" :key="index">
        <el-avatar :size="60" :src="item.avatarUrl"></el-avatar>
        <div style="margin-left:10px">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="signature">{{ item.signature }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["subscribers"],
};
</script>

<style lang="less" scoped>
.subscriber {
  margin-top: 20px;
  margin-left: 50px;
  min-height: 100px;
  .subWrap {
    display: flex;
    flex-wrap: wrap;
    .subItem {
      //   padding: 10px;
      flex-shrink: 0;
      width: 43%;
      margin-right: 5%;
      margin-bottom: 20px;
      padding: 10px 0 10px 10px;
      display: flex;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: #f3f0f0;
      }
      .nickname {
        font-size: 16px;
        margin-top: 5px;
      }
      .signature {
        margin-top: 5px;
        font-size: 15px;
        color: #666666;
      }
    }
  }
}
</style>
<template>
  <div>
    <div class="header">
      <div class="left"><img src="@/../public/img/logo.47591c5c.png" /></div>
      <div class="center">
        <!-- 控制页面向前向后跳转的按钮 -->
        <div class="arrows">
          <span><i class="el-icon-arrow-left"></i></span>
          <span><i class="el-icon-arrow-right"></i></span>
        </div>
        <!-- 输入框 -->
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchInput"
        >
        </el-input>
      </div>
      <div class="right">
        <div>
          <el-popover
            placement="bottom"
            width="200"
            trigger="click"
          >
            <el-table :data="loginData">
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
            </el-table>
            <el-avatar
              :size="37.5"
              fit="fit"
              :src="avatorImg"
              slot="reference"
            ></el-avatar>
          </el-popover>
        </div>
        <span>点击头像登录</span>
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
      loginData: [],
    };
  },
  methods: {
    // 登录
    login() {
      console.log("1");
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>
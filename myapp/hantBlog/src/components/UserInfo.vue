<template>
  <div class="container">
    <div class="top">
      <el-card class="box-card">
        <div class="left1">
          <div>
            <img src="../assets/headImg.png">
          </div>
        </div>
        <div class="right1">
          <div>
            <div class="author">Hant</div>
            <div class="editor">
              <el-button plain>编辑资料</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="main1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发表的" name="first">发表</el-tab-pane>
        <el-tab-pane label="评论的" name="second">评论</el-tab-pane>
        <el-tab-pane label="收藏的" name="third">收藏</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.main1 {
  margin-top: 10px;
  width: calc(100% - 10px);
  padding-left: 10px;
}
.left1 {
  float: left;
}
.right {
  float: left;
}
.author {
  float: left;
  margin-left: 10px;
  font-size: 24px;
  line-height: 48px;
}
.editor {
  float: right;
}
</style>



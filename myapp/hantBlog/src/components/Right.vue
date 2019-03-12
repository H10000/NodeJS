<template>
  <div class="container">
    <div class="info" v-if="isDengLu">
      <div class="item">
        <el-button type="text" icon="el-icon-star-on">我的收藏</el-button>
      </div>
      <div class="item">
        <el-button type="text" icon="el-icon-question">我评论的文章</el-button>
      </div>
      <div class="item">
        <el-button type="text" icon="el-icon-document">我发表的文章</el-button>
      </div>
    </div>
    <div class="denglu" v-else>
      <div class="title">{{title}}</div>
      <div class="userName">
        <el-input placeholder="用户名"></el-input>
      </div>
      <div class="passWord">
        <el-input show-password placeholder="密码"></el-input>
      </div>
      <div class="submit">
        <el-button type="primary" @click="onSubmit" style=" width: calc(100% - 20px);">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isDengLu: Boolean
  },
  data() {
    return {
      title: "赶紧登录账号，加入我们吧！"
    };
  },
  methods: {
    onSubmit: function() {
      this.$store.commit("landorquit", { dengLu:true});
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.title {
  margin: 10px;
}
.userName {
  margin: 10px;
}
.passWord {
  margin: 10px;
}
.submit {
  margin: 10px;
}
.item {
  margin: 10px;
  text-align: left;
}
</style>

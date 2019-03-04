<template>
  <div class="container">
    <div class="info" v-if="isDengLu">
      <div>Hant</div>
      <div>2019-03-02</div>
    </div>
    <div class="denglu" v-else>
      <div class="title">{{title}}</div>
      <div class="userName">
        <el-input placeholder="用户名"></el-input>
      </div>
      <div class="passWord">
        <el-input placeholder="密码"></el-input>
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
    onSubmit: function() {}
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
</style>

<template>
  <div class="container">
    <div class="info" v-if="isDengLu">
      <div class="item">
        <el-button type="text" icon="el-icon-star-on" @click="toCollect">我的收藏</el-button>
      </div>
      <div class="item">
        <el-button type="text" icon="el-icon-question" @click="toComment">我评论的文章</el-button>
      </div>
      <div class="item">
        <el-button type="text" icon="el-icon-document" @click="toPublish">我发表的文章</el-button>
      </div>
    </div>
    <div class="denglu" v-else>
      <div class="title">{{title}}</div>
      <div class="userName">
        <el-input v-model="username" placeholder="用户名"></el-input>
      </div>
      <div class="passWord">
        <el-input v-model="userpwd" :type="inputType" placeholder="密码"></el-input>
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
      title: "赶紧登录账号，加入我们吧！",
      username: "",
      userpwd: "",
      inputType: "password"
    };
  },
  methods: {
    onSubmit: function() {
      if (this.username == "") {
        this.$message({
          message: "用户名不能为空",
          type: "error"
        });
      } else if (this.userpwd == "") {
        this.$message({
          message: "密码不能为空",
          type: "error"
        });
      } else {
        this.axios
          .get("/api/user", {
            params: { username: this.username, userpwd: this.userpwd }
          })
          .then(response => {
            console.log(response.data);
            if (response.data.flag == "0") {
              this.$message({
                message: response.data.note,
                type: "error"
              });
            } else if (response.data.flag == "1") {
              this.$message({
                message: response.data.note,
                type: "success"
              });
              this.$store.commit("landorquit", {
                dengLu: true,
                username: this.username
              });
              this.$cookies.set("username", this.username);
            } else if (response.data.flag == "2") {
              this.$message({
                message: response.data.note,
                type: "error"
              });
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {});
      }
    },
    toCollect: function() {
      this.$router.push({
        path: "/UserInfo",
        query: {
          activeName: "third"
        }
      });
    },
    toComment: function() {
      this.$router.push({
        path: "/UserInfo",
        query: {
          activeName: "second"
        }
      });
    },
    toPublish: function() {
      this.$router.push({
        path: "/UserInfo",
        query: {
          activeName: "first"
        }
      });
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

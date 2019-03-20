<template>
  <div class="container" v-if="isVisual">
    <div class="main1">
      <div class="title">Hant</div>
      <div class="left isPC">
        <div @click="backMain" class="shouye">首页</div>
        <div class="sousuo">
          <el-input v-model="txtSearch" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="xiewenzhang">
          <el-button type="primary" @click="toWrite" icon="el-icon-document">写文章</el-button>
        </div>
      </div>
      <div class="left isPhone">
        <el-dropdown style="font-size:20px;" @command="PhoneCommand" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-menu"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="toMain">首页</el-dropdown-item>
            <el-dropdown-item>搜索</el-dropdown-item>
            <el-dropdown-item command="toWrite">写文章</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right">
        <div v-if="isDengLu">
          <div class="notice">
            <img src="../assets/notice.png">
          </div>
          <div class="user">
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                <img src="../assets/user.png">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的主页</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div v-else>
          <div class="denglu">
            <el-popover placement="bottom" trigger="click">
              <div>
                <div class="denglupopover">
                  <el-input placeholder="用户名" v-model="username"></el-input>
                </div>
                <div class="denglupopover">
                  <el-input placeholder="密码" v-model="userpwd" :type="inputType"></el-input>
                </div>
                <div class="denglupopover">
                  <el-button
                    type="primary"
                    @click="onSubmit"
                    style=" width: calc(100% - 20px);margin-left:10px;"
                  >登录</el-button>
                </div>
              </div>
              <el-button type="text" slot="reference">登录</el-button>
            </el-popover>
          </div>
          <div class="zhuce">
            <el-popover placement="bottom" trigger="click">
              <div>
                <div class="denglupopover">
                  <el-input placeholder="用户名"></el-input>
                </div>
                <div class="denglupopover">
                  <el-input :type="inputType" placeholder="密码"></el-input>
                </div>
                <div class="denglupopover">
                  <el-input :type="inputType" placeholder="确认密码"></el-input>
                </div>
                <div class="denglupopover">
                  <el-button
                    type="primary"
                    @click="onRegister"
                    style=" width: calc(100% - 20px);margin-left:10px;"
                  >注册</el-button>
                </div>
              </div>
              <el-button type="text" slot="reference">注册</el-button>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var top = 0;
export default {
  name: "Top",
  props: {
    isDengLu: Boolean
  },
  data() {
    return {
      isVisual: true,
      username: "",
      userpwd: "",
      inputType: "password",
      txtSearch: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    onSubmit: function() {
      var that = this;
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
                username: that.username
              });
              this.$cookies.set("username", that.username);
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
    toWrite: function() {
      if (this.$store.state.isDengLu == false) {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      } else {
        this.$router.push({ path: "/Write" });
      }
    },
    onRegister: function() {
      this.$message("抱歉，暂未开放。");
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$store.commit("landorquit", { dengLu: false, username: "" });
        this.$cookies.del("username");
      }
    },
    PhoneCommand(command) {
      if (command == "toMain") {
        this.$router.push({ path: "/List" });
      } else if (command == "toWrite") {
        this.toWrite();
      }
    },
    handleScroll(e) {
      var h = document.documentElement.scrollTop;
      if (h > top) {
        if (h > 100) {
          this.isVisual = false;
        }
      } else {
        this.isVisual = true;
      }
      top = h;
    },
    backMain: function() {
      this.$router.push({ path: "/List" });
    }
  }
};
</script>
<style scoped>
div {
  display: inline-block;
}
.container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: white;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 99;
}
@media screen and (min-width: 990px) {
  .main1 {
    width: 990px;
    margin: 0 auto;
  }
  .isPC {
    display: block;
  }
  .isPhone {
    display: none;
  }
}
@media screen and (max-width: 990px) {
  .main1 {
    width: 100%;
    margin: 0 auto;
  }
  .isPC {
    display: none;
  }
  .isPhone {
    display: block;
  }
}
.title {
  color: #409eff;
  font-size: 28px;
  text-align: left;
  float: left;
  margin-left: 10px;
}
.right {
  color: #409eff;
  font-size: 16px;
  text-align: right;
  float: right;
}
.denglu {
  line-height: 16px;
}
.zhuce {
  margin-left: 10px;
  margin-right: 10px;
}
.shouye {
  padding: 10px;
  cursor: pointer;
  margin-left: 30px;
  font-size: 16px;
  line-height: 16px;
}
.shouye:hover {
  background-color: #f2f6fc;
}
.sousuo {
  margin-left: 30px;
}
.xiewenzhang {
  margin-left: 30px;
}
.left {
  margin-left: 30px;
  float: left;
}
.notice {
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  cursor: pointer;
}
.user {
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}
img:hover {
  background-color: #f2f6fc;
}
.denglupopover {
  width: calc(100% - 20px);
  margin: 10px;
}
</style>


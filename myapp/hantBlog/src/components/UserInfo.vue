<template>
  <div class="container">
    <div class="top">
      <el-card class="box-card">
        <div class="left1">
          <div>
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="点击上传头像" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="right1">
          <div>
            <div class="author">{{username}}</div>
            <div class="editor">
              <el-button plain @click="editInfo">编辑资料</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="main1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发表的" name="first">
          <list v-if="isAlive1" v-bind:param="param1"/>
        </el-tab-pane>
        <el-tab-pane label="评论的" name="second">
          <list v-if="isAlive2" v-bind:param="param2"/>
        </el-tab-pane>
        <el-tab-pane label="收藏的" name="third">
          <list v-if="isAlive3" v-bind:param="param3"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
const list = () =>
  import(/* webpackChunkName: "List" */ "@/components/List.vue");
export default {
  name: "UserInfo",
  components: {
    list
  },
  data() {
    return {
      username: this.$store.state.username,
      isAlive1: false,
      isAlive2: false,
      isAlive3: false,
      param1: { flag: 1, data: { id: "" } },
      param2: { flag: 2, data: { id: "" } },
      param3: { flag: 3, data: { id: "" } },
      imageUrl: "../headImg/headImg.png",
      actionUrl: "/api/upload/headImg/"
    };
  },
  created: function() {
    this.axios
      .get("/api/user/userInfo", {
        params: {
          username: this.username
        }
      })
      .then(response => {
        this.imageUrl =
          response.data.headImg == "" ? this.imageUrl : response.data.headImg;
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      })
      .finally(() => {
        // this.loading = false;
      });
  },
  computed: {
    activeName: {
      get: function() {
        this.getInfo(this.$route.query.activeName);
        return this.$route.query.activeName;
      },
      set: function(newValue) {
        this.$route.query.activeName = newValue;
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.getInfo(tab.name);
    },
    getInfo(name) {
      if (name == "first") {
        if (this.isAlive1 == false) {
          this.param1 = {
            flag: 1,
            data: { author: this.$store.state.username }
          };
          this.$nextTick(() => (this.isAlive1 = true));
        }
      } else if (name == "second") {
        if (this.isAlive2 == false) {
          this.axios
            .get("/api/index/getCommentByUser", {
              params: {
                user: this.$store.state.username
              }
            })
            .then(response => {
              var datas = response.data;
              var ids = [];
              for (var i = 0; i < datas.length; i++) {
                ids[i] = datas[i].blogID;
              }
              this.param2.data = { ids: ids };
              this.$nextTick(() => (this.isAlive2 = true));
            })
            .catch(error => {
              console.log(error);
              //this.errored = true;
            })
            .finally(() => {
              // this.loading = false;
            });
        }
      } else if (name == "third") {
        if (this.isAlive3 == false) {
          this.axios
            .get("/api/index/getCollectByUser", {
              params: {
                user: this.$store.state.username
              }
            })
            .then(response => {
              var datas = response.data;
              var ids = [];
              for (var i = 0; i < datas.length; i++) {
                ids[i] = datas[i].blogID;
              }
              this.param3.data = { ids: ids };
              this.$nextTick(() => (this.isAlive3 = true));
            })
            .catch(error => {
              console.log(error);
              //this.errored = true;
            })
            .finally(() => {
              // this.loading = false;
            });
        }
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.location;
      this.axios
        .post("/api/user/updateUser", {
          flag: { username: this.username },
          data: { headImg: this.imageUrl }
        })
        .then(response => {
          this.$message({
            message: response.data.note,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
          //this.errored = true;
        })
        .finally(() => {
          // this.loading = false;
        });
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    editInfo(){
      this.$message({
        message:"暂未开放，敬请期待！",
        type:"warning"
      });
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>



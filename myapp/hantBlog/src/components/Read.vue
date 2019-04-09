<template>
  <div class="read">
    <div class="title">{{title}}</div>
    <div style="text-align:center">
      <div class="author">{{author}}</div>
      <div class="pubishDate">{{new Date(publishdate).Format("yyyy-MM-dd HH:mm:ss")}}</div>
    </div>
    <div class="content" v-html="content"></div>
    <div class="actioninfo">
      <div class="pinlun" :class="{'el-button--primary':isCommentcomputed}">
        <a>{{CommentCountcomputed}}评论</a>
      </div>
      <div class="action">
        <el-button
          size="mini"
          :class="{'el-button--primary':isLikecomputed}"
          @click="like"
        >{{LikeCountcomputed}}赞</el-button>
      </div>
      <div class="action">
        <el-button
          size="mini"
          :class="{'el-button--primary':isunLikecomputed}"
          @click="unLike"
        >{{unLikeCountcomputed}}不赞</el-button>
      </div>
      <div class="action">
        <el-button
          size="mini"
          :class="{'el-button--primary':isCollectcomputed}"
          @click="Collect"
        >{{CollectCountcomputed}}收藏</el-button>
      </div>
    </div>
    <div>
      <tinymce ref="mychild" :menubar="menubar" :height="height" :toolbar="toolbar" :id="id"/>
    </div>
    <div style="text-align: center;margin:10px;">
      <el-button type="primary" @click="submitClick">提交</el-button>
    </div>
    <div style="margin-bottom::20px;margin-top:20px;">
      <commentList v-if="isAlive" :id="id" :candel="candel"/>
    </div>
  </div>
</template>
<script>
import commentList from "@/components/commentList.vue";
const Tinymce = () =>
  import(/* webpackChunkName: "Tinymce" */ "@/plugins/Tinymce/index.vue");
export default {
  name: "Read",
  components: {
    commentList,
    Tinymce
  },
  data() {
    return {
      id: this.$route.query.id,
      height: 200,
      candel: this.$route.query.candel,
      menubar: "",
      toolbar: [
        "fontsizeselect bold",
        "italic underline alignleft aligncenter alignright",
        "code codesample hr link image media emoticons forecolor backcolor"
      ],
      title: "",
      content: "",
      author: "",
      publishdate: "",
      isAlive: true,
      detailInfo: {},
      LikeCount: 0,
      unLikeCount: 0,
      CollectCount: 0,
      isLike: false,
      isunLike: false,
      isCollect: false,
      CommentCount: 0,
      isComment: false
    };
  },
  methods: {
    reload() {
      this.isAlive = false;
      this.$nextTick(() => (this.isAlive = true));
    },
    onEditorFocus() {
      var username = this.$store.state.username;
      if (username == "") {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      }
    }, // 获得焦点事件
    submitClick() {
      var username = this.$store.state.username;
      if (username != "") {
        var content = this.$refs.mychild.getContent();
        console.log(content);
        if (content != "") {
          var newItem = {
            flag: 1,
            data: {
              blogID: this.id,
              user: username,
              content: content,
              date: new Date()
            }
          };
          this.axios
            .post("/api/index/postComment", newItem)
            .then(response => {
              if (response.data != null) {
                this.$message({
                  message: "评论成功",
                  duration: 1000,
                  type: "success"
                });
                this.$refs.mychild.setContent("");
                this.reload();
              }
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {});
        } else {
          this.$message({
            message: "评论内容不能为空",
            duration: 1000,
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      }
    },
    like: function() {
      var username = this.$store.state.username;
      if (username != "") {
        this.axios
          .post("/api/index/postLike", {
            flag: this.isLike ? 0 : 1,
            data: { blogID: this.id, user: username, date: new Date() }
          })
          .then(response => {
            if (response.data != null) {
              this.LikeCount = this.isLike
                ? this.LikeCount - 1
                : this.LikeCount + 1;
              this.isLike = this.isLike ? false : true;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {});
      } else {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      }
    },
    unLike: function() {
      var username = this.$store.state.username;
      if (username != "") {
        this.axios
          .post("/api/index/postunLike", {
            flag: this.isunLike ? 0 : 1,
            data: { blogID: this.id, user: username, date: new Date() }
          })
          .then(response => {
            if (response.data != null) {
              this.unLikeCount = this.isunLike
                ? this.unLikeCount - 1
                : this.unLikeCount + 1;
              this.isunLike = this.isunLike ? false : true;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {});
      } else {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      }
    },
    Collect: function() {
      var username = this.$store.state.username;
      if (username != "") {
        this.axios
          .post("/api/index/postCollect", {
            flag: this.isCollect ? 0 : 1,
            data: { blogID: this.id, user: username, date: new Date() }
          })
          .then(response => {
            if (response.data != null) {
              this.CollectCount = this.isCollect
                ? this.CollectCount - 1
                : this.CollectCount + 1;
              this.isCollect = this.isCollect ? false : true;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {});
      } else {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      }
    }
  },
  created: function() {
    this.axios
      .get("/api/index/Content", { params: { id: this.id } })
      .then(response => {
        this.id = response.data._id;
        this.title = response.data.title;
        this.content = response.data.content;
        this.author = response.data.author;
        this.publishdate = response.data.publishdate;
        this.LikeCount = response.data.likeCount;
        this.unLikeCount = response.data.unlikeCount;
        this.CollectCount = response.data.collectCount;
        this.CommentCount = response.data.commentCount;
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      })
      .finally(() => {
        // this.loading = false;
      });
  },
  mounted: function() {
    setTimeout(() => {
      Prism.highlightAll();
    }, 2000);

    //
    var username = this.$store.state.username;
    if (username != "") {
      this.axios
        .get("/api/index/getCollectByIDAndUser", {
          params: { blogID: this.id, user: username }
        })
        .then(response => {
          if (response.data != null && response.data != "") {
            this.isCollect = true;
          }
        })
        .catch(error => {
          console.log(error);
          //this.errored = true;
        })
        .finally(() => {
          // this.loading = false;
        });
      this.axios
        .get("/api/index/getLikeByIDAndUser", {
          params: { blogID: this.id, user: username }
        })
        .then(response => {
          if (response.data != null && response.data != "") {
            this.isLike = true;
          }
        })
        .catch(error => {
          console.log(error);
          //this.errored = true;
        })
        .finally(() => {
          // this.loading = false;
        });
      this.axios
        .get("/api/index/getunLikeByIDAndUser", {
          params: { blogID: this.id, user: username }
        })
        .then(response => {
          if (response.data != null && response.data != "") {
            this.isunLike = true;
          }
        })
        .catch(error => {
          console.log(error);
          //this.errored = true;
        })
        .finally(() => {
          // this.loading = false;
        });
    }
  },
  computed: {
    isLikecomputed() {
      return this.isLike;
    },
    isunLikecomputed() {
      return this.isunLike;
    },
    isCollectcomputed() {
      return this.isCollect;
    },
    LikeCountcomputed() {
      return this.LikeCount;
    },
    unLikeCountcomputed() {
      return this.unLikeCount;
    },
    CollectCountcomputed() {
      return this.CollectCount;
    },
    CommentCountcomputed() {
      return this.CommentCount;
    },
    isCommentcomputed() {
      return this.isComment;
    }
  }
};
</script>
<style scoped>
.read {
  text-align: left;
  /* height: calc(100vh - 80px); */
}
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
.content {
  padding: 10px;
  line-height: 2.27rem;
}
.author {
  display: inline-block;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
  padding: 7px;
}
.author:hover {
  background-color: #f2f6fc;
}
.pubishDate {
  margin-left: 10px;
  display: inline-block;
  font-size: 12px;
  color: #909399;
}
.actioninfo {
  padding: 7px;
  background-color: #f2f6fc;
}
.action {
  display: inline;
  margin-left: 10px;
}
.pinlun {
  display: inline;
  margin-left: 10px;
  font-size: 12px;
  cursor: pointer;
  padding: 7px 12px 7px 12px;
}
.pinlun:hover {
  background-color: white;
  border-radius: 5px;
}
</style>


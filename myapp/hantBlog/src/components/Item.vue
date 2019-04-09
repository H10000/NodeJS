<template>
  <div v-show="!isDel" @mouseover="showDelClick" @mouseout="hideDelClick" style="text-align: left;">
    <div class="container">
      <div class="top">
        <div class="group">{{item.group}}</div>
        <div class="author">{{item.author}}</div>
        <div class="publishdate">{{new Date(item.publishdate).Format("yyyy-MM-dd HH:mm:ss") }}</div>
        <div class="showDel" v-show="showDel">
          <el-button size="small" icon="el-icon-edit" circle @click="editComment"></el-button>
          <el-button size="small" icon="el-icon-delete" circle @click="delComment"></el-button>
        </div>
      </div>
      <div @click="enterClick" class="title">{{item.title}}</div>
      <div class="bottom">
        <div class="zan">
          <el-button
            size="mini"
            :class="{'el-button--primary':isLikecomputed}"
            @click="like"
          >{{LikeCountcomputed}}赞</el-button>
        </div>
        <div class="nozan">
          <el-button
            size="mini"
            :class="{'el-button--primary':isunLikecomputed}"
            @click="unLike"
          >{{unLikeCountcomputed}}不赞</el-button>
        </div>
        <div class="pinlun" :class="{'el-button--primary':isCommentcomputed}" @click="comment">
          <a>{{CommentCountcomputed}}评论</a>
        </div>
      </div>
    </div>
    <el-dialog title="删除" :visible.sync="dialogVisible" width="350px">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delInfoMethod">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: {
    item: Object,
    candel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDel: false,
      showDel: false,
      dialogVisible: false,
      isComment: false,
      isLike: false,
      isunLike: false,
      CommentCount: this.item.commentCount,
      LikeCount: this.item.likeCount,
      unLikeCount: this.item.unlikeCount,
    };
  },
  mounted: function() {
    var username = this.$store.state.username;
    if (username != "") {
      this.axios
        .get("/api/index/getCommentByIDAndUser", {
          params: { blogID: this.item._id, user: username }
        })
        .then(response => {
          if (response.data != null) {
            //this.isComment = true;
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
          params: { blogID: this.item._id, user: username }
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
          params: { blogID: this.item._id, user: username }
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
    if (this.$store.state.IsPC == false) {
      if (this.candel) {
        this.showDel = true;
      }
    }
  },
  computed: {
    isCommentcomputed() {
      return this.isComment;
    },
    isLikecomputed() {
      return this.isLike;
    },
    isunLikecomputed() {
      return this.isunLike;
    },
    CommentCountcomputed() {
      return this.CommentCount;
    },
    LikeCountcomputed() {
      return this.LikeCount;
    },
    unLikeCountcomputed() {
      return this.unLikeCount;
    }
  },
  methods: {
    enterClick: function() {
      this.$router.push({
        path: "/Read",
        query: {
          id: this.item._id,
          candel: this.candel
        }
      });
    },
    like: function() {
      var username = this.$store.state.username;
      if (username != "") {
        this.axios
          .post("/api/index/postLike", {
            flag: this.isLike ? 0 : 1,
            data: { blogID: this.item._id, user: username, date: new Date() },
            count: this.LikeCount
          })
          .then(response => {
            if (response.data != null) {
                this.LikeCount = this.isLike ? this.LikeCount - 1 : this.LikeCount + 1;
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
            data: { blogID: this.item._id, user: username, date: new Date() },
            count: this.unLikeCount
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
    comment: function() {},
    showDelClick: function() {
      if (this.candel) {
        this.showDel = true;
      }
    },
    hideDelClick: function() {
      this.showDel = false;
    },
    editComment: function() {
      this.$router.push({ path: "Edit", query: { id: this.item._id } });
    },
    delComment: function() {
      this.dialogVisible = true;
    },
    delInfoMethod: function() {
      this.axios
        .get("/api/index/del", {
          params: { id: this.item._id }
        })
        .then(response => {
          if (response.data != null) {
            if (response.data.flag == "1") {
              this.isDel = true;
              this.$message({
                message: "删除成功",
                duration: 1000,
                type: "success"
              });
              this.dialogVisible = false;
            } else {
              this.$message({
                message: "删除失败",
                duration: 1000,
                type: "success"
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    }
  }
};
</script>
<style scoped>
.container {
  width: calc(100% - 20px);
  border-bottom: 1px solid #f4f5f5;

  margin-left: 10px;
}
.top {
  text-align: left;
  margin-top: 10px;
  font-size: 12px;
  color: #409eff;
}
.group {
  display: inline;
  margin-left: 10px;
  cursor: pointer;
  padding: 7px 0px;
}
.group:hover {
  background-color: #f2f6fc;
}
.author {
  display: inline;
  margin-left: 10px;
  cursor: pointer;
  padding: 7px 0px;
}
.author:hover {
  background-color: #f2f6fc;
}
.publishdate {
  display: inline;
  margin-left: 10px;
  color: #909399;
}

.title {
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  padding: 7px 0px;
}
/* .title:hover {
  background-color: #f2f6fc;
} */
.bottom {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}
.zan {
  display: inline;
  margin-left: 10px;
}
.nozan {
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
  background-color: #f2f6fc;
  border-radius: 5px;
}
.showDel {
  float: right;
}
</style>

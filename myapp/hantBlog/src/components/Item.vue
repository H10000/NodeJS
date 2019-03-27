<template>
  <div class="container">
    <div class="top">
      <div class="group">{{item.group}}</div>
      <div class="author">{{item.author}}</div>
      <div class="publishdate">{{new Date(item.publishdate).Format("yyyy-MM-dd HH:mm:ss") }}</div>
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
</template>
<script>
export default {
  name: "Item",
  props: {
    item: Object
  },
  data() {
    return {
      isComment: false,
      isLike: false,
      isunLike: false,
      CommentCount: this.item.commentCount,
      LikeCount: this.item.likeCount,
      unLikeCount: this.item.unlikeCount
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
          id: this.item._id
        }
      });
    },
    like: function() {
      var username = this.$store.state.username;
      if (username != "") {
        this.LikeCount = this.isLike ? this.LikeCount - 1 : this.LikeCount + 1;
        this.axios
          .post("/api/index/postLike", {
            flag: this.isLike ? 0 : 1,
            data: { blogID: this.item._id, user: username, date: new Date() },
            count: this.LikeCount
          })
          .then(response => {
            if (response.data != null) {
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
        this.unLikeCount = this.isunLike
          ? this.unLikeCount - 1
          : this.unLikeCount + 1;
        this.axios
          .post("/api/index/postunLike", {
            flag: this.isunLike ? 0 : 1,
            data: { blogID: this.item._id, user: username, date: new Date() },
            count: this.unLikeCount
          })
          .then(response => {
            if (response.data != null) {
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
    comment: function() {}
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
.title:hover {
  background-color: #f2f6fc;
}
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
</style>

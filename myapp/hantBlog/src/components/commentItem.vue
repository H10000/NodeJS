<template>
  <div v-show="!isDel" @mouseover="showDelClick" @mouseout="hideDelClick">
    <div class="container">
      <div class="top">
        <div class="group">
          <img src="../assets/user.png">
        </div>
        <div class="author">{{item.user}}</div>
        <div class="publishdate">{{new Date(item.date).Format("yyyy-MM-dd HH:mm:ss")}}</div>
        <div class="showDel" v-show="showDel">
          <el-button size="small" icon="el-icon-delete" circle @click="delComment"></el-button>
        </div>
      </div>
      <div class="title" v-html="item.content"></div>
    </div>
    <el-dialog title="删除" :visible.sync="dialogVisible" width="350px" >
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delCommentMethod">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "commentItem",
  data() {
    return {
      showDel: false,
      isDel: false,
      dialogVisible: false,
    };
  },
  props: {
    item: {
      type: Object,
      default: []
    }
  },
  methods: {
    showDelClick: function() {
      this.showDel = true;
    },
    hideDelClick: function() {
      this.showDel = false;
    },
    delComment: function() {
      this.dialogVisible = true;
    },
    delCommentMethod: function() {
      this.axios
        .post("/api/index/postComment", {
          flag: 0,
          data: { id: this.item._id, blogID: this.item.blogID },
          count: ""
        })
        .then(response => {
          if (response.data != null) {
            this.isDel = true;
            this.$message({
              message: "删除成功",
              duration: 1000,
              type: "success"
            });
            this.dialogVisible = false;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    }
  },
  mounted: function() {
    if (this.$store.state.IsPC == false) {
      this.showDel = true;
    }
     setTimeout(() => {
      Prism.highlightAll();
    }, 2000);
  }
};
</script>
<style scoped>
.container {
  width: calc(100% - 20px);
  border-top: 1px solid #f4f5f5;
  margin-left: 10px;
}
.top {
  text-align: left;
  margin-top: 10px;
  font-size: 12px;
  color: #409eff;
}
.group {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
.group:hover {
  background-color: #f2f6fc;
}
.author {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  padding: 7px 0px;
}
.author:hover {
  background-color: #f2f6fc;
}
.publishdate {
  display: inline-block;
  margin-left: 10px;
  color: #909399;
}
.showDel {
  float: right;
}
.title {
  text-align: left;
  font-size: 13px;
  line-height: 1.87rem;
}
.bottom {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>



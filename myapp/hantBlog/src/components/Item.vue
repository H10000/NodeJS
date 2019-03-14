<template>
  <div class="container">
    <div class="top">
      <div class="group">{{item.group}}</div>
      <div class="author">{{item.author}}</div>
      <div class="publishdate">{{item.publishdate}}</div>
    </div>
    <div @click="enterClick" class="title">{{item.title}}</div>
    <div class="bottom">
      <div class="zan">
        <el-button size="mini" type="primary">242赞</el-button>
      </div>
      <div class="nozan">
        <el-button size="mini">22不赞</el-button>
      </div>
      <div class="pinlun">
        <a>125评论</a>
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
  methods:{
    enterClick:function(){
      this.$router.push({
          path: "/Read",
          query: {
            id: this.item._id
          }
        });
    }
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
  padding: 7px 0px;
}
.pinlun:hover {
  background-color: #f2f6fc;
}
</style>

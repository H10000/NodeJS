<template>
  <div>
    <div v-for="item in list" :key="item.index">
      <div class="container">
        <div class="top">
          <div class="group">11</div>
          <div class="author">item.user</div>
          <div class="publishdate">item.date</div>
        </div>
        <div class="title">111</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: []
    };
  },
  mounted: function() {
    this.axios
      .get("/api/index/getCommentByID", {
        params: { blogID: this.id }
      })
      .then(response => {
        if (response.data != null) {
          this.list = response.data;
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
</style>


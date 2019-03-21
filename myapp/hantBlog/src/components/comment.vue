<template>
  <div class="container">
    <div class="top">
      <div class="group">44</div>
      <div class="author">33</div>
      <div class="publishdate">222</div>
    </div>
    <div class="title">111</div>
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


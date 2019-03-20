<template>
  <div class="read">
    <div class="title">{{title}}</div>
    <div class="content" v-html="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  mounted: function() {
    var id = this.$route.query.id;
    this.axios
      .get("/api/index/Content", { params: { id: id } })
      .then(response => {
        this.title = response.data.title;
        this.content = response.data.content;
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
.read {
  text-align: left;
   /* height: calc(100vh - 80px); */
}
.title{
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 10px;
}
.content{
  padding: 10px;
}
</style>


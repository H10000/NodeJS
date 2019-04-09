<template>
  <div>
    <div class="top">
      <div class="back">
        <el-switch v-model="isPublic" active-text="公开"></el-switch>
      </div>
      <div class="fabu">
        <el-button type="primary" @click="Public">发布</el-button>
      </div>
    </div>
    <div>
      <el-input placeholder="请输入标题" v-model="title" clearable></el-input>
    </div>
    <div>
      <tinymce ref="mychild" :value="content" :id="id"/>
    </div>
  </div>
</template>
<script>
const Tinymce = () =>
  import(/* webpackChunkName: "Tinymce" */ "@/plugins/Tinymce/index.vue");
export default {
  name: "Edit",
  components: { Tinymce },
  data() {
    return {
      id: "vue-tinymce-" + +new Date(),
      content: "",
      title: "",
      isPublic: true
    };
  },
  methods: {
    Public: function() {
      this.axios
        .post("/api/index/publish", {
          author: this.$store.state.username,
          publishdate: new Date(),
          group: "生活",
          title: this.title,
          content: this.$refs.mychild.getContent(),
          isPublic: this.isPublic
        })
        .then(
          function(response) {
            // var data = this.$store.state.list;
            // data.push({
            //   author: this.$store.state.username,
            //   publishdate: new Date(),
            //   group: "生活",
            //   title: this.title
            // });
            //this.$store.commit("updateList", { listData: data });
            this.$router.push({ path: "/" });
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.axios
      .get("/api/index/Content", { params: { id: this.$route.query.id } })
      .then(response => {
        this.id = response.data._id;
        this.title = response.data.title;
        this.$refs.mychild.setContent(response.data.content);
        this.isPublic = response.data.isPublic;
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
.top {
  background-color: white;
  height: 50px;
}
.fabu {
  margin-right: 10px;
  line-height: 50px;
  float: right;
}
.back {
  margin-left: 10px;
  line-height: 50px;
  float: left;
}
</style>

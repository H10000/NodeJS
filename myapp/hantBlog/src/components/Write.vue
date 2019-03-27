<template>
  <div>
    <div class="top">
      <div class="back">
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
import Tinymce from "@/plugins/Tinymce";
export default {
  name: "Write",
  components: { Tinymce },
  data() {
    return {
      id: "vue-tinymce-" + +new Date(),
      content: "",
      title: ""
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
          content: this.$refs.mychild.getContent()
        })
        .then(
          function(response) {
            var data = this.$store.state.list;
            data.push({
              author: this.$store.state.username,
              publishdate: new Date(),
              group: "生活",
              title: this.title
            });
            this.$store.commit("updateList", { listData: data });
            this.$router.push({ name: "Main" });
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {}
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

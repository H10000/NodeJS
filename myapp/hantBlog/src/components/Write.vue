<template>
  <div>
    <div class="top">
      <div class="back">
        <router-link to="/" tag="div">
          <el-button type="text">返回</el-button>
        </router-link>
      </div>
      <div class="fabu">
        <el-button type="primary" @click="Public">发布</el-button>
      </div>
    </div>
    <div>
      <tinymce v-model="content"/>
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
      content: ""
    };
  },
  methods: {
    Public: function() {
      this.axios
        .post("/api/index/publish", {
          author: "Hant",
          publishdate: new Date(),
          group: "生活",
          title: "今天是个好日子"
        })
        .then(function(response) {
          console.log(response);
        })
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

<template>
  <div class="read">
    <div class="title">{{title}}</div>
    <div style="text-align:center">
      <div class="author">{{author}}</div>
      <div class="pubishDate">{{publishDate}}</div>
    </div>
    <div class="content" v-html="content"></div>
    <div class="pinlun">评论</div>
    <div>
      <quill-editor
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
    <div style="text-align: center;margin:10px;">
      <el-button type="primary" @click="submitClick">提交</el-button>
    </div>
    <div style="margin-bottom::20px;margin-top:20px;">
      <comment :id="id"/>
    </div>
  </div>
</template>
<script>
import comment from "@/components/comment.vue";
export default {
  name: "Read",
  components: {
    comment
  },
  data() {
    return {
      id: this.$route.query.id,
      title: "",
      content: "",
      author: "",
      publishDate: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"]
          ]
        }
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    submitClick() {
      var username = this.$store.state.username;
      if (username != "") {
        this.axios
          .post("/api/index/postComment", {
            flag: 1,
            data: {
              blogID: this.id,
              user: username,
              content: "11"
            }
          })
          .then(response => {
            if (response.data != null) {
              console.log(response.data);
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
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted: function() {
    this.axios
      .get("/api/index/Content", { params: { id: this.id } })
      .then(response => {
        this.id = response.data._id;
        this.title = response.data.title;
        this.content = response.data.content;
        this.author = response.data.author;
        this.publishDate = response.data.publishdate;
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
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
.content {
  padding: 10px;
  line-height: 2.27rem;
}
.author {
  display: inline-block;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
  padding: 7px;
}
.author:hover {
  background-color: #f2f6fc;
}
.pubishDate {
  margin-left: 10px;
  display: inline-block;
  font-size: 12px;
  color: #909399;
}
.pinlun {
  font-size: 14px;
  padding: 7px;
  background-color: #f2f6fc;
}
</style>


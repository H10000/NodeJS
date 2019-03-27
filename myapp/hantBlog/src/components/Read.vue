<template>
  <div class="read">
    <div class="title">{{title}}</div>
    <div style="text-align:center">
      <div class="author">{{author}}</div>
      <div class="pubishDate">{{new Date(publishdate).Format("yyyy-MM-dd HH:mm:ss")}}</div>
    </div>
    <div class="content" v-html="content"></div>
    <div class="pinlun">评论</div>
    <div>
      <quill-editor
        ref="myQuillEditor"
        v-model="editorContent"
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
      <commentList v-if="isAlive" :id="id"/>
    </div>
  </div>
</template>
<script>
import commentList from "@/components/commentList.vue";
export default {
  name: "Read",
  components: {
    commentList
  },
  data() {
    return {
      id: this.$route.query.id,
      title: "",
      content: "",
      author: "",
      publishdate: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"]
          ]
        }
      },
      editorContent: "",
      isAlive: true
    };
  },
  methods: {
      reload() {
      this.isAlive = false;
      this.$nextTick(() => (this.isAlive = true));
    }
    ,
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {
      var username = this.$store.state.username;
      if (username == "") {
        this.$message({
          message: "请先登录下吧",
          duration: 1000,
          type: "warning"
        });
      }
    }, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    submitClick() {
      var username = this.$store.state.username;
      if (username != "") {
        var content = this.editor.container.firstChild;
        if (content.innerHTML != "<p><br></p>") {
          var newItem = {
            flag: 1,
            data: {
              blogID: this.id,
              user: username,
              content: content.innerHTML,
              date: new Date()
            }
          };
          this.axios
            .post("/api/index/postComment", newItem)
            .then(response => {
              if (response.data != null) {
                this.$message({
                  message: "评论成功",
                  duration: 1000,
                  type: "success"
                });
                this.editorContent = "";
                this.reload();
              }
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {});
        } else {
          this.$message({
            message: "评论内容不能为空",
            duration: 1000,
            type: "warning"
          });
        }
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
        this.publishdate = response.data.publishdate;
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


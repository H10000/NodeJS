<template>
  <div class="edit_container">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <button v-on:click="saveHtml">保存</button>
  </div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      content: `<p>hello world</p>`,
      editorOption: {
        modules: {
          toolbar: [
            [{ header: 1 }, { header: 2 }],
            ["bold", "italic", "underline", "strike", "link"], // toggled buttons
            [{ font: [] }, { size: [] }, { color: [] }, { background: [] }],
            [{ align: "" }, { align: "center" }, { align: "right" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image", "clean"]
          ]
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    }
  }
};
</script >

<style scoped>
.edit_container {
  text-align: left;
}
</style>
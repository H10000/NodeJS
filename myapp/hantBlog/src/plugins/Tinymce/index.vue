<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
  </div>
</template>

<script>
import plugins from "./plugins";
import toolbar from "./toolbar";

export default {
  name: "Tinymce",
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default: "vue-tinymce-" + +new Date()
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: "file edit insert view format table"
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN"
      }
    };
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language];
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    },
    language() {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    }
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        language_url: "./tinymce/langs/zh_CN.js",
        language: "zh_CN",
        selector: `#${this.tinymceId}`,
        theme: "silver",
        menubar: this.menubar,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        plugins: plugins,
        fontsize_formats: "11px 12px 14px 16px 18px 24px 36px 48px", //字体大小
        font_formats:
          "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n", //字体
        contextmenu: "link image imagetools table spellchecker copy",
        mobile: {
          theme: "silver",
          plugins: ["autosave", "lists", "autolink"],
          toolbar: ["bold", "italic underline alignleft aligncenter alignright"]
        },
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", e => {
            _this.fullscreen = e.state;
          });
        },
        branding: false, //下标Powered by Tiny
        file_picker_callback: function(callback, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.onchange = function() {
            var file = this.files[0];
            var form = new FormData();
            form.append("files", file);
            $.ajax({
              url: "api/upload/image",
              type: "post",
              data: form,
              processData: false,
              contentType: false,
              success: function(data) {
                callback(data.location);
              },
              error: function(e) {
                alert("图片上传失败");
              }
            });
          };
          input.click();
        },
        images_upload_handler: function(blobInfo, success, failure) {
          var form = new FormData();
          form.append("files", blobInfo.blob(), blobInfo.filename());
          $.ajax({
            url: "api/upload/image",
            type: "post",
            data: form,
            processData: false,
            contentType: false,
            success: function(data) {
              success(data.location);
            },
            error: function(e) {
              alert("图片上传失败");
            }
          });
        },
      });
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      return window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      const _this = this;
      arr.forEach(v => {
        window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`);
      });
    }
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

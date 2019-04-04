<template>
  <div class="container">
    <div class="top">
      <el-card class="box-card">
        <div class="left1">
          <div>
            <img src="../assets/headImg.png">
          </div>
        </div>
        <div class="right1">
          <div>
            <div class="author">Hant</div>
            <div class="editor">
              <el-button plain>编辑资料</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="main1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发表的" name="first">
          <list v-if="isAlive1" v-bind:param="param1"/>
        </el-tab-pane>
        <el-tab-pane label="评论的" name="second">
          <list v-if="isAlive2" v-bind:param="param2"/>
        </el-tab-pane>
        <el-tab-pane label="收藏的" name="third">
          <list v-if="isAlive3" v-bind:param="param3"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
const list = () =>
  import(/* webpackChunkName: "List" */ "@/components/List.vue");
export default {
  name: "UserInfo",
  components: {
    list
  },
  data() {
    return {
      isAlive1: false,
      isAlive2: false,
      isAlive3: false,
      param1: { flag: 1, data: { id: "" } },
      param2: { flag: 2, data: { id: "" } },
      param3: { flag: 3, data: { id: "" } }
    };
  },
  created: function() {},
  computed: {
    activeName: {
      get: function() {
        this.getInfo(this.$route.query.activeName);
        return this.$route.query.activeName;
      },
      set: function(newValue) {
        this.$route.query.activeName = newValue;
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.getInfo(tab.name);
    },
    getInfo(name) {
      if (name == "first") {
        if (this.isAlive1 == false) {
          this.param1 = {
            flag: 1,
            data: { author: this.$store.state.username }
          };
          this.$nextTick(() => (this.isAlive1 = true));
        }
      } else if (name == "second") {
        if (this.isAlive2 == false) {
          this.axios
            .get("/api/index/getCommentByUser", {
              params: {
                user: this.$store.state.username
              }
            })
            .then(response => {
              var datas = response.data;
              var ids = [];
              for (var i = 0; i < datas.length; i++) {
                ids[i] = datas[i].blogID;
              }
              this.param2.data = { ids: ids };
              this.$nextTick(() => (this.isAlive2 = true));
            })
            .catch(error => {
              console.log(error);
              //this.errored = true;
            })
            .finally(() => {
              // this.loading = false;
            });
        }
      } else if (name == "third") {
        if (this.isAlive3 == false) {
           this.param3 = {
            flag: 3,
            data: { author: this.$store.state.username }
          };
          this.$nextTick(() => (this.isAlive3 = true));
        }
      }
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.main1 {
  margin-top: 10px;
  width: calc(100% - 10px);
  padding-left: 10px;
}
.left1 {
  float: left;
}
.right {
  float: left;
}
.author {
  float: left;
  margin-left: 10px;
  font-size: 24px;
  line-height: 48px;
}
.editor {
  float: right;
}
</style>



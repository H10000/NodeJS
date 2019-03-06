<template>
  <div id="app">
    <Top v-bind:isDengLu="isDengLu"/>
    <div class="main" v-if="isWrite==false">
      <div class="mainleft">
        <List v-bind:list="list"/>
      </div>
      <div class="mainright">
        <Right v-bind:isDengLu="isDengLu"/>
      </div>
    </div>
    <div class="main" style="background-color: white;" v-else>
      <Editor/>
      <TinymceEditor :content="content"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Top from "@/components/Top.vue";
import List from "@/components/List.vue";
import Right from "@/components/Right.vue";
import Editor from "@/components/Editor.vue";
import TinymceEditor from "@/components/TinymceEditor.vue";
export default {
  name: "app",
  components: {
    Top,
    HelloWorld,
    List,
    Right,
    Editor,
    TinymceEditor
  },
  data() {
    return {
      content: "测试",
      list: []
    };
  },
  mounted: function() {
    this.axios
      .get("/api/index")
      .then(response => {
        console.log(response);
        this.list = response.data.list;
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      })
      .finally(() => {
        // this.loading = false;
      });
  },
  computed: {
    isDengLu() {
      return this.$store.state.isDengLu;
    },
    isWrite() {
      return this.$store.state.isWrite;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  /* margin-top: 60px; */
}
body {
  background-color: #f4f5f5;
  text-align: center;
}

@media screen and (min-width: 990px) {
  .main {
    width: 990px;
    margin: 60px auto;
  }
  .mainleft {
    background-color: white;
    width: calc(100% - 260px);
    float: left;
  }
  .mainright {
    background-color: white;
    width: 250px;
    margin-left: 10px;
    float: left;
  }
}
@media screen and (max-width: 990px) {
  .main {
    width: 100%;
    margin: 60px auto;
  }
  .mainleft {
    background-color: white;
    width: 100%;
  }
  .mainright {
    display: none;
  }
}
</style>

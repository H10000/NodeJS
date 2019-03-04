<template>
  <div id="app">
    <Top v-bind:isDengLu="isDengLu"/>
    <div class="main">
      <div class="mainleft">
        <List v-bind:list="list"/>
      </div>
      <div class="mainright">
        <Right v-bind:isDengLu="isDengLu"/>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Top from "@/components/Top.vue";
import List from "@/components/List.vue";
import Right from "@/components/Right.vue";
export default {
  name: "app",
  components: {
    Top,
    HelloWorld,
    List,
    Right
  },
  data() {
    return {
      isDengLu: false,
      list: [
        {
          author: "Hant",
          group: "Blog",
          title: "你发生过的最尴尬的事是什么？",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "你发生过的最尴尬的事是什么？",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "你发生过的最尴尬的事是什么？",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "你发生过的最尴尬的事是什么？",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "你发生过的最尴尬的事是什么？",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        },
        {
          author: "Hant",
          group: "Blog",
          title: "文章标题",
          publishdate: "2019-03-01 19:30:00"
        }
      ]
    };
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

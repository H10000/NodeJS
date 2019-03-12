<template>
  <div>
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
import Top from "@/components/Top.vue";
import List from "@/components/List.vue";
import Right from "@/components/Right.vue";
export default {
  name: "app",
  components: {
    Top,
    List,
    Right
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
          console.log(response.data);
        this.list = response.data;
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
  }
};
</script>

<style scoped>
@media screen and (min-width: 990px) {
  .main {
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

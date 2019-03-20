<template>
  <div>
    <Top v-bind:isDengLu="isDengLu"/>
    <div class="main">
      <div class="mainleft">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
      <div class="mainright">
        <Right v-bind:isDengLu="isDengLu"/>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Right from "@/components/Right.vue";
export default {
  name: "app",
  components: {
    Top,
    Right
  },
  data() {
    return {
       isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  created: function() {
    this.$router.push({
      path: "/List"
    });
    var username = this.$cookies.get("username");
    if (username != null) {
      this.$store.commit("landorquit", {
        dengLu: true,
        username: username
      });
    }
  },
  computed: {
    isDengLu() {
        this.reload();
      console.log("2121");
      return this.$store.state.isDengLu;
    }
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
    margin-right: 0px;
    float: right;
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

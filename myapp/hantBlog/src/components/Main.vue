<template>
  <div>
    <keep-alive>
      <Top v-bind:isDengLu="isDengLu"/>
    </keep-alive>
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
import IsPC from "../common/common.js";
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
    var username = this.$cookies.get("username");
    if (username != null) {
      this.$store.commit("landorquit", {
        dengLu: true,
        username: username
      });
    } else {
      this.$router.push({ path: "/" });
    }
    this.$store.commit("IsPCState", { IsPC: IsPC.IsPC() });
  },
  computed: {
    isDengLu() {
      this.reload();
      return this.$store.state.isDengLu;
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 990px) {
  .main {
    margin: 60px auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #606266;
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
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #606266;
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

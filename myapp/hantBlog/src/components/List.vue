<template>
  <div class="list">
    <div v-for="item in list" :key="item.index">
      <Item v-bind:item="item" :candel="param.flag=='1'?true:false"/>
    </div>
  </div>
</template>
<script>
import Item from "@/components/Item.vue";
export default {
  name: "List",
  components: {
    Item
  },
  data() {
    return {
      list: []
    };
  },
  props: {
    param: {
      default: {}
    }
  },
  mounted: function() {
    this.axios
      .get("/api/index", {
        params: this.param
      })
      .then(response => {
        this.list = response.data;
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
.list {
  height: 100%;
}
</style>


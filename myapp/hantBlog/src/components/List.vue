<template>
  <div>
    <div v-for="item in list" :key="item.index">
      <Item v-bind:item="item"/>
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
    return { };
  },
  mounted: function() {
    this.axios
      .get("/api/index")
      .then(response => {
        this.$store.commit("updateList", { listData: response.data });
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      })
      .finally(() => {
        // this.loading = false;
      });
  },
  computed:{
    list(){
      return this.$store.state.list
    }
  }
};
</script>
<style scoped>
</style>


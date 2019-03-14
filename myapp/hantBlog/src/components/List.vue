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
  props: {
    list1: Array
  },
  computed:{
    list(){
      return this.$route.query.list
    }
  }
};
</script>
<style scoped>
</style>


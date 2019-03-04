<template>
  <div>
    <div v-for="item in list" :key="item.index">
        <Item v-bind:item="item" />
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
  props: {
    list:Array
  }
};
</script>
<style scoped>
</style>


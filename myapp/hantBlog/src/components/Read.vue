<template>
  <div>
    <div>{{title}}</div>
    <div v-html="content"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
</style>


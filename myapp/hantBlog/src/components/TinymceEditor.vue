<template>
  <div id="demo">
    <tinymce :height="300" v-model="content"/>
  </div>
</template>
 
<script>
import Tinymce from "@/plugins/Tinymce";
export default {
  name: "TinymceEditor",
  components: { Tinymce },
  props:{
      content:String
  },
  methods: {},
  mounted() {}
};
</script>
 
<style scoped>
</style>

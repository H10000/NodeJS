<template>
  <div class="home">
    <Top />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Top from '@/components/Top.vue';
export default {
  name: 'home',
  components: {
    Top,
    HelloWorld,
  },
};
</script>

<template>
  <div id="app" class="appcontainer">
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  background-color: #f4f5f5;
  text-align: center;
}
@media screen and (min-width: 990px) {
  .appcontainer {
     margin: 0 auto;
    width: 990px;
  }
}
@media screen and (max-width: 990px) {
  .appcontainer {
     margin: 0 auto;
    width: 100%;
  }
}
</style>

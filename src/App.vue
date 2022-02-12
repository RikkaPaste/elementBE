<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return { radio: "1" };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nprogress .bar{
  background-color: rgba(27, 190, 231, 0.712) !important;
}

</style>

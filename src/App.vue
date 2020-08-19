<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://cdn.d.greeninvoice.co.il/assets/web-app/2.2.331/components/webfonts/all.min.css");

html {
  font-size: 1vw;
  direction: RTL;
}

body {
  font-family: "almoni-neue-dl";
  margin: 0px;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: right;
  color: #2c3e50;
}

h1 {
  margin: 0px;
}
</style>

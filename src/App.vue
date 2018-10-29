<template>
  <div id="app">
    <router-view/>
</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app,
.wrapper,
body,
html {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  /*overflow: hidden;*/
}
ul {
  list-style: none;
}
* {
  padding: 0;
  margin: 0;
}
</style>

<template>
  <div id="app">
    <router-view :key="$route.params.id" />
  </div>
</template>
<style lang="scss">
@import "assets/styles/main";
</style>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

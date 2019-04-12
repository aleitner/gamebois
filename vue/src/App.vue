<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #e8ffff;

    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    justify-content: center;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
</style>

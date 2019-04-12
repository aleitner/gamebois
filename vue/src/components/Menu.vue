<template>
  <div class="hello">
    <h2 id="high-score">high score: {{ highscore }}</h2>
    <h1 id="start">Start</h1>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        highscore: 0,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  #start {
    cursor: pointer;
    text-transform: uppercase;
  }
</style>

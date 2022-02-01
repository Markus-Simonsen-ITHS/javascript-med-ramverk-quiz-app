<script>
  export default {
    props: {
      answer: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    }
  }
</script>

<template>
  <div>
    <p @click="this.$emit('checkAnswer', index)">{{ answer }}</p>
  </div>
</template>

<style scoped>
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: 1.5em;
    cursor: pointer;
    transition: all 0.25s;
  }
  p:hover {
    color: rgb(0, 119, 255);
    transform: scale(1.3);
  }
  p:active {
    transform: scale(0.9);
  }
</style>

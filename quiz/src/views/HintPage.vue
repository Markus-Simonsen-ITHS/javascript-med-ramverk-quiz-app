<template>
  <h1 class="m-5">Here's the correct answer: {{ correctAnswer }}</h1>
</template>

<script>
  import { htmlDecode } from "js-htmlencode"
  export default {
    computed: {
      correctAnswer() {
        if (this.$store.state.questions.length > 0) {
          return htmlDecode(
            this.$store.state.questions[parseInt(this.$route.params.index)]
              .correct_answer
          )
        } else {
          return ""
        }
      }
    },
    created() {
      console.log(this.$store.state.questions.length)
      if (this.$store.state.questions.length === 0) {
        this.$router.push("/quiz")
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: rgb(73, 73, 73);
  }
</style>

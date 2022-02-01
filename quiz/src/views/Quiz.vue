<template>
  <div id="bodyQuiz">
    <div v-if="questions.length > 0" id="mainQuiz">
      <div id="question">
        <Category
          @categoryChanged="changeCategory"
          :category="category"
          :disabled="!onLine"
        />
        <h1>{{ question }}</h1>
        <router-link to="/hint/0">Hint</router-link>
        <p
          id="incorrect"
          v-if="!ansowredCorrectly"
          :class="{ shakeClass: shake }"
        >
          Incorrect answer!
        </p>
        <div id="answers">
          <Answer
            v-for="(answer, index) in alfabeticalAnswers"
            :answer="answer"
            :index="index"
            :key="index"
            @checkAnswer="checkAnswer"
          />
        </div>
      </div>
    </div>
    <div v-else>
      Out of questions, a network connection is required to continue.
      <button @click="getQuestions">Try again</button>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import { htmlDecode } from "js-htmlencode"
  import Answer from "../components/AnswerBox.vue"
  import Category from "../components/CategoryList.vue"

  export default {
    name: "QuizApp",
    data() {
      return {
        ansowredCorrectly: true,
        shake: false,
        category: 0
      }
    },
    created() {
      this.getQuestions()
      this.category = parseInt(localStorage.getItem("category")) || 0
    },
    computed: {
      questions() {
        return this.$store.state.questions
      },
      question() {
        return htmlDecode(this.questions[0].question)
      },
      answers() {
        let array = this.questions[0].incorrect_answers.concat(
          this.questions[0].correct_answer
        )
        return array.map((answer) => htmlDecode(answer))
      },
      alfabeticalAnswers() {
        let array = this.answers
        return array.sort()
      },
      onLine() {
        return navigator.onLine
      }
    },
    methods: {
      checkAnswer(index) {
        if (
          htmlDecode(this.questions[0].correct_answer) === this.answers[index]
        ) {
          console.log("correct")
          this.$store.commit("removeQuestion")
          this.getQuestions()
          this.ansowredCorrectly = true
        } else {
          this.ansowredCorrectly = false
          this.shake = true
          setTimeout(() => {
            this.shake = false
          }, 1000)
        }
      },
      getQuestions() {
        if (localStorage.getItem("questions") && this.questions.length < 1) {
          this.$store.commit(
            "addQuestions",
            JSON.parse(localStorage.getItem("questions"))
          )
        }

        let getQuestionsNum = 5 - this.questions.length

        if (navigator.onLine && getQuestionsNum > 0) {
          axios
            .get(
              `https://opentdb.com/api.php?amount=${getQuestionsNum}&category=${this.category}`
            )
            .then((response) => {
              this.$store.commit("addQuestions", response.data.results)
              localStorage.setItem("questions", JSON.stringify(this.questions))
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          localStorage.setItem("questions", JSON.stringify(this.questions))
        }
      },
      changeCategory(category) {
        this.$store.commit("clearQuestions")
        localStorage.setItem("questions", JSON.stringify(this.questions))
        this.category = category
        this.getQuestions()
        localStorage.setItem("category", category)
      }
    },
    components: { Answer, Category }
  }
</script>

<style lang="scss">
  @mixin setup {
    width: 100%;
    height: 100%;
    display: flex;
  }

  #bodyQuiz {
    @include setup;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    width: 75%;
    margin: auto;
    text-align: center;
    color: rgb(73, 73, 73);
  }
  #mainQuiz {
    @include setup;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #question {
    @include setup;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;

    h1 {
      font-size: 2em;
      margin: 10px;
    }

    p {
      font-size: 1.5em;
      margin: 10px;
    }
  }
  #answers {
    @include setup;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
  #incorrect {
    color: red;
    font-size: 1.5em;
  }

  .shakeClass {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  * {
    margin: 0;
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-5, 0);
    }
    20% {
      transform: translate(5px, 0);
    }
    30% {
      transform: translate(-5px, 0);
    }
    40% {
      transform: translate(5px, 0);
    }
    50% {
      transform: translate(-5px, 0);
    }
    60% {
      transform: translate(5px, 0);
    }
    70% {
      transform: translate(-5px, 0);
    }
    80% {
      transform: translate(5px, 0);
    }
    90% {
      transform: translate(-5px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
</style>

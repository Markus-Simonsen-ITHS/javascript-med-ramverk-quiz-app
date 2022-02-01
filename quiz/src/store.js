import { createStore } from "vuex"

const mutations = {
    addQuestions(state, questions) {
      state.questions = state.questions.concat(questions)
    },
    removeQuestion(state) {
      console.log(state.questions.length)
      if (state.questions.length == 2) {
        state.questions[0] = state.questions[1]
        state.questions.pop()
      } else if (state.questions.length == 1) {
        console.log("Before: " + state.questions.length)
        state.questions = []
        localStorage.setItem("questions", JSON.stringify([]))
      } else {
        state.questions.shift()
      }
    },
    clearQuestions(state) {
      state.questions = []
    }
  },
  state = {
    questions: []
  }

export default createStore({ mutations, state, strict: true })

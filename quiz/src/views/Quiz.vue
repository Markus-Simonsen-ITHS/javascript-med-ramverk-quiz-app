<template>
    <div id="bodyQuiz">
        <div v-if="questions.length > 0" id="mainQuiz">
            <div id="question">
                <h1>{{ question }}</h1>
                <div id="answers">
                    <div
                        v-for="(answer, index) in alfabeticalAnswers"
                        :key="index"
                        @click="checkAnswer(index)"
                    >
                        <p>{{ answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    name: 'Quiz',
    data() {
        return {
            questions: [],
        }
    },
    created() {
        this.getQuestions()
    },

    computed: {
        question() {
            return this.questions[0].question;
        },
        answers() {
            return this.questions[0].incorrect_answers.concat(this.questions[0].correct_answer);
        },
        alfabeticalAnswers() {
            return this.answers.sort();
        },
    },

    methods: {
        checkAnswer(index) {
            if (this.questions[0].correct_answer === this.answers[index]) {
                alert('Correct!');
                this.questions.shift();
                this.getQuestions();
            } else {
                alert('Incorrect!');
            }
        },

        getQuestions() {
            let getQuestionsNum = 10 - this.questions.length
            axios.get('https://opentdb.com/api.php?amount=' + getQuestionsNum)
                .then(response => {
                    this.questions = this.questions.concat(response.data.results);
                    console.log(this.questions);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
}


</script>
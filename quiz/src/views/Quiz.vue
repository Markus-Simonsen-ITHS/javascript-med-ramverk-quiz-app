<template>
    <div id="bodyQuiz">
        <div v-if="questions.length > 0" id="mainQuiz">
            <div id="question">
                <h1>{{ question }}</h1>
                <p
                    id="incorrect"
                    v-if="!ansowredCorrectly"
                    :class="{ shakeClass: shake }"
                >Incorrect answer!</p>
                <div id="answers">
                    <Answer
                        v-for="(answer, index) in answers"
                        :answer="answer"
                        :index="index"
                        :key="index"
                        @checkAnswer="checkAnswer"
                    ></Answer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { htmlDecode } from 'js-htmlencode'
import Answer from '../components/Answer.vue'

export default {
    name: "Quiz",
    data() {
        return {
            questions: [],
            ansowredCorrectly: true,
            shake: false,
        };
    },
    created() {
        this.getQuestions();
    },
    computed: {
        question() {
            return htmlDecode(this.questions[0].question);
        },
        answers() {
            let array = this.questions[0].incorrect_answers.concat(this.questions[0].correct_answer);
            return array.map(answer => htmlDecode(answer));
        },
        alfabeticalAnswers() {
            return this.answers.sort();
        },
    },
    methods: {
        checkAnswer(index) {
            console.log(index);
            if (this.questions[0].correct_answer === this.answers[index]) {
                console.log('correct');
                this.questions.shift();
                this.getQuestions();
                this.ansowredCorrectly = true;
            }
            else {
                this.ansowredCorrectly = false
                this.shake = true;
                setTimeout(() => {
                    this.shake = false;
                }, 1000);
            }
        },
        getQuestions() {
            console.log(!!localStorage.getItem('questions'));
            console.log(this.questions.length < 1);

            if (localStorage.getItem('questions') && this.questions.length < 1) {
                this.questions = JSON.parse(localStorage.getItem('questions'));
            }

            let getQuestionsNum = 10 - this.questions.length;

            if (navigator.onLine) {
                axios.get("https://opentdb.com/api.php?amount=" + getQuestionsNum)
                    .then(response => {
                        this.questions = this.questions.concat(response.data.results);
                        console.log(this.questions);
                        localStorage.setItem('questions', JSON.stringify(this.questions));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                localStorage.setItem('questions', JSON.stringify(this.questions));
            }



        }
    },
    components: { Answer }
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
    text-align: center
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

body {
    background-color: rgb(210, 238, 255);
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
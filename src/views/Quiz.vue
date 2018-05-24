<template>
<section class="hero">
  <div class="hero-body">
    <div class="container" v-if="quizIntro">
        <h1 class="title">Benvenuto al Quiz: {{title}}</h1>
        <p>
        Sei pronto a misurare la tua abilità?
        </p>
        
        <button class="button is-primary is-medium" @click="startQuiz">INIZIAMO!</button>
    </div>
    
    <div class="container" v-if="quizQuestions">
        <Question 
                :question="questions[currentQuestion]"
                v-on:answer="handleAnswer"
                :question-number="currentQuestion+1"
        ></Question>
    </div>
    
    <div class="container" v-if="quizResults">
        <h1 class="title">
            Hai risposto correttamente a {{correct}} domande su {{questions.length}}. La tua percentuale è {{perc}}%.
        </h1>
    </div>
  </div>
</section>
</template>

<script>
import Question from '@/components/Question.vue'
import { mapState } from 'vuex'

  export default {
    components: {
        Question
    },
    computed: mapState([
        // map this.quizIntro to store.state.quizIntro...
        'quizIntro', 'quizQuestions', 'quizResults', 'title', 'questions',
        'currentQuestion', 'answers', 'correct', 'perc'
    ]),
    // computed: {
    //     count () {
    //     return store.state.count
    //     }
    // }
    // computed: mapState({
    //     // arrow functions can make the code very succinct!
    //     count: state => state.count,

    //     // passing the string value 'count' is same as `state => state.count`
    //     countAlias: 'count',

    //     // to access local state with `this`, a normal function must be used
    //     countPlusLocalState (state) {
    //     return state.count + this.localCount
    //     }
    // })
    created: function() {
        this.$store.dispatch('loadQuiz', this.$route.params.quizId)
    },
    methods: {
        startQuiz() {
            this.$store.commit('setStep', 1);
            console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
        },
        handleAnswer(e) {
            console.log('answer event ftw',e);
            this.$store.commit('setAnswer', e.answer);
        }
    }
  };
</script>
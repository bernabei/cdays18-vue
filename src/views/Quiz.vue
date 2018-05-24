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
    data() {
        return {
            currentQuestion:0,
            answers:[],
            correct:0,
            perc:null
      };
    },
    computed: mapState([
        // map this.quizIntro to store.state.quizIntro...
        'quizIntro', 'quizQuestions', 'quizResults', 'title', 'questions'
    ]),
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
            this.answers[this.currentQuestion]=e.answer;
            if((this.currentQuestion+1) === this.questions.length) {
                this.handleResults();
                this.$store.commit('setStep', 2);
            } else {
                this.currentQuestion++;
            }
        },
        handleResults() {
            console.log('handle results');
            this.questions.forEach((a, index) => {
                if(this.answers[index] === a.answer) this.correct++;        
            });
            this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
            console.log(this.correct+' '+this.perc);
        }
    }
  };
</script>
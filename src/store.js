import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizIntro:false,
    quizQuestions:false,
    quizResults:false,
    title:'',
    questions:[],
    currentQuestion:0,
    answers:[],
    correct:0,
    perc:null
  },
  mutations: {
    setTitle (state, title) {
      state.title = title;
    },
    setQuestions (state, questions) {
      state.questions = questions;
    },
    setStep (state, step) {
      state.quizIntro = step == 0;
      state.quizQuestions = step == 1;
      state.quizResults = step == 2;
    },
  },
  actions: {
    loadQuiz ({ commit }, quizId) {
      axios
        .get(quizId)
        .then(response => {
            commit('setTitle', response.data.title);
            commit('setQuestions', response.data.questions);
            commit('setStep', 0);
        })
        .catch(error=>{console.log(error)})
    }
  }
})

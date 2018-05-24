import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quizIntro: false,
    quizQuestions: false,
    quizResults: false,
    title: "",
    questions: [],
    currentQuestion: 0,
    answers: [],
    correct: 0,
    perc: null
  },
  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
    setCurrentQuestion(state, question) {
      state.currentQuestion = question;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setStep(state, step) {
      state.quizIntro = step == 0;
      state.quizQuestions = step == 1;
      state.quizResults = step == 2;
    },
    setAnswer(state, answer) {
      state.answers[state.currentQuestion] = answer;

      if (state.currentQuestion + 1 === state.questions.length) {
        this.commit("handleResult");
        this.commit("setStep", 2);
      } else {
        state.currentQuestion = state.currentQuestion + 1;
      }
    },
    handleResult(state) {
      state.questions.forEach((a, index) => {
        if (state.answers[index] === a.answer) state.correct++;
      });
      state.perc = (state.correct / state.questions.length * 100).toFixed(2);
    }
  },
  actions: {
    loadQuiz({ commit }, quizId) {
      axios
        .get(quizId)
        .then(response => {
          commit("setTitle", response.data.title);
          commit("setQuestions", response.data.questions);
          commit("setStep", 0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});

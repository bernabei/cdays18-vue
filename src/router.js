import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quiz/:quizId',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

<template>
<section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Lista Quiz
      </h1>
      <h2 class="subtitle">
        Hero subtitle
      </h2>
    </div>
    <div style="padding: 10px" v-for="item in list" :key="item.id">
        <button class="button is-primary is-medium"
            @click="launchQuiz(item.id)">
            {{item.desc}}
        </button>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'QuizList',
  props: {
    list: Array
  },
  methods: {
    launchQuiz: function(quizId) {
      console.log(quizId);
      this.$router.push({ name: 'quiz', params: { quizId }})
    }
  }
}
</script>


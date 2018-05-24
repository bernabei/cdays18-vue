<template>
  <div class="home">
    <img src="../assets/logo.png">
    <QuizList :list="list"/>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizList from '@/components/QuizList.vue'

export default {
  name: 'home',
  components: {
    QuizList
  },
  data () {
    return {
      list: null
    }
  },
  mounted () {
    this.$http
      .get('quiz_list.json')
      .then(response => (this.list = response.data))
      .catch(error=>{console.log(error)})
  }
}
</script>

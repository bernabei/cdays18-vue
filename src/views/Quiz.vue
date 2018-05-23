<template>
  <div>
    <h1>QUIZ</h1>
    Quiz Id: {{ quizId }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
          quizId: null
      };
    },
    methods: {
    },
    mounted: function() {
        this.quizId = this.$route.params.quizId;
    }
  };
</script>
<template>
  <div id="app">
    <h1>Modo Práctica - Quiz</h1>
    <quiz-component />
  </div>
</template>

<script>
import QuizComponent from './components/QuizComponent.vue';

export default {
  components: {
    QuizComponent
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
}
</style>

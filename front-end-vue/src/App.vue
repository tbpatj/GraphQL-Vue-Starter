<template>
  <signup-page />
</template>

<script>
import SignupPage from "./components/signupPage/SignupPage.vue";

export default {
  name: "App",
  components: {
    SignupPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

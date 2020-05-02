<template>
  <div>
    <h1 class="mt-4 d-flex justify-content-center">Welcome</h1>
    <login></login>
  </div>
</template>
<script>
import Login from '../components/Login';
export default {
  name: "welcome",
  components: {
    'login': Login
  }
};
</script>
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
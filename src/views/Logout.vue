<template>
  <div>
    <b-alert show variant="info" class="m-3">
      <h4 class="alert-heading">You have been successfuly logged out.</h4>
      <hr>
      <b-button class="mx-auto" variant="success" @click="goHome()">To Home Page</b-button>
    </b-alert>
  </div>
</template>
<script>
export default {
  data() { return {} },
  mounted() {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  },
  methods: {
    goHome() {
      this.$router.push({name: 'Welcome'});
    }
  }
};
</script>
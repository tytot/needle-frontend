<template>
  <div>
    <h1>You have been logged out.</h1>
  </div>
</template>
<script>
export default {
  data() { return {} },
  mounted() {
    alert("You have been logged out.")
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    this.$router.push({name: 'Welcome'});
  }
};
</script>
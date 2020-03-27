<template>
  <div class="home">
    <h1>Welcome</h1>
    <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart>
  </div>
</template>
<script>
export default {
  name: "welcome",
  components: {}
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
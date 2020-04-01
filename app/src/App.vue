<template>
  <div id="nav">
    <Navigation v-if="$route.name != 'XML'" :key="componentKey"></Navigation>
    <router-view/>
  </div>
</template>

<script>

import Navigation from './components/Nav'
export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  },
  data() {
    return {
      componentKey: 0,
    };
  }, beforeUpdate() {
    this.componentKey += 1;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#table {
  padding: 30px;
}

#xml {
  padding: 0px;
}
</style>

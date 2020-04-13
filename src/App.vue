<template>
  <div id="nav">
    <navigation :key="componentKey"></navigation>
    <router-view/>
  </div>
</template>

<script>

import Navigation from './components/Nav'
export default {
  name: 'app',
  components: {
    'navigation': Navigation
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

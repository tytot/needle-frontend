import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.config.productionTip = false
Vue.use(Chartkick.use(Chart))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

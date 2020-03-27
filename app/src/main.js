import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = Axios;
Vue.use(Chartkick.use(Chart))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

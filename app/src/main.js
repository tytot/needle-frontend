import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Axios from 'axios'
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import VueFormGenerator from "vue-form-generator"

Vue.config.productionTip = false
Vue.prototype.$http = Axios;
Vue.use(Chartkick.use(Chart))
Vue.use(VueGoodTablePlugin)
Vue.use(VueFormGenerator)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'


Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/' //SM-TODO-Should point to proper server endpoint
Vue.prototype.$http = axios;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

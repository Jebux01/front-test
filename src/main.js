import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from "axios";


Vue.use(axios);
Vue.config.productionTip = false


axios.defaults.baseURL = "http://localhost:8000";

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

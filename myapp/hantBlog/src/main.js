import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './plugins/axios.js';
import cookies from "./common/cookies.js";
Vue.prototype.$cookies=cookies;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './plugins/axios.js';
import './plugins/vueQuillEditor.js';
import cookies from "./common/cookies.js";
import config from "./common/config.js";
Vue.prototype.$config = config;
Vue.prototype.$cookies = cookies;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

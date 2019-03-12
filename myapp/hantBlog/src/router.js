import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/Write',
      name: 'Write',
      component: () => import(/* webpackChunkName: "Write" */ './components/Write.vue'),
    },
  ],
});

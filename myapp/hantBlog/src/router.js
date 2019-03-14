import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main.vue';
Vue.use(Router);
const List = () => import('./components/List.vue');
const Read = () => import('./components/Read.vue')
export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
        path: 'List',
        name: 'List',
        component: List,
      }, {
        path: 'Read',
        name: 'Read',
        component: Read
      }]
    },
    {
      path: '/Write',
      name: 'Write',
      component: () => import( /* webpackChunkName: "Write" */ './components/Write.vue'),
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main.vue';
import List from './components/List.vue';
Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
        path: 'List',
        name: 'List',
        component:List,
        props: true
      }, {
        path: 'Read',
        name: 'Read',
        component: import( /* webpackChunkName: "navigator" */ './components/Read.vue')
      }]
    },
    {
      path: '/Write',
      name: 'Write',
      component: () => import( /* webpackChunkName: "Write" */ './components/Write.vue'),
    },
  ],
});

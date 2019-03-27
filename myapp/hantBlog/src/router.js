import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main.vue';
Vue.use(Router);
export default new Router({
  routes: [{
      path: '/',
      component: Main,
      children: [{
        path: '',
        name: 'List',
        component: () => import( /* webpackChunkName: "List" */ './components/List.vue'),
        props: {
          param: {
            flag: 0,
            data: {}
          }
        },
      }, {
        path: 'Read',
        name: 'Read',
        component: () => import( /* webpackChunkName: "Read" */ './components/Read.vue'),
      }, {
        path: 'UserInfo',
        name: 'UserInfo',
        component: () => import( /* webpackChunkName: "UserInfo" */
          './components/UserInfo.vue'),
      }, ]
    },
    {
      path: '/Write',
      name: 'Write',
      component: () => import( /* webpackChunkName: "Write" */ './components/Write.vue'),
    },

  ],
});

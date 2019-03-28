import Vue from 'vue';
import Router from 'vue-router';
 if (process.env.NODE_ENV === 'development') {
   Vue.use(Router);
 }
const Main = () => import( /* webpackChunkName: "Main" */ './components/Main.vue');
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

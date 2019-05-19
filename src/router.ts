import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('./views/app/App.vue'),
      children: [
        {
          path: 'data',
          name: 'data',
          component: () => import('./views/app/data/index.vue')
        },
        {
          path: 'add-data',
          name: 'add-data',
          component: () => import('./views/app/data/add.vue')
        },
        {
          path: 'update-data/:id',
          props: true,
          name: 'update-data',
          component: () => import('./views/app/data/update.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('./views/app/settings/index.vue')
        },
        {
          path: 'backup',
          name: 'backup',
          component: () => import('./views/app/backup/index.vue')
        },
        {
          path: 'summary',
          name: 'summary',
          component: () => import('./views/app/summary/index.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

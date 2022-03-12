import Home from '../pages/home.vue';

export default [
  {
    path: '/',
    component: Home,
    alias: ['/home', '/anasayfa'],
    meta: {},
    children: [],
  },
  {
    path: '/game',
    component: () => import('../pages/game.vue'),
    children: [
      {
        path: 'level-1',
        component: () => import('../pages/level-1.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', component: Home },
];

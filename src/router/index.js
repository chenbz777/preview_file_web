import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/encoding',
    name: 'encoding',
    component: () => import('@/views/encoding.vue')
  }
  // {
  //   path: '/:pathMatch(.*)',
  //   name: '404',
  //   component: () => import('@/views/404.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

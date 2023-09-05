//引入路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/index.vue'),
  },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;

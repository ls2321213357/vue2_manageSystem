import Vue from 'vue';
import App from './App.vue';
//引入ElementUI
import ElementUI, { Message, MessageBox } from 'element-ui';
//引入ElementUI相关文件
import 'element-ui/lib/theme-chalk/index.css';
//引入router相关文件
import VueRouter from 'vue-router';
//引入axios
import http from 'axios';
//引入路由器
import router from './router/index';
//引入less文件
import './assets/less/index.less';
//引入vuex的store
import store from '../src/store';
//引入mock
import './api/mock';
//使用VueRouter
Vue.use(VueRouter);
//使用ElementUI
Vue.use(ElementUI);
//使用axios
Vue.prototype.$http = http;
//绑定到message BOx组件上
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
//关闭vue的生产提示
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.user.token;
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    next({ name: 'home' });
  } else {
    next();
  }
});
new Vue({
  el: '#app',
  router: router,
  store,
  created() {
    store.commit('addMenu', router);
  },
  render: (h) => h(App),
});

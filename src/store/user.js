//定义token字段进行校验
import Cookie from 'js-cookie';
export default {
  state: {
    token: '',
  },
  mutations: {
    /**
     * 
     * @param {*} state 
     * @param {*} val 
     */
    setToken(state, val) {
      state.token = val;
      Cookie.set('token', val);
    },
    clearToken(state) {
      state.token = '';
      Cookie.remove('token');
    },
    getToken(state) {
      state.token = Cookie.get('token') || state.token;
    },
  },
};

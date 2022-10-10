import Cookie from 'js-cookie';
export default {
  state: {
    isCollapse: false,
    //定义面包屑默认值
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        Icon: 'home',
      },
    ],
    //设置高亮显示
    currentMenu: null,
    //存储接口返回的路由信息
    menu: [],
  },
  mutations: {
    isCollapseChange(state) {
      state.isCollapse = !state.isCollapse;
    },
    //设置选中的高亮显示
    selectMenu(state, value) {
      if (value.name !== 'home') {
        state.currentMenu = value;
        //判断选项是否已经存在
        const result = state.tabsList.findIndex(
          (item) => item.name === value.name,
        );
        if (result === -1) {
          state.tabsList.push(value);
        }
      } else {
        state.currentMenu = null;
      }
    },
    //找到当前的标签并且删掉
    closeTag(state, val) {
      const result = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(result, 1);
    },
    setMenu(state, val) {
      state.menu = val;
      Cookie.set('menu', JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove('menu');
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return;
      }
      //将menu中的数据转成对象
      const menu = JSON.parse(Cookie.get('menu'));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      //动态的添加路由
      menuArray.forEach((item) => {
        console.log(item);
        router.addRoute('Main', item);
      });
    },
  },
};

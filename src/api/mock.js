import Mock from 'mockjs';
import homeApi from './mockServeDate/home';
import userApi from './mockServeDate/user';
import permissionApi from './mockServeDate/permission';

//api写法
Mock.mock('/home/getData', homeApi.getStatisticalData);
//正则写法
//读取列表数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList);
//增加
Mock.mock(/user\/add/, 'post', userApi.createUser);
//删除
Mock.mock(/user\/delete/, 'get', userApi.deleteUser);
//修改
Mock.mock(/user\/edit/, 'post', userApi.updateUser);
//登陆部分
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu);

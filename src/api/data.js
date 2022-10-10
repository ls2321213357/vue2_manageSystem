//定义接口请求方法
import axios from './axios';
//对axios请求进行封装
export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param,
  });
};
export const getDate = () => {
  return axios.request({
    url: '/home/getData',
  });
};
export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params,
  });
};

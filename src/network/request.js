import axios from 'axios'

export function request(config){
//1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/m3',
    timeout: 5000,
    // withCredentials: true,
    // changeOrigin: true,
    method: 'get',
  })

//2.axios的拦截器
  //全局拦截
  // axios.interceptors
  //拦截实例
  //2.1.拦截请求
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config
  // }, err => {
  //   console.log(err);
  // })
  //2.2.拦截响应
  instance.interceptors.response.use(res => {
    // console.log(resdata);
    return res.data
  }, err => {
    console.log(err);
    
  })

//3.发送真正的网络请求
  return instance(config)
}
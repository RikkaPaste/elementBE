import axios from 'axios';
//实例化请求对象
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
const req = axios.create({
    // baseURL: 'http://lqgapidemo.quechao.xyz',
    baseURL:'http://localhost:3000',
    timeout: 5000
})
//请求拦截器
req.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        NProgress.start();
        return config;
    },
    error => {
        console.log('axios请求拦截器错误:' + error);
        return Promise.reject(error);
    }
)
//响应拦截器
req.interceptors.response.use(
    response => {
        NProgress.done();
        return response.data;
    },
    error => {
        console.log('axios响应拦截器错误:' + error);
        return Promise.reject(error);
    }
)
export default req;
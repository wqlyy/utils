/** 
 *  POST   /uri     创建        C
 *  DELETE /uri/xxx 删除        D
 *  PUT    /uri/xxx 更新或创建  U
 *  GET    /uri/xxx 查看        R
 */

//注意：由于axios中包含es6的语法，需要支持ES6 Promise实现。 如果您的环境不支持ES6 Promise，您可以使用polyfill。（import "babel-polyfill"）

import Axios from 'axios'




const service = Axios.create({
  baseURL:'',
  timeout:5000, //超时响应,0为不超时
})
//修改实例默认配置
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（表单数据格式提交）
// service.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; // 配置请求头(JSON数据格式提交)
service.defaults.withCredentials = false;   // axios 默认不发送cookie，需要全局设置true发送cookie



// 添加请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}



//1:get请求

//axios中常见的get/delete请求，也称作query请求：

// 一般发送请求是这么写（不推荐）：

axios.get('/user?id=12345&name=user')
.then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.log(err);
});
//但是为了方便全局统一调用封装的axios，我一般采用（推荐）

axios.get('/user', {  //params参数必写 , 如果没有参数传{}也可以
    params: {  
       id: 12345,
       name: user
    }
})
.then(function (res) {
    console.log(res);
})
.catch(function (err) {
    console.log(err);
});
 

//2.post/put/patch请求

//传参方式大致用的有3种

//(1) 传参格式为 formData 

//（全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'）

//（request的Header:'Content-Type'= 'multipart/form-data'）

var formData=new FormData();
formData.append('user',123456);
formData.append('pass',12345678);
 
axios.post("/notice",formData)
     .then((res) => {return res})
     .catch((err) => {return err})
 
 

//(2) 传参格式为 query 形式  

//（全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'）

//（request的Header:'Content-Type'= 'application/x-www-form-urlencoded'）

//第一种情况：使用$qs.stringify

import Qs from 'qs'   //引入方式
Vue.prototype.$qs = Qs  //全局加载
this.$qs.stringify(data);  //使用方式
this.$qs.parse(data);  //使用方式
 
var readyData=this.$qs.stringify({
    id:1234,
    name:user
});
axios.post("/notice",readyData)
     .then((res) => {return res})
     .catch((err) => {return err})
//第二种情况：使用URLSearchParams

//在浏览器中，您可以使用URLSearchParams API，如下所示：

var params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
//请注意，所有浏览器都不支持URLSearchParams，但是有一个polyfill可用（确保polyfill全局环境）。

 
///(3) 传参格式为 raw (JSON格式) 

//  第一种情况： axios将JavaScript对象序列化为JSON

//（全局请求头:'Content-Type'= 'application/x-www-form-urlencoded'）

//（request的Header:'Content-Type'= 'application/json;charset=UTF-8'）

var readyData={
    id:1234,
    name:user
};
axios.post("/notice",readyData)
     .then((res) => {return res})
     .catch((err) => {return err})
//  第二种情况：

//（全局请求头:‘Content-Type'= 'application/json;charset=UTF-8'）

//（request的Header:‘Content-Type'= 'application/json;charset=UTF-8'）

var readyData=JSON.stringify({
    id:1234,
    name:user
});
axios.post("/notice",readyData)
     .then((res) => {return res})
     .catch((err) => {return err})
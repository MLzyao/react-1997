// import  axios from 'axios';
// import {message} from 'antd';
// export default  function ajax(url,data={},method='get'){
//  let reqParams =data;
//  method= method.toLowerCase();
//  if (method==='get'){
//    reqParams = {
// params: data
//    }
//  }
//  return axios[method] (url,reqParams)
//    .then((res)=>{
//      const {data} = res;
//      if(data.status===0){
//        return data.data;
//      }else{
//        message.error(data.msg,2)
//      }
//    })
//    .catch((err)=>{
//      message('网不好。请刷新',2)
//    })
// }

import axios from 'axios';
import  {message} from 'antd';
export  default  function ajax(url,data ={},method='get' ){
  let reqParams =data;
  method = method.toLowerCase();
  if(method=== 'get'){
    reqParams = {
      params : data
    }
  }
  return axios[method] (url ,reqParams)
    .then((res) =>{
      const {data} = res;
      if (data.status ===0){
        return data.data;
      }else {
        message.error(data.msg,2)
      }
    })
    .catch((err) =>{
      message.error('网不好，请刷新',2)
    })
  }
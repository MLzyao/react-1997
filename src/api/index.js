import  ajax from './ajax';
import jsonp from 'jsonp';
export const reqLogin =(username,password) => ajax('/login',{username,password } , 'POST');
export const reqValidateUserInfo = (id) => ajax('/validate/user',{id}, 'POST')
// 请求天气
 export  const reqWeather = function (){
  return new Promise((resolve,reject)=>{
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`, {}, function (err, data) {
      if(!err){
        const { dayPictureUrl, weather} = data.result[0].weather_data[0];
        resolve({
          weatherImg:dayPictureUrl,
          weather
        });
      }else{
      alert("请求天气失败~")
      }
  })
 })
 }

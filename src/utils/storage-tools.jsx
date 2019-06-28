const USER_KEY = "USER_KEY";
const USER_TIME =  "USER_TIME";
const EXPIRES_IN = 1000*3600*24*3;

  export const getItem = function (){
  const startTime = localStorage.getItem(USER_TIME);
  if(Date.now()- startTime> EXPIRES_IN) {
    removeItem();
    return {}
  }

  // 如果没有过期就保留他的id
  return JSON.parse(localStorage.getItem(USER_KEY));
};
export const setItem = function (data){
  // 储存用户第一次登录时间
  localStorage.setItem( USER_TIME , Date.now());
  localStorage.setItem( USER_KEY ,JSON.stringify(data));

}
export const removeItem =function (){
  localStorage.removeItem(USER_TIME);
  localStorage.removeItem(USER_KEY)
}
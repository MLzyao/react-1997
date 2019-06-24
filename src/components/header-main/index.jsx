import React, { Component } from 'react';
import MyButton from '../my-button';
import { withRouter } from 'react-router-dom';
import menuList from '../../config/menu-config'
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { getItem ,removeItem } from '../../utils/storage-tools'
import { reqWeather } from '../../api/index';
import './index.less';
class HeaderMain extends Component {
  state = {
    sysTime : Date.now(),
    weather :"晴",
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
}
// 还没渲染就要加载
componentWillMount() {
    this.username = getItem().username;
    // 因为是上一次的数据，所以this.props
    this.title = this.getTitle( this.props )
}
  async  componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    }, 1000)

    // 发送请求，请求天气
    const result = await reqWeather('深圳');
    if (result) {
      this.setState(result);
    }
  }
componentWillReceiveProps(nextProps, nextContext) {
    this.title = this.getTitle(nextProps)
}

  // 退出按钮
  logout =() =>{
   Modal.confirm({
      title: 'Do you want to delete these items?',
     okText:"确定",
      CancelText:'取消',
      onOk:() => {
        console.log(this);
       removeItem();
        // 退出登录
        this.props.history.replace('/login');
      },
    });
  }


// 菜单跟随左边菜单title跟换
 getTitle =( nextProps)=>{
    console.log("getTitle()");
    const { pathname} =nextProps.location;
    // 遍历
   for(let i=0;i<menuList.length;i++){
     const menu= menuList[i];
     if( menu.children) {
       for (let j=0;j< menu.children.length; j++) {
         const item = menu.children[j];
         if (item.key === pathname) {
           // 二级菜单等于一级菜单
           return item.title;
         }
       }
         }else{
           if( menu.key ===pathname){
             return menu.title;
           }

         }
       }
     }






  render() {
     const { sysTime , weather , weatherImg} =this.state;

    return <div>
    <div className='header-main-top'>
      <span>欢迎，{this.username}</span>

      <MyButton onClick={this.logout}>退出</MyButton>
    </div>

    <div className='header-main-bottom'>

      <span className='header-main-left'>{this.title}</span>

      <div className='header-main-right'>

        <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss') }</span>

        <img src={weatherImg} alt='weatherImg'/>

        <span>{weather}</span>

      </div>
    </div>
    </div>;
  }
}
export  default withRouter(HeaderMain);
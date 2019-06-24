import React, { Component } from 'react';
import MyButton from '../my-button';
import { withRouter } from 'react-router-dom';

import { Modal } from 'antd';

import { removeItem } from '../../utils/storage-tools'
import { reqWeather } from '../../api';
import './index.less';
class HeaderMain extends Component {
  state = {
    sysTime : Date.now(),
    weather :"晴",
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
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

  render() {
     const { sysTime , weather , weatherImg} =this.state;

    return <div>
    <div className='header-main-top'>
      <span>欢迎，admin</span>

      <MyButton onClick={this.logout}>退出</MyButton>
    </div>

    <div className='header-main-bottom'>

      <span className='header-main-left'>用户管理</span>

      <div className='header-main-right'>

        <span>{Date.now()}</span>

        <img src={weatherImg} alt='weatherImg'/>

        <span>{weather}</span>

      </div>
    </div>
    </div>;
  }
}
export  default withRouter(HeaderMain);
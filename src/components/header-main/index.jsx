import React, { Component } from 'react';
import MyButton from '../my-button';
import { withRouter } from 'react-router-dom';

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
    // this.title = this.getTitle( this.props )
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
// componentWillReceiveProps(nextProps, nextContext) {
//     this.title = this.getTitle(nextProps)
// }

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
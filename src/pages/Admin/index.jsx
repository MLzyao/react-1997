/*
后台管理主路由组件
 */
import React, { Component } from 'react';
import { Layout } from 'antd';

import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';
import LeftNav from '../../components/left--nav';
import HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api';
import {Route ,Switch , Redirect} from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
export default class Admin extends Component {
  // 页面进来,加载.成功的状态
  state = {
    collapsed: false,
    isLoading:true,
    success:false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
    async  componentWillMount() {
    // 先判断用户输入是否输入成功，有就进入网页
      const user = getItem();
        if(user&& user._id){
              // 如果用户是登录进来的，就不需要再次刷新
              const result = await  reqValidateUserInfo(user._id)

              // result=通过,
              if( result ) {
                return this.setState({
                  isLoading:false,
                  success:true,
                })
              }
          }
        this.setState({
          isLoading:false,
          success:false
      })
  }

  render() {

    const { collapsed ,isLoading, success} = this.state;
    if( isLoading ) return null;
    // 只有你登陆成功,才能进入页面,否则重定向到login
    return success? <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <LeftNav collapsed={collapsed}/>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, minHeight: 100 }}>
          <HeaderMain />
        </Header>
        <Content style={{ margin: '25px 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Switch>
              <Route  path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          推荐使用谷歌浏览器，可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout> :<Redirect to= "/login"/>

  }
}

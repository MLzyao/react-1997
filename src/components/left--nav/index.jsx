import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import menuList from '../../config/menu-config.js';
import './index.less';

import  logo from '../../assets/image/logo.png'
const { SubMenu , Item} =Menu;


class LeftNav extends Component {
  static  propTypes= {
    collapsed:PropTypes.bool.isRequired
  }
  createMenu = (menu) =>{
    return <Item key={menu.key}>
      <Link to ={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  }
  componentWillMount() {
    const { pathname }= this.props.location;
    this.menus = menuList.map((menu)=>{
      const children = menu.children;
      if( children ){
        return <SubMenu key={menu.key}
        title ={
          <span>
             <Icon type={menu.icon}/>
             <span>{menu.title}</span>
          </span>
        }
     >
          {
            children.map((item)=>{
              if(item.key === pathname){
                this.openKey = menu.key;

              }
              return this.createMenu(item);
            })
          }
        </SubMenu>
      }else{
        return this.createMenu(menu)
      }
    } );
   this.selecteKey= pathname;
  }


   render() {
    const {collapsed } = this.props;
    return <div>

          <Link className="left-nav-logo"  to='/home' >
          <img src={logo}  alt="logo"/>
          <h1 style={{display:collapsed?'none':'block'}}>后台硅谷</h1>
          </Link>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}>
            {
              this.menus
            }

            {/*<Item key="home">*/}
              {/*<Link to='home'>*/}
                {/*<Icon type="home" />*/}
                {/*<span >首页</span>*/}
              {/*</Link>*/}
            {/*</Item>*/}
            {/*<SubMenu  key="sub1"*/}
                {/*title={*/}
                  {/*<span>*/}
              {/*<Icon type="appstore" />*/}
              {/*<span >商品</span>*/}
                  {/*</span>*/}
                {/*}*/}
            {/*>*/}

            {/*<Item key="category">*/}
              {/*<Link to="category">*/}
                {/*<Icon type="bars" />*/}
                {/*<span>品类管理</span>*/}
              {/*</Link>*/}
            {/*</Item>*/}
            {/*<Item key="4">*/}
              {/*<Icon type="tool " />*/}
              {/*<span> 商品管理 </span>*/}
            {/*</Item>*/}
            {/*</SubMenu>*/}
            {/*<Item key="5">*/}
              {/*<Icon type="user" />*/}
              {/*<span> 用户管理 </span>*/}
            {/*</Item>*/}
            {/*<Item key="6">*/}
            {/*<Icon type="user" />*/}
            {/*<span> 权限管理 </span>*/}
          {/*</Item>*/}
          {/*<SubMenu  key= "sub2"*/}
            {/*title={*/}
             {/*<span>*/}
               {/*<Icon type="team" />*/}
                {/*<span> 图形图表 </span>*/}
             {/*</span>*/}
            {/*}*/}
          {/*>*/}
            {/*<Item key="7">*/}
              {/*<Icon type="team" />*/}
            {/*<span> 柱形图 </span>*/}
          {/*</Item>*/}
            {/*<Item key="8">*/}
              {/*<Icon type="team" />*/}
              {/*<span> 折线图 </span>*/}
            {/*</Item>*/}
            {/*<Item key="9">*/}
              {/*<Icon type="team" />*/}
              {/*<span> 饼图 </span>*/}
            {/*</Item>*/}
            {/*</SubMenu>*/}
          </Menu>
    </div>
  }
}
// withRouter是一个高阶组件，向非路由组件传递三大属性：history、location、match

export  default withRouter(LeftNav)
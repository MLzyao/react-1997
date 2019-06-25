import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import menuList from '../../config/menu-config';
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
        <Icon type={menu.icon}/>-
        <span>{menu.title}</span>
      </Link>
    </Item>
  }

  componentWillMount() {
    // admin左侧栏 默认选中home
    let isHome = true;
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
        if ( menu.key === pathname) isHome = false;
        return this.createMenu(menu)
      }
    });
   this.selecteKey= isHome? '/home' : pathname;
  }


   render() {
    const {collapsed } = this.props;
    return <div>
         <Link className="left-nav-logo"  to='/home' >
          <img src={logo}  alt="logo"/>
          <h1 style={{display:collapsed?'none':'block'}}>后台硅谷</h1>
          </Link>
         <Menu theme="dark" defaultSelectedKeys={[this.selecteKey]} defaultOpenKeys={[this.openKey]} mode="inline">
           {
             this.menus
           }
         </Menu>
    </div>
  }
}
// withRouter是一个高阶组件，向非路由组件传递三大属性：history、location、match

export  default withRouter(LeftNav)
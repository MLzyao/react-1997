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
  // ajax发了请求,这里接收
  componentWillMount() {

    /**
     *   功能:显示品类管理,商品管理
     */
      let { pathname} = this.props.location;
      // 正则判断
      const pathnameReg = /^\/w+\//;
    // pathnameReg.test的test 是正则表达式的api,
      if( pathnameReg.test(pathname)){
        pathname = pathname.slice(0,8)
      }


    // admin左侧栏 默认选中home
    let isHome = true;
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
     // 默认值选中home
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
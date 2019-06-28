import React, { Component } from 'react';
import  {Route,Switch,Redirect} from 'react-router-dom';

import Index from './index/index';
import AddUpdate from './add-update';
import Detail from './detail';
export default class Product extends Component {
  render() {
    console.log(this.props.location)
    return <Switch>
      <Route path='/product/detail' component={Detail}/>
      <Route path='/product/index' component={Index}/>
      <Route path='/product/add-update' component={AddUpdate}/>
      <Redirect to ='/product/index' />
    </Switch>
  }
}
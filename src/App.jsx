import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import ReactDOM from 'react-dom'

import Login from './pages/login';
import Admin from './pages/Admin';
/*
应用根组件
 */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;


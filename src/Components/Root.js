import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ChatApp from './ChatApp.js'
import Login from '../Components/Auth/Login.js'
import Register from '../Components/Auth/Register.js'

const Root = () => {
  return (
    <Switch>
    <Route exact path="/" component={ChatApp} />
    <Route exact path="/Login" component={Login} />
    <Route exact path="/Register" component={Register} />
    </Switch>
  )
}

export default Root;

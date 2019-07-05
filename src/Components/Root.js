import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import ChatApp from './ChatApp.js';
import Login from '../Components/Auth/Login.js';
import Register from '../Components/Auth/Register.js';
import UserContext from '../context/UserContext.js';
import firebase from '../logic/firebase.js'

const Root = ({ history }) => {
  const [user, setUser] = useState({displayName: "", uid: "", photoURL: ""});

  useEffect(() => {
    console.log(`mount`)
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log(`already logged in -> nav to /`)
      const { displayName, uid, photoURL } = user;
      setUser({ displayName, uid, photoURL })
      history.push("/")
    } else {
        console.log(`not logged in -> navigate to /Login`)
        history.push("/Login")
    }
  })
  },[]);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Switch>
        <Route exact path="/" component={ChatApp} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
      </Switch>
    </UserContext.Provider>
  );
};

export default Root;

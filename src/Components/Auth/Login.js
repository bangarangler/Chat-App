import React, { useContext, useState } from 'react';
import {appName, appIconName} from '../../logic/Constants.js';
import {Segment, Header, Icon, Button, Form, Message} from 'semantic-ui-react';
import UserContext from '../../context/UserContext.js'
import firebase from '../../logic/firebase.js'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = ({ history }) => {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = e => {
    e.preventDefault()

    firebase.auth().signInWithEmailAndPassword(email, password).then(loggedinUser => {
      console.log(loggedinUser.user)
      setUser({displayName: loggedinUser.user.displayName,
      uid: loggedinUser.user.uid,
        photoURL: loggedinUser.user.photoURL
      })
      history.push("/")
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="Login">
      <div>
     <Segment stacked>
        <Header color="black" as="h2">
          <Icon name={appIconName} /> Login to {appName}
        </Header>
        <Form onSubmit={login}>
          <Form.Input
            icon="mail"
            value={email}
            iconPosition="left"
            placeholder="E-mail address"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Input
            icon="lock"
            value={password}
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button size="large" fluid color="black" type="submit">
            Login
          </Button>
        </Form>
      </Segment>
      <Message>
          New to us ? <Link to="/Register">Register</Link>
      </Message>
    </div>
    </div>
  );
};

export default Login;

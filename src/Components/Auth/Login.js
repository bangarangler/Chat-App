import React, { useContext, useState, useEffect } from 'react';
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
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [firebaseError, setFirebaseError] = useState("")

  const isFormValid = !emailError && !passwordError;

  const evaluateEmailError = (email) => {
    if (!email.length) {
    setEmailError("Email can not be empty")
    } else {
      setEmailError("")
    }
  }

  const evaluatePasswordError = (password) => {
    if (!password.length) {
    setPasswordError("Password can not be empty")
    } else {
      setPasswordError("")
    }
  }

  useEffect(() => {
    evaluateEmailError(email)
    evaluatePasswordError(password)
  },[])

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
      setFirebaseError(err.message)
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
            onChange={e => {
              setEmail(e.target.value)
              evaluateEmailError(e.target.value)
            }}
          />
              {emailError ? <Message negative>{emailError}</Message> : ""}
          <Form.Input
            icon="lock"
            value={password}
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={e => {
              setPassword(e.target.value)
              evaluatePasswordError(e.target.value)
            }}
          />
              {passwordError ? <Message negative>{passwordError}</Message> : ""}
          <Button disabled={!isFormValid} size="large" fluid color="black" type="submit">
            Login
          </Button>
            {firebaseError ? <Message negative>{firebaseError}</Message> : ""}
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

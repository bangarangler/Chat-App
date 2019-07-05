import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../../context/UserContext.js';
import firebase from '../../logic/firebase.js';
import {Header, Icon, Form, Button, Segment, Message} from 'semantic-ui-react';
import {appName, appIconName} from '../../logic/Constants.js';
import './Register.css';
import { Link } from 'react-router-dom'

const Register = ({ history }) => {
  const {setUser} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [displayNameError, setDisplayNameError] = useState("")
  const [avatarURLError, setAvatarURLError] = useState("")
  const [firebaseError, setFirebaseError] = useState("")

  const evaluateEmailError = email => {
    if (!email.length) {
      setEmailError("Email can not be empty")
    } else {
      setEmailError("")
    }
  }

  const evaluatePasswordError = password => {
    if (!password.length) {
      setPasswordError("Password can not be empty")
    } else {
      setPasswordError("")
    }
  }

  const evaluateDisplayName = displayName => {
    if (!displayName.length) {
      setDisplayNameError("Display Name can not be empty")
    } else {
      setDisplayNameError("")
    }
  }

  const evaluateAvatarURL = photoURL => {
    if (!photoURL.length) {
      setAvatarURLError("Avatar URL can not be empty")
    } else {
      setAvatarURLError("")
    }
  }

  useEffect(() => {
    evaluateDisplayName(displayName)
    evaluateEmailError(email)
    evaluatePasswordError(password)
    evaluateAvatarURL(photoURL)
  },[])

  const register = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(`createdUser : ${createdUser}`);
        createdUser.user.updateProfile({displayName, photoURL}).then(() => {
          console.log(createdUser.user)
          setUser({displayName, photoURL, uid: createdUser.user.uid})
          history.push("/")
        })
      })
      .catch(err => {
        console.log(`error : ${err}`)
        setFirebaseError(err.message)
      });
  };

  return (
    <div className="Register">
    <div>
    <Segment stacked>
      <Header as="h2">
        <Icon name={appIconName} />
        Register to {appName}
      </Header>
      <Form onSubmit={register}>
        <Form.Input
          icon="user"
          value={displayName}
          iconPosition="left"
          placeholder="Display Name"
          type="text"
    onChange={e => {
      setDisplayName(e.target.value)
      evaluateDisplayName(e.target.value)
    }}
        />
    {displayNameError ? <Message negative>{displayNameError}</Message> : ""}
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
        <Form.Input
          icon="file image"
          value={photoURL}
          iconPosition="left"
          placeholder="Avatar URL"
          type="url"
    onChange={e => {setPhotoURL(e.target.value)
      evaluateAvatarURL(e.target.value)
    }}
        />
    {avatarURLError ? <Message negative>{avatarURLError}</Message> : ""}
        <Button size="large" fluid color="black" type="submit">
          Register
        </Button>
    {firebaseError ? <Message negative>{firebaseError}</Message> : ""}
      </Form>
    </Segment>
    </div>
    <Message>Already have an account? <Link to="/Login">Login</Link></Message>
    </div>
  );
};

export default Register;

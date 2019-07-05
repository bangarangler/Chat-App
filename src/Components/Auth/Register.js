import React, {useContext, useState} from 'react';
import UserContext from '../../context/UserContext.js';
import firebase from '../../logic/firebase.js';
import {Header, Icon, Form, Button, Segment} from 'semantic-ui-react';
import {appName, appIconName} from '../../logic/Constants.js';
import './Register.css';

const Register = ({ history }) => {
  const {setUser} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

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
      .catch(err => console.log(`error : ${err}`));
  };

  return (
    <div className="Register">
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
          onChange={e => setDisplayName(e.target.value)}
        />
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
        <Form.Input
          icon="file image"
          value={photoURL}
          iconPosition="left"
          placeholder="Avatar URL"
          type="url"
          onChange={e => setPhotoURL(e.target.value)}
        />
        <Button size="large" fluid color="black" type="submit">
          Register
        </Button>
      </Form>
    </Segment>
    </div>
  );
};

export default Register;

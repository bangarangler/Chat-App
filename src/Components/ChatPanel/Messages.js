import React from 'react';
import './Messages.css';
import moment from 'moment';
import {Comment} from 'semantic-ui-react';

const Messages = ({messages}) => {
  const messagesElements = (
    <Comment.Group>
      {messages.map((item, index) => (
        <Comment key={index}>
          <Comment.Avatar src={item.user.photoURL} />
          <Comment.Content>
            <Comment.Author>{item.user.displayName}</Comment.Author>
            <Comment.Metadata>
              {moment(item.timestamp).fromNow()}
            </Comment.Metadata>
            <Comment.Text>{item.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
  return <div className="Messages">{messagesElements}</div>;
};

export default Messages;

import React, {useState} from 'react';
import {Modal, Header, Form, Button, Icon} from 'semantic-ui-react';
import './AddRoomModal.css';

const AddRoomModal = ({roomsRefFirebase}) => {
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const addRoom = () => {
    console.log('addRoom');
    const roomId = roomsRefFirebase.push().key;
    const newRoom = {
      id: roomId,
      name: roomName,
      description: roomDescription,
    };

    roomsRefFirebase
      .child(roomId)
      .set(newRoom)
      .then(room => console.log(`success : ${room}`))
      .catch(err => console.log(`error : ${err}`));
  };
  return (
    <div className="AddRoomModal">
      <Modal
        trigger={<span onClick={handleOpen}>+</span>}
        open={modalOpen}
        onClose={handleClose}
        basic
        size="small">
        <Header content="Add a chat room" />
        <Modal.Content>
          <Form onSubmit={addRoom}>
            <Form.Field>
              <input
                placeholder="Name"
                onChange={e => setRoomName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Description"
                onChange={e => setRoomDescription(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={handleClose}>
            <Icon name="remove" />
            Cancel
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              addRoom();
              handleClose();
            }}>
            <Icon name="checkmark" />
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AddRoomModal;

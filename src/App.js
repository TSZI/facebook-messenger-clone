import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import db from './firebase'; // pulling from config file we setup for firebase
import firebase from 'firebase'; // pulling from firebase module
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
    // SET STATE [variable, setFunction] = useState(value)
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);

    // useState = variable in REACT
    // useEffect = run code on a condition in REACT

    useEffect(() => {
        // run once when the app component loads
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
            });
    }, []);

    useEffect(() => {
        // run code here...
        // if its blank inside [], this code runs once when the app component loads

        // setting variable in JAVASCRIPT
        //const name = prompt('Please enter your name');

        //setting variable in REACT
        setUsername(prompt('Please enter your name'));
    }, []); // condition

    const sendMessage = (event) => {
        // all the logic to send a message goes here
        event.preventDefault();

        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // setMessages([...messages, { username: username, text: input }]);
        setInput('');
    };

    return (
        <div className="App">
            <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100?h=100"></img>
            <h1>Hello Clever Programmers!</h1>
            <h2>Welcome {username}</h2>
            <form action="" class="app__form">
                <FormControl className="app__formControl">
                    <Input
                        className="app__input"
                        placeholder="Enter a message..."
                        type="text"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />

                    <IconButton
                        className="app__iconButton"
                        type="submit"
                        onClick={sendMessage}
                        variant="contained"
                        color="primary"
                        disabled={!input}
                    >
                        <SendIcon />
                    </IconButton>

                    {/* <Button
                        type="submit"
                        onClick={sendMessage}
                        variant="contained"
                        color="primary"
                        disabled={!input}
                    >
                        Send Message
                    </Button> */}
                </FormControl>
            </form>

            {/* Show Collection Here */}
            <FlipMove>
                {messages.map(({ id, message }) => (
                    <Message
                        key={id}
                        username={username}
                        message={message}
                    ></Message>
                ))}
            </FlipMove>
        </div>
    );
}

export default App;

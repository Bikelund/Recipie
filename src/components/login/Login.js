import React, { useState } from 'react';
import * as firebase from 'firebase';
import config from '../firebase/firebase'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
          }
        const ref = firebase.database().ref(username);
        ref.once("value")
            .then(function (snapshot) {
                const data = snapshot.val();
              
                console.log(data)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    id="username"
                    value={username}
                    type="text"
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                /><br />
                <input
                    name="password"
                    id="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                /><br />
                <button type="submit" disabled={!validateForm()} >
                    Log In
                </button>
            </form>
        </>
    )
}

export default Login
import React, { useState } from 'react';
import * as firebase from 'firebase';
import config from '../firebase/firebase'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function validateForm() {
        return email.length > 0 && password.length > 0 && username.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        firebase.initializeApp(config);
        firebase.database().ref(username).set({
                email: email,
                password: password
        });
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
                    name="email"
                    id="email"
                    value={email}
                    type="text"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
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
                    Sign In
                </button>
            </form>
        </>
    )
}

export default Register
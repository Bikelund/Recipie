import React, { useState } from 'react';
import * as firebase from 'firebase';
import config from '../firebase/firebase'

function Register() {
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function validateForm() {
        return email.length > 0 && password.length > 0 ;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
          }
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            alert('Register Success')
            setEmail('')
            setPassword('')
          } catch (error) {
            alert(error);
          }

       
    }

    return (
        <>
        <div>Sign in</div>
            <form onSubmit={handleSubmit}>
                {/* <input
                    name="username"
                    id="username"
                    value={username}
                    type="text"
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                /><br /> */}
                <input
                    name="email"
                    value={email}
                    type="text"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                /><br />
                <input
                    name="password"
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
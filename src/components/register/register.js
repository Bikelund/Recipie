import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import Login from '../login/Login';

function Register({ loginIsShown }) {
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerIsShown, setRegisterIsShown] = useState(!loginIsShown ? true : false)


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

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
            {registerIsShown ? 
                <div>
                    <div>Sign in</div>
                    <form onSubmit={handleSubmit}>
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
                    <hr />
                    <div>Log in to Recipie</div>
                    <button type="submit" onClick={() => setRegisterIsShown(false)}>
                        LOG IN
                </button>
                </div> : <Login registerIsShown={registerIsShown}/>
            }
        </>
    )
}

export default Register
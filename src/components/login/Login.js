import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import ResetPassword from './ResetPassword';
import Register from '../register/register';

function Login({ registerIsShown }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [resetPassword, setResetPassword] = useState(false)
    const [loginIsShown, setLoginIsShown] = useState(!registerIsShown ? true : false)


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            setEmail('')
            setPassword('')
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>{
            loginIsShown ?
                <div>
                    <div>Log in</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            value={email}
                            type="text"
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)}
                        /><br />
                        <input
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        /><br />
                        <div onClick={() => { setResetPassword(true); setLoginIsShown(false) }}>Forgot Password?</div>
                        <button type="submit" disabled={!validateForm()} >
                            LOG IN
                </button>
                    </form>
                    <hr />
                    <div>Create a New Account</div>
                    <button type="submit" onClick={() => setLoginIsShown(false)}>
                        SIGN UP
            </button>
                </div> : <Register loginIsShown={loginIsShown} />
        }
            {
                resetPassword ? <ResetPassword /> : ''
            }
        </>
    )
}

export default Login
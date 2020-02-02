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
        <>
        {loginIsShown ?
            <div>
                <h1 className="login__title">Log in to Recipie</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__form__input">
                    <input
                        name="email"
                        className="fontAwesome login__form__input__text"
                        value={email}
                        type="text"
                        placeholder="&#xf0e0; Email"
                        onChange={e => setEmail(e.target.value)}
                    /><br />
                    <input
                        name="password"
                        className="fontAwesome login__form__input__text"
                        value={password}
                        type="password"
                        placeholder="&#xf13e; Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="forgot__password" onClick={() => { setResetPassword(true); setLoginIsShown(false) }}>Forgot Password?</div>
                    </div>
                    <button type="submit" className="login__form__button" disabled={!validateForm()} >
                        LOG IN
                    </button>
                </form>
                <hr />
                <h2 className="switch__login">Create a New Account</h2>
                <button type="submit" className="login__form__button" onClick={() => setLoginIsShown(false)}>
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
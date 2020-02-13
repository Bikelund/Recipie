import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import { useHistory } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()

    //Sign up button appear when user filled in form
    //disabled={!validateForm()}
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            history.push('/myRecipe')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email') {
                setEmailErrorMsg(true)
                setPasswordErrorMsg(false)
                setMessage('Invalid email address')
            }
            else if (error.code === 'auth/weak-password') {
                setPasswordErrorMsg(true)
                setEmailErrorMsg(false)
                setMessage('Password should be at least 6 characters')
            } else if (error.code === 'auth/email-already-in-use') {
                setEmailErrorMsg(true)
                setPasswordErrorMsg(false)
                setMessage('The email address is already in use by another account.')
            }
        }
    }

    return (
        <>
        {
        <div className="login">
            <div className="login__left">
                <h1 className="login__title">Create a New Account</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__form__input">
                        {emailErrorMsg ? <div className="login__form__input__error__message">{message}</div> : ''}
                    <input
                        name="email"
                        className="fontAwesome login__form__input__text"
                        value={email}
                        type="text"
                        placeholder="&#xf0e0; Email"
                        onChange={e => setEmail(e.target.value)}
                    /><br />
                    {passwordErrorMsg ? <div className="login__form__input__error__message">{message}</div> : ''}
                    <input
                        name="password"
                        className="fontAwesome login__form__input__text"
                        value={password}
                        type="password"
                        placeholder="&#xf13e; Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <button type="submit" className="login__form__button sign__up" disabled={!validateForm()}>
                        SIGN UP
                    </button>
                    
                </form>
            </div>
            <div className="login__middle"></div>
            <hr />
            <div className="login__right">
                <h2 className="switch__login">Log in to Recipie</h2>
                <button type="submit" className="login__form__button" onClick={() => history.push('/login')}>
                    LOG IN
                </button>
            </div>
        </div> 
        }
        </>
    )
}

export default Register
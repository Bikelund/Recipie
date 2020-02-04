import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import { useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(false)
    const [message, setMessage] = useState('');
    const history = useHistory();
    

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push('/myRecipe')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setEmailErrorMsg(true)
                setPasswordErrorMsg(false)
                setMessage('Invalid email address')
            }
            else if(error.code === 'auth/wrong-password'){
                setPasswordErrorMsg(true)
                setEmailErrorMsg(false)
                setMessage('The password is invalid')
            }
        }
    }

    return (
        <>
            {
                <div>
                    <h1 className="login__title">Log in to Recipie</h1>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <div className="login__form__input">
                       {emailErrorMsg ? <div className="login__form__input__error__message">{message}</div> : '' }
                            <input
                                name="email"
                                className="fontAwesome login__form__input__text"
                                value={email}
                                type="text"
                                placeholder="&#xf0e0; Email"
                                onChange={e => setEmail(e.target.value)}
                            /><br />
                        {passwordErrorMsg ? <div className="login__form__input__error__message">{message}</div> : '' }
                            <input
                                name="password"
                                className="fontAwesome login__form__input__text"
                                value={password}
                                type="password"
                                placeholder="&#xf13e; Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="forgot__password" onClick={() => {history.push('/resetPassword') }}>Forgot Password?</div>
                        </div>
                        <button type="submit" className="login__form__button" disabled={!validateForm()} >
                            LOG IN
                    </button>
                    </form>
                    <hr />
                    <h2 className="switch__login">Create a New Account</h2>
                    <button type="submit" className="login__form__button sign__up" onClick={() => history.push('/register')}>
                        SIGN UP
                </button>
                </div> 
            }
        </>
    )
}

export default Login
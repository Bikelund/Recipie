import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import Login from '../login/Login';
import MyRecipes from '../myRecipes/myRecipes';

function Register({ loginIsShown }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerIsShown, setRegisterIsShown] = useState(!loginIsShown ? true : false)
    const [emailErrorMsg, setEmailErrorMsg] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(false)
    const [myRecipeListisShown, setMyRecipeListisShown] = useState(false)
    const [message, setMessage] = useState('');



    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            setMyRecipeListisShown(true)
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
            {myRecipeListisShown ? <MyRecipes /> :
                registerIsShown ?
                    <div>
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
                            <button type="submit" className="login__form__button sign__up" disabled={!validateForm()} >
                                SIGN UP
                    </button>
                        </form>
                        <hr />
                        <h2 className="switch__login">Log in to Recipie</h2>
                        <button type="submit" className="login__form__button" onClick={() => setRegisterIsShown(false)}>
                            LOG IN
            </button>
                    </div> : <Login registerIsShown={registerIsShown} />
            }
        </>
    )
}

export default Register
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
                <h1 className="login__title">Create a New Account</h1>
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
            </div> : <Login registerIsShown={registerIsShown}/>
        }
        </>
    )
}

export default Register
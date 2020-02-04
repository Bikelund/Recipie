import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import { useHistory } from 'react-router-dom';


function ResetPassword() {
    const [email, setEmail] = useState('');
    const [errorMsg, seterrorMeg] = useState(false);
    const history = useHistory();

    function validateForm() {
        return email.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        firebase.auth().sendPasswordResetEmail(email).then(function () {
            history.push('/login')
            setEmail('')
        }).catch(function (error) {
            console.log(error)
            setEmail('')
            seterrorMeg(true)
        });


    }


    return (
        <>
    
                <div onClick={() => history.goBack()} className="arrow"></div>
                <h1 className="login__title">Reset Password</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__form__input">
                        {errorMsg ? <div className="login__form__input__error__message">Invalid email address</div> : ''}
                        <input
                            name="email"
                            className="fontAwesome login__form__input__text"
                            value={email}
                            type="text"
                            placeholder="&#xf0e0; Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login__form__button submit" disabled={!validateForm()} >
                        SUBMIT
                </button>
                </form>
        </>
    )
}

export default ResetPassword

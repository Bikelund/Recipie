import React, { useState } from 'react';
import firebase from '../firebase/firebase';


function ResetPassword() {
    const [email, setEmail] = useState('');

    function validateForm() {
        return email.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        firebase.auth().sendPasswordResetEmail(email).then(function () {
            console.log('email sent')
            setEmail('')
        }).catch(function (error) {
            console.log(error)
            setEmail('')
        });


    }


    return (
        <>
            <div>Reset Password</div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    type="text"
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" disabled={!validateForm()} >
                    SUBMIT
                </button>
            </form>
        </>
    )
}

export default ResetPassword

import React ,{ useState } from 'react'
// import Firebase from '../firebase/firebase'

function Login() {
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')

    function onChange(event){
        setEmail({ [event.target.name]: event.target.value });
        setPassword({ [event.target.name]: event.target.value });
      };
    return (
        <>
            <form>
                <input
                    name="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">
                    Log In
        </button>
            </form>
        </>
    )
}

export default Login
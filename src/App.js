import React from 'react';
/* import Hero from './components/hero/hero'; */
import NavBar from './components/navBar/navBar';
import * as firebase from 'firebase';
import config from './components/firebase/firebase';
import Register from './components/register/register';
import Login from './components/login/Login'


function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  firebase.auth().onAuthStateChanged(user => {
    console.log(user) // Check if user is logged in
  })
  return (
    <>
     {/* <Hero /> */}
     <NavBar />
     <Register />
     <Login />
     <button onClick={ () => firebase.auth().signOut() }>sign out</button>
    </>
  );
}

export default App;

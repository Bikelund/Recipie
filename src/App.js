import React from 'react';
import Login from './components/login/Login';
import * as firebase from 'firebase';

function App() {
  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };
  
  // function Firebase(){
     firebase.initializeApp(config);
  
      // const projectObject = document.getElementById('name');
      const dbRefObject = firebase.database().ref().child('users')
      // console.log(dbRefObject)
  
      dbRefObject.on('value', snap => console.log(snap.val()))
  
  // }
  return (
    <div className="App">
     Recipie
     <Login />
    </div>
  );
}

export default App;

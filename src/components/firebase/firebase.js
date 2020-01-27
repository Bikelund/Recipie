import App from '../../App';
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

function Firebase(){
    App.initializeApp(config);

    const projectObject = document.getElementById('name');
    console.log(projectObject)
    const dbRefObject = firebase.database().ref().child('users')

    dbRefObject.on('value', snap => console.log(snap.val()))

}
export default Firebase;
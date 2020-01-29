import React from 'react';
import firebase from 'firebase';

function Recipes() {

    /* const dbRef = firebase.firestore().collection('users');

    dbRef.get().then(function(doc) {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    }); */

    firebase.firestore().collection('users').doc('test')
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });

    /* firebase.auth().onAuthStateChanged(user => {
        firebase.firestore().collection('users').doc(user.uid).collection('recipes').get({
            title: title,
            category: category,
            servings: servings
        })
    }) */

    /* firebase.auth().onAuthStateChanged(user => {

        firebase.firestore().collection('users').doc(user.uid).collection('recipes').get().then((snapshot) => {
            snapshot.docs.forEach(e => {
                 console.log(e.data().title);
            })
        })
    }) */

    return (
        <>
        <h1>All recipes</h1>
        </>
    )
};

export default Recipes;
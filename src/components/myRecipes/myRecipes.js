import React from 'react';
import firebase from 'firebase';

function MyRecipes() {

//     await firebase.firestore()
//   .collection('/recipie')
//   .doc(user.uid)
//   .get()
//   .then(function(doc) {
//     if (doc.exists) {
//       // do something
//       // doc.data() でデータを取得
//     } else {
//       console.log("No user");
//     }
//   })
//   .catch(function(error) {
//     console.log("Error : ", error);
//   })
firebase.auth().onAuthStateChanged(user => {

    firebase.firestore().collection('users').doc('recipes').get().then((snapshot) => {
        snapshot.docs.forEach(e => {
             console.log(e.data().category)
        })
    })
})
    return (
        <>
            <h1>My Recipes</h1>

        </>
    )
}

export default MyRecipes
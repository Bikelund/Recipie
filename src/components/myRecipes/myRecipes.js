import React from 'react';
import firebase from 'firebase';

function MyRecipes() {
    firebase.firestore().collection('recipie').get().then((snapshot) => {
        snapshot.docs.forEach(e => (
            <>
                <h2>{e.data().title}</h2>
            </>
        ))
    })
    return (
        <>
            <h1>My Recipes</h1>

        </>
    )
}

export default MyRecipes
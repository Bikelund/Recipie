import React, { useEffect } from 'react';
import firebase from 'firebase';

function MyRecipes() {
    const recipes = [];

    useEffect(() => {
         firebase.auth().onAuthStateChanged(user => {
            firebase.firestore().collection('users').doc(user.uid).collection('recipes').get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            recipes.push(doc.data())
                        } else {
                            console.log("No such document!");
                        }
                    });
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
        })
    },[])
    
    return (
        <>
            <h1>My Recipes</h1>
            {console.log(recipes)}
        </>
    )
}

export default MyRecipes
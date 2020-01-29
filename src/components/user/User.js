import React, { useState, useEffect } from 'react';
import Login from '../login/Login';
import CreateRecipe from '../createRecipe/createRecipe';
import MyRecipes from '../myRecipes/myRecipes';
import firebase from '../firebase/firebase';

function User() {
    const [isUserloggedIn, setIsUserLoggedIn] = useState(false)
    const [createRecipeIsShown, setCreateRecipeIsShown] = useState(false)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setIsUserLoggedIn(true)
            }
            else {
                setIsUserLoggedIn(false)
            }
        })
    })

    return (
        <>{createRecipeIsShown ? <CreateRecipe /> :
            isUserloggedIn ?
                <>
                    <MyRecipes />
                    <button onClick={() => firebase.auth().signOut()}>LOG OUT</button>
                    <button onClick={() => { setCreateRecipeIsShown(true) }}>Create Recipe</button>
                </>
                : <Login />
        }


        </>
    )
}

export default User
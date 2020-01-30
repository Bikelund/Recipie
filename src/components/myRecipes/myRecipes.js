import React, { useState,useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getUserRecipes } from '../../server/api'


function MyRecipes() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
         firebase.auth().onAuthStateChanged(async(user) => {
            const userRecipes = await getUserRecipes(user.uid);
            setRecipes(userRecipes)
        })
    },[])
    
    return (
        <>
            <h1>My Recipes</h1>
    {recipes.map(e => <h2>{e.title}</h2>)}
        </>
    )
}

export default MyRecipes
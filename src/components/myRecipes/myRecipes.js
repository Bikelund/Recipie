import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getUserRecipes } from '../../server/api'


function MyRecipes() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userRecipes = await getUserRecipes(user.uid);
                setRecipes(userRecipes)
            }
            else {
                return
            }
        })
    }, [])

    function seeRecipe(recipe) {
        console.log(recipe)
    }

    return (
        <>
            <h1>My Recipes</h1>
            <div className='recipes'>
                {recipes.length === 0 ? <div>There is no recipe</div> : Object.keys(recipes).map((i, key) => (
                    <div className='recipes__recipe' key={key} onClick={() => seeRecipe(recipes[key])}>
                        <h2 className='recipes__recipe__title' >{recipes[i].title}</h2>
                        <img className='recipes__recipe__image' src='https://i.picsum.photos/id/44/288/120.jpg' alt={recipes[i].title}></img>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MyRecipes
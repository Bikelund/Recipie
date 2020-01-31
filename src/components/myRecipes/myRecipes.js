import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getUserRecipes } from '../../server/api';
import Recipe from '../recipe/recipe';


function MyRecipes() {
    const [recipes, setRecipes] = useState([])
    const [recipe, setrecipe] = useState([])
    const [showRecipeList, setshowRecipeList] = useState(true)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userRecipes = await getUserRecipes(user.uid);
                console.log(userRecipes)
                setRecipes(userRecipes)
            }
            else {
                return
            }
        })
    }, [])

    function seeRecipe(recipe) {
        setrecipe(recipe)
    }

    return (
        <>{showRecipeList? <>

            <h1>My Recipes</h1>
            <div className='recipes'>
                {recipes.length === 0 ? <div>There is no recipe</div> : Object.keys(recipes).map((i, key) => (
                    <div className='recipes__recipe' key={key} onClick={() => {seeRecipe(recipes[i]); setshowRecipeList(false)}}>
                        <h2 className='recipes__recipe__title' >{recipes[i].title}</h2>
                        <img className='recipes__recipe__image' src={recipes[i].imageUrl} alt={recipes[i].title}></img>
                    </div>
                ))}
            </div>
            </> : <Recipe recipe={recipe}/>
            }
        </>
    )
}

export default MyRecipes
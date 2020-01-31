import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getUserRecipes } from '../../server/api';
import Recipe from '../recipe/recipe';


function MyRecipes() {
    const [recipes, setRecipes] = useState([]) //All my recipe lists state
    const [recipe, setrecipe] = useState([]) //One recipe state which was clicked 
    const [showRecipeList, setshowRecipeList] = useState(true) //Check if my recipe list is shown

    //Data fetching after render
    useEffect(() => {
        //Check if user is logged in
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userRecipes = await getUserRecipes(user.uid); //Fetching user recipe lists from firestore data base
                setRecipes(userRecipes) //Set data to recipes state
            }
            else {
                return
            }
        })
    }, []) //Passing empty array because we want to run an effect only once

    /**
   *
   * @param recipe object of recipe data which was clicked
   */
    function seeRecipe(recipe) {
        setrecipe(recipe)
    }

    return (
        //If my recipe list is true then show myRecipe component. Otherwise show <Recipe /> component
        <>{showRecipeList? <>
            <h1>My Recipes</h1>
            <div className='recipes'>
                {recipes.length === 0 ? <div>There is no recipe</div> 
                  : Object.keys(recipes).map((i, key) => (
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
import React, { useState, useEffect } from 'react';
import { getAllUserRecipes } from '../../server/api';
import Recipe from '../recipe/recipe';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]) //All recipes lists state
    const [recipe, setrecipe] = useState([]) //One recipe state which was clicked 
    const [showRecipeList, setshowRecipeList] = useState(true)

    //Data fetching after render
    useEffect(() => {
        //Check if user is logged in
        async function fetchData() {
            const allUserRecipes = await getAllUserRecipes(); //Fetching user recipe lists from firestore data base
            setRecipes(allUserRecipes) //Set data to recipes state
        }
        fetchData();
      }, []) //Passing empty array because we want to run an effect only once

    /**
    *
    * @param recipe object of recipe data which was clicked
    */
    function seeRecipe(recipe) {
        setrecipe(recipe)
    }
    
    return (
        <>
        {showRecipeList ? 
            <>
            <div className='recipes'>
                <h1>All Recipes</h1>
                {recipes.length === 0 ? <div>There are no recipes here</div>
                    : Object.keys(recipes).map((i, key) => (
                        <div className='recipes__recipe' key={key} onClick={() => {seeRecipe(recipes[i]); setshowRecipeList(false)}}>
                            <h2 className='recipes__recipe__title'>{recipes[i].title}</h2>
                            <div className="recipes__recipe__image" style={{backgroundImage: `url(${recipes[i].imageUrl})`}}></div>
                        </div>  
                    ))}
            </div>
            </> : <Recipe recipe={recipe} />
        }
        </>
    )
}

export default AllRecipes
import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getAllUserRecipes } from '../../server/api';

function AllRecipes() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function fetchData() {
            const allUserRecipes = await getAllUserRecipes();
            setRecipes(allUserRecipes)
        }
        fetchData();
      }, []);

      function goToRecipe() {
            console.log('Its alive!');
      }
    
    return (
        <>
        <div className='recipes'>
            <h1>All recipes</h1>
            {recipes.map((recipe,key) =>
                <div className='recipes__recipe' key={key} onClick={() => goToRecipe()}>
                    {console.log(key)}
                    <h2 className='recipes__recipe__title'>{recipe.title}</h2>
                    <img className='recipes__recipe__image' src='https://i.picsum.photos/id/44/288/120.jpg' alt={recipe.title}></img>
                </div>  
            )}
        </div>
        </>
    )
}

export default AllRecipes
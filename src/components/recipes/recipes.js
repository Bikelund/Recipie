import React, { useState, useEffect } from 'react';
import { getAllUserRecipes } from '../../server/api';
import { useHistory } from 'react-router-dom';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]) //All recipes lists state
    const history = useHistory()

    //Data fetching after render
    useEffect(() => {
        //Check if user is logged in
        async function fetchData() {
            const allUserRecipes = await getAllUserRecipes(); //Fetching user recipe lists from firestore data base
            setRecipes(allUserRecipes) //Set data to recipes state
        }
        fetchData();
    }, []) //Passing empty array because we want to run an effect only once


    return (
        <>
            {/* {
        showRecipeList ? 
            <> */}
            <div className='recipes'>
                <h1>All Recipes</h1>
                {recipes.length === 0 ? ''
                    : Object.keys(recipes).map((i, key) => (
                        <div className='recipes__recipe' key={key} onClick={() => {history.push({
                            pathname: '/recipe',
                            state : recipes[i]
                        })}}>
                            <h2 className='recipes__recipe__title'>{recipes[i].title}</h2>
                            <div className="recipes__recipe__image" style={{backgroundImage: `url(${recipes[i].imageUrl})`}}></div>
                        </div>  
                    ))}
            </div>
            {/* </> : <Recipe recipe={recipe} />
        } */}
        </>
    )
}

export default AllRecipes
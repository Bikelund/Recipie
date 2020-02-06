import React, { useState, useEffect } from 'react';
import { getAllUserRecipes } from '../../server/api';
import { useHistory } from 'react-router-dom';
import Loading from '../loading/Loading';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]) //All recipes lists state
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    //Data fetching after render
    useEffect(() => {
        setIsLoading(true)
        //Check if user is logged in
        async function fetchData() {
            const allUserRecipes = await getAllUserRecipes(); //Fetching user recipe lists from firestore data base
            setRecipes(allUserRecipes) //Set data to recipes state
            setIsLoading(false)
        }
        fetchData();
    }, []) //Passing empty array because we want to run an effect only once


    return (
        <>
            {isLoading ?
                <Loading /> :
                <>
                    <div className='recipes'>
                        <h1>All Recipes</h1>
                        {/* This renders all recipes for every user */}
                        {recipes.length === 0 ? ''
                            : Object.keys(recipes).map((i, key) => (
                                <div className='recipes__recipe' key={key} onClick={() => {
                                    history.push({
                                        pathname: '/recipe',
                                        state: recipes[i]
                                    })
                                }}>
                                    <h2 className='recipes__recipe__title'>{recipes[i].title}</h2>
                                    <div className="recipes__recipe__image" style={{ backgroundImage: `url(${recipes[i].imageUrl})` }}></div>
                                </div>
                            ))}
                    </div>
                </>
            }
        </>
    )
}

export default AllRecipes
import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getUserRecipes } from '../../server/api';
import { useHistory } from "react-router-dom";
import Loading from '../loading/Loading';

function MyRecipes() {
    const [recipes, setRecipes] = useState([]) //All my recipe lists state
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    //Data fetching after render
    useEffect(() => {
        setIsLoading(true)
        //Check if user is logged in
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                await getUserRecipes(user.uid)//Fetching user recipe lists from firestore data base
                .then((response)=>{
                    setRecipes(response) //Set data to recipes state
    
                }).then(() => {
                    setIsLoading(false)
                })
            }
            else {
                return
            }
        })
    }, []) //Passing empty array because we want to run an effect only once

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    <div className="myRecipes">
                        <h1>My Recipes</h1>
                        <button className="myRecipes__btn__log-out myRecipes__btn fontAwesome" onClick={() => { firebase.auth().signOut(); history.push('/login') }}>&#xf0a5; Log out</button>
                        <button className="myRecipes__btn__create-recipe myRecipes__btn fontAwesome" onClick={() => { history.push('/createRecipe') }}>Create Recipe &#xf044;</button>
                        <div className='myRecipes__recipes__list'>
                            {recipes.length === 0 ?
                                // Returns a message if the recipe list is empty
                                <div className="myRecipes__empty">Your cookbook is empty. Click on the button to create a new one.</div>
                                : Object.keys(recipes).map((i, key) => (
                                    <div className='recipes__recipe' key={key} onClick={() => {
                                        history.push({
                                            pathname: '/recipe',
                                            state: recipes[i]
                                        })
                                    }}>
                                        <h2 className='recipes__recipe__title' >{recipes[i].title}</h2>
                                        <div className="recipes__recipe__image" style={{ backgroundImage: `url(${recipes[i].imageUrl})` }}></div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MyRecipes
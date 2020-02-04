import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { getUserRecipes } from '../../server/api';
import { useHistory } from "react-router-dom";




function MyRecipes() {
    const [recipes, setRecipes] = useState([]) //All my recipe lists state
    const history = useHistory();


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


    return (
        <>
                <div className="myRecipes">
                    <h1>My Recipes</h1>
                    <button className="myRecipes__btn__log-out myRecipes__btn fontAwesome" onClick={() => {firebase.auth().signOut(); history.push('/login')}}>&#xf0a5; Log out</button>
                    <button className="myRecipes__btn__create-recipe myRecipes__btn fontAwesome" onClick={() => { history.push('/createRecipe') }}>Create Recipe &#xf044;</button>
                    <div className='recipes'>
                        {recipes.length === 0 ? <div>There is no recipe</div>
                            : Object.keys(recipes).map((i, key) => (
                                <div className='recipes__recipe' key={key} onClick={() => { history.push({
                                    pathname: '/recipe',
                                    state : recipes[i]
                                })}}>
                                    <h2 className='recipes__recipe__title' >{recipes[i].title}</h2>
                                    <div className="recipes__recipe__image" style={{backgroundImage: `url(${recipes[i].imageUrl})`}}></div>
                                </div>
                            ))}
                    </div>
                </div>
        </>
    )
}

export default MyRecipes
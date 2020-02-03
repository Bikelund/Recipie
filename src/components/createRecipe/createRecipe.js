import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { v4 as uuid } from 'uuid';
import MyRecipes from '../myRecipes/myRecipes';

function CreateRecipe() {
    const [backToPage, setBackToPage] = useState(false)
    const [title, setTitle] = useState('')
    const [servings, setServings] = useState('')
    const [category, setCategory] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [image, setImage] = useState('')

    function addIngredientsField() {
        setIngredients([...ingredients])
    }

    function handleChange(e, index) {
        ingredients[index] = e.target.value

        //Set tha changed state
        setIngredients(ingredients)
       console.log(ingredients)
    }

    function handleSubmit(event) {
        event.preventDefault()
        firebase.auth().onAuthStateChanged(user => {  //Check if user is logged in
            const firestoreRef = firebase.firestore().collection('users').doc(user.uid).collection('recipes'); //Create a firestore and child reference 
            const filename = image.name; //Get image name from image state
            const ext = filename.slice(filename.lastIndexOf("."));
            const storageRef = firebase.storage().ref('recipes').child(uuid() + "." + ext); //Create a storage and recipes reference. uuid() is generator to make unique key in every image

            storageRef.put(image) //File uploaded
                .then(() => {
                    return storageRef.getDownloadURL(); //To get image url
                })
                .then((downloadUrl) => {
                    //Add recipe data to firestore
                    firestoreRef.add({
                        title: title,
                        category: category,
                        servings: servings,
                        imageUrl: downloadUrl
                    })
                })
                .then(() => {
                    console.log('Recipe Created');
                })
                .catch((error) => {
                    console.error("error: " + error);
                });

        })
    }


    return (
        <>{backToPage ?
            <MyRecipes /> :
            <>
                <div onClick={() => setBackToPage(true)} className="arrow"></div>
                <div className="create__recipe__title">Create Recipe</div>
                <form className="create__recipe__form" onSubmit={handleSubmit}>
                    <div className="create__recipe__form__input">
                        <label htmlFor="title">
                            <div className="create__recipe__form__input__title">Title</div>
                            <input
                                name="title"
                                id="title"
                                className="create__recipe__form__input__text"
                                value={title}
                                type="text"
                                placeholder="Tomato pasta"
                                onChange={e => setTitle(e.target.value)}
                            /><br />
                        </label>
                        <label htmlFor="category">
                            <div className="create__recipe__form__input__title">Category</div>
                            {/* Nicklas */}
                            <select 
                            name="category" 
                            id="category" 
                            className="create__recipe__form__category"
                            onChange={e => setServings(e.target.value)}>
                                <option value="Brunch">Brunch</option>
                                <option value="Buffé">Buffé</option>
                                <option value="Efterrätt">Efterrätt</option>
                                <option value="Fika">Fika</option>
                                <option value="Frukost">Frukost</option>
                                <option value="Förrätt">Förrätt</option>
                                <option value="Huvudrätt">Huvudrätt</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Mellanmål">Mellanmål</option>
                                <option value="Middag">Middag</option>
                            </select>
                        </label>
                        {/* Nicklas slut */}
                        <label htmlFor="servings">
                            <div className="create__recipe__form__input__title">Servings</div>
                            <select 
                            name="servings" 
                            id="servings" 
                            className="create__recipe__form__select"
                            onChange={e => setServings(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2" selected>2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </label>
                        <div className="create__recipe__form__input__title">Ingredients</div>
                        {ingredients.map((item,index) => {
                            return (
                                <input
                                    name="ingredients"
                                    className="create__recipe__form__input__text"
                                    value={item}
                                    type="ingredients"
                                    placeholder="500g Tomato can"
                                    onChange={e => handleChange(e, index)}
                                />
                            )
                        })}
                        {/* <input
                                name="ingredients"
                                id="ingredients"
                                className="create__recipe__form__input__text"
                                value={ingredients}
                                type="ingredients"
                                placeholder="500g Tomato can"
                                onChange={e => setIngredients(e.target.value)}
                            /><br /> */}
                        <div onClick={addIngredientsField}>Add</div>
                        <label className="create__recipe__form__input__image__title" htmlFor="file_upload">Image
                        <div className="create__recipe__form__input__image__box"><div className="fontAwesome create__recipe__form__input__image__icon">&#xf1c5;</div></div>
                            <input id="file_upload" className="create__recipe__form__input__image" type="file" name="pic" onChange={e => setImage(e.target.files[0])} />
                        </label>
                    </div>
                    <button className="create__recipe__form__button" type="submit">
                        ADD RECEPT
                    </button>
                </form>
            </>
        }
        </>
    )
}

export default CreateRecipe
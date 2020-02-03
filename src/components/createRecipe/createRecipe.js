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
    const ingredientsPlaceholder = ['500g tomato can', '150g penne', '1/2 eggplant', '1 garlic clove', 'cheese'] // Default placeholder value


    function addIngredientsField() {

    }


    function setIngredientsChange (e, index) {
        ingredients[index] = e.target.value
        console.log(index)
        setIngredients(ingredients)

    }
    // function setIngredientsChange(e) {
    //     console.log(e.target.name)
    //     // ingredients[index] = e.target.value

    //     //Set tha changed state
    //     setIngredients(ingredients)
    //     console.log(ingredients)
    // }

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
                            <input
                                name="category"
                                id="category"
                                className="create__recipe__form__input__text"
                                value={category}
                                type="category"
                                placeholder="Pasta"
                                onChange={e => setCategory(e.target.value)}
                            /><br />
                        </label>
                        {/* Nicklas slut */}
                        <label htmlFor="servings">
                            <div className="create__recipe__form__input__title">Servings</div>
                            <input
                                name="servings"
                                id="servings"
                                className="create__recipe__form__input__text"
                                value={servings}
                                type="servings"
                                placeholder="2"
                                onChange={e => setServings(e.target.value)}
                            /><br />
                        </label>
                        <div className="create__recipe__form__input__title">Ingredients</div>
                        {ingredientsPlaceholder.map((placeholder, index) => {
                            return (
                                <input
                                    name="ingredients"
                                    key={index}
                                    id={index}
                                    className="create__recipe__form__input__text"
                                    value={ingredients}
                                    type="ingredients"
                                    placeholder={placeholder}
                                    onChange={e => setIngredients(e.target.value)}
                                />
                            )
                        })}
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
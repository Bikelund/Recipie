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
    const [image, setImage] = useState('')

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
                        <label for="title">
                            <div className="create__recipe__form__input__title">title</div>
                            <input
                                name="title"
                                id="title"
                                className="create__recipe__form__input__text"
                                value={title}
                                type="text"
                                placeholder="title"
                                onChange={e => setTitle(e.target.value)}
                            /><br />
                        </label>
                        <label for="category">
                        <div className="create__recipe__form__input__title">category</div>
                            <input
                                name="category"
                                id="category"
                                className="create__recipe__form__input__text"
                                value={category}
                                type="category"
                                placeholder="category"
                                onChange={e => setCategory(e.target.value)}
                            /><br />
                        </label>
                        <label for="servings">
                        <div className="create__recipe__form__input__title">servings</div>
                            <input
                                name="servings"
                                className="create__recipe__form__input__text"
                                value={servings}
                                type="servings"
                                placeholder="servings"
                                onChange={e => setServings(e.target.value)}
                            /><br />
                        </label>
                        <label className="create__recipe__form__input__image__title" for="file_upload">Image
                        <div className="create__recipe__form__input__image__icon"></div>
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
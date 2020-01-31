import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import { firestore } from 'firebase';

function CreateRecipe() {
    const [title, setTitle] = useState('')
    const [servings, setServings] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        console.log(image)

        const dbRef = firebase.database().ref('recipes').push();
        const key = dbRef.key;
        console.log(key);
        const filename = image.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        const storageRef = firebase.storage().ref('recipes').child(key + "." + ext);

        storageRef.put(image)
                .then(() => {
                    //File uploaded
                    return storageRef.getDownloadURL();
                })
                .then((downloadUrl) => {
                    const recipePayLoad = {
                        id: key,
                        imageUrl: downloadUrl
                    };
                    // commit('createNewRecipe', recipePayLoad);
                    return dbRef.set(recipePayLoad);
                })
                .then(() => {
                    console.log('Recipe Created');
                })
                .catch((error) => {
                    console.error("error: " + error);
                });

        /* firebase.auth().onAuthStateChanged(user => {
            firebase.storage().ref(`recipes/${image.name}`).put(image).on(
              snapshot => {
                console.log(snapshot)
              })
            firebase.firestore().collection('users').doc(user.uid).collection('recipes').add({
                title: title,
                category: category,
                servings: servings
            })
        }) */



    }


    return (
        <>

            <div>Create Recipe</div>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={title}
                    type="text"
                    placeholder="title"
                    onChange={e => setTitle(e.target.value)}
                /><br />
                <input
                    name="category"
                    value={category}
                    type="category"
                    placeholder="category"
                    onChange={e => setCategory(e.target.value)}
                /><br />
                <input
                    name="servings"
                    value={servings}
                    type="servings"
                    placeholder="servings"
                    onChange={e => setServings(e.target.value)}
                /><br />
                    <input type="file" name="pic" onChange={e => setImage(e.target.files[0])}/>
                <button type="submit">
                    ADD RECEPT
                </button>
            </form>
        </>
    )
}

export default CreateRecipe
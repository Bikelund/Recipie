import React, { useState } from 'react';
import firebase from '../firebase/firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { v4 as uuid } from 'uuid';

function CreateRecipe() {
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
        const storageRef = firebase.storage().ref('recipes').child(uuid() + "." + ext); //Create a storage and recipes reference. uuid() is generator to make unique name in every image

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
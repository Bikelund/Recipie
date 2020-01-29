import React, { useState } from 'react';
// import firebase from '../firebase/firebase';

function CreateRecipe() {
    const [title, setTitle] = useState('')
    const [servings, setServings] = useState('')
    const [category, setCategory] = useState('')


    function handleSubmit(event) {
        event.preventDefault();


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
                <button type="submit">
                    ADD RECEPT
                </button>
            </form>
        </>
    )
}

export default CreateRecipe
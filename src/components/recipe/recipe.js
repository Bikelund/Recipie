import React from 'react';
/* import * as firebase from 'firebase'; */

function Recipe() {
    return (
        <>
        <div className="recipe">
            <div className="recipe__title">
                <h2>"Title of the recipe"</h2>

                <div className="button__container">
                    <button className="button__container--button-left">&#60;&#60; Ingredients</button>
                    <button className="button__container--button-right">How to cook &#62;&#62;</button>
                </div>
            </div>
            <div className="recipe__ingredients">
                <h3>Ingredients</h3>

            </div>
            <div className="recipe__how-to-cook">
                <h3>How to cook</h3>

            </div>
        </div>
        </>
    )
}

export default Recipe;
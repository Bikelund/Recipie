import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase/firebase';

function Recipe( props ) {
  const recipe = props.history.location.state //Get data through <Route render={...props} /> from myRecipes.js or recipes.js
  const history = useHistory()
  const [isUserloggedIn, setIsUserLoggedIn] = useState(false)
  const [editRecipe, seteditRecipe] = useState(false)

  useEffect(() => {
    const imageBG = document.getElementsByClassName('parallax-bg');
    imageBG[0].style.background = `url(${recipe.imageUrl})`;
    imageBG[0].style.backgroundSize = 'cover';
    imageBG[0].style.backgroundPosition = 'center center';
  }, [])

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsUserLoggedIn(true)
    }
    if (user.uid == recipe.userId) {
      seteditRecipe(true)
    }

  })
  

  // Parameters for Swiper
  const params = {
    initialSlide: 1, // Starting slide index
    speed: 600,
    parallax: true,
    parallaxEl: {
      el: '.parallax-bg',
      value: '-23%'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  return (
      <>
      <Swiper {...params}>
        {/* Slide Ingredients */}
        <div className="recipe__ingredients">
          <div className="container">
            <div className="container__blur"></div>
            <h2 className="container__h2">Ingredients</h2>
          </div>
          <div className="container">
            <div className="container__blur__list"></div>
            <ul className="recipe__ingredients__ul">
              { 
                !recipe.ingredients === true ? <li className="recipe__ingredients__ul__li">You have all you need</li>
                :recipe.ingredients.map((item, key) => <li data-swiper-parallax={"-" + key + "0"} key={key} className="recipe__ingredients__ul__li">{item}</li>)
                // data-swiper-parallax creates a fade in delay 
              }
            </ul>
          </div>

          <div className="button__container button__container--left fontAwesome">
            <p>Back &#xf105;</p>
          </div>

        </div>

        {/* Slide Title */}
        <div className="recipe__title" data-initial-slide="1"> {/* Makes this the initial slide */}
          <div className="container">
              <div className="container__blur"></div>
            <h1 className="container__h1">{recipe.title}</h1>
          </div>
          <div onClick={() => history.goBack()} className="arrow fontAwesome"></div>
          {editRecipe ? <button className="recipe__edit" onClick={() => history.push({
             pathname: '/editRecipe',
             state: recipe
          })}>Edit</button> : ""}
          <div className="button__container fontAwesome">
            <p>&#xf104; Ingredients</p>
            <p>How to cook &#xf105;</p>
          </div>
        </div>

        {/* Slide How to cook */}
        <div className="recipe__how-to-cook">
          <div className="container">
              <div className="container__blur"></div>
            <h2 className="container__h2">How to cook</h2>
          </div>
          <div className="container">
            <div className="container__blur__list"></div>
            <ol className="recipe__how-to-cook__ol">
              { 
                !recipe.directions === true ? <li className="recipe__how-to-cook__ol__li">Just eat it</li>
                :recipe.directions.map((item, key) => <li data-swiper-parallax={"-" + key + "0"} key={key} className="recipe__how-to-cook__ol__li">{item}</li>)
                // data-swiper-parallax creates a fade in delay      
              }
            </ol>
          </div>

          <div className="button__container button__container--right fontAwesome">
            <p>&#xf104; Back</p>
          </div>

        </div>
      </Swiper>
    </>
  )
};

export default Recipe;
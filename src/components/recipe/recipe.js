import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import { useHistory } from 'react-router-dom';

function Recipe( props ) {
  console.log(props)
  const recipe = props.history.location.state //Get data through <Route render={...props} /> from myRecipes.js or recipes.js
  console.log(recipe)
  const history = useHistory()

  const style = {
    backgroundImage: `url(${recipe.imageUrl})`
  }

  // Parameters for Swiper
  const params = {
    initialSlide: 1, // Starting slide index
    speed: 600,
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
          <div className="bgImg" style={style}></div>
          <button className="recipe__edit" onClick={() => history.push({
             pathname: '/editRecipe',
             state: recipe
          })}>Edit</button>
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
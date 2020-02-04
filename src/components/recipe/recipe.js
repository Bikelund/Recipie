import React, { useState } from 'react';
import MyRecipes from '../myRecipes/myRecipes';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

function Recipe({ recipe }) {
  const [backToPage, setBackToPage] = useState(false)
  const style = {
    backgroundImage: `url(${recipe.imageUrl})`
  }

  // Parameters for Swiper
  const params = {
    initialSlide: 1, /* Starting slide index */
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
    <>{backToPage ?
      <MyRecipes /> :
      <>
      <Swiper {...params}>
        {/* Slide Ingredients */}
        <div className="recipe__ingredients">
          <h2>Ingredients</h2>
          <ul className="recipe__ingredients__ul">
            { 
              !recipe.ingredients === true ? <li className="recipe__ingredients__ul__li">You have all you need</li>
              :recipe.ingredients.map((item, key) => <li data-swiper-parallax={"-" + key + "0"} key={key} className="recipe__ingredients__ul__li">{item}</li>)
              // data-swiper-parallax creates a fade in delay 
            }
          </ul>

          <div className="button__container button__container--left fontAwesome">
            <p>Back &#xf105;</p>
          </div>

        </div>

        {/* Slide Title */}
        <div className="recipe__title" data-initial-slide="1"> {/* Makes this the initial slide */}
          <h1>{recipe.title}</h1>
          <div onClick={() => setBackToPage(true)} className="arrowBack fontAwesome">
            <p>Go back to my recipes</p>
          </div>
          <div className="bgImg" style={style}></div>
          <div className="button__container fontAwesome">
            <p>&#xf104; Ingredients</p>
            <p>How to cook &#xf105;</p>
          </div>
        </div>

        {/* Slide How to cook */}
        <div className="recipe__how-to-cook">
          <h2>How to cook</h2>
          <ol className="recipe__how-to-cook__ol">
            { 
              !recipe.directions === true ? <li className="recipe__how-to-cook__ol__li">Just eat it</li>
              :recipe.directions.map((item, key) => <li data-swiper-parallax={"-" + key + "0"} key={key} className="recipe__how-to-cook__ol__li">{item}</li>)
              // data-swiper-parallax creates a fade in delay      
            }
          </ol>

          <div className="button__container button__container--right fontAwesome">
            <p>&#xf104; Back</p>
          </div>

        </div>
      </Swiper>
      </>
    }
    </>
  )
};

export default Recipe;
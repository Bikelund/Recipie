import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

function Recipe({ recipe }) {

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
    <Swiper {...params}>
      {/* Slide Ingredients */}
      <div className="recipe__ingredients">
        <h2>Ingredients</h2>
        <ul className="recipe__ingredients__ul">
          {/* data-swiper-parallax creates a fade in delay */}
          <li data-swiper-parallax="0"    className="recipe__ingredients__ul__li">Ingredient One</li>
          <li data-swiper-parallax="-100" className="recipe__ingredients__ul__li">Ingredient Two</li>
          <li data-swiper-parallax="-200" className="recipe__ingredients__ul__li">Ingredient Three</li>
          <li data-swiper-parallax="-300" className="recipe__ingredients__ul__li">Ingredient Four</li>
          <li data-swiper-parallax="-400" className="recipe__ingredients__ul__li">Ingredient Five</li>
        </ul>

        <div className="button__container button__container--left fontAwesome">
          <p>Back &#xf105;</p>
        </div>

      </div>

      {/* Slide Title */}
      <div className="recipe__title" data-initial-slide="1"> {/* Makes this the initial slide */}
        <h1>{recipe.title}</h1>
        <div className="bgImg">
          <img src={recipe.imageUrl} alt="Recipe Image"></img>
        </div>
        <div className="button__container fontAwesome">
          <p>&#xf104; Ingredients</p>
          <p>How to cook &#xf105;</p>
        </div>
      </div>

      {/* Slide How to cook */}
      <div className="recipe__how-to-cook">
        <h2>How to cook</h2>

        <div className="button__container button__container--right fontAwesome">
          <p>&#xf104; Back</p>
        </div>

      </div>
    </Swiper>
  )
};

export default Recipe;
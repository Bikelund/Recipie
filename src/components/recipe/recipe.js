import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
/* import * as firebase from 'firebase'; */

function Recipe() {

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
                <h3>Ingredients</h3>
                <ul>
                  {/* data-swiper-parallax creates a fade in delay */}
                  <li data-swiper-parallax="100">Ingredient One</li>
                  <li data-swiper-parallax="0">Ingredient Two</li>
                  <li data-swiper-parallax="-100">Ingredient Three</li>
                  <li data-swiper-parallax="-200">Ingredient Four</li>
                  <li data-swiper-parallax="-300">Ingredient Five</li>
                </ul>

                <div className="button__container button__container--left">
                  <p>Höger</p>
                </div>

            </div>

            {/* Slide Title */}
            <div className="recipe__title" data-initial-slide="1"> {/* Makes this the initial slide */}
                <h2>"Title of the recipe"</h2>

                <div className="button__container">
                  <p>Vänster</p>
                  <p>Höger</p>
                </div>
            </div>

            {/* Slide How to cook */}
            <div className="recipe__how-to-cook">
                <h3>How to cook</h3>

                <div className="button__container button__container--right">
                  <p>Vänster</p>
                </div>

            </div>
        </Swiper>
    )
};

export default Recipe;
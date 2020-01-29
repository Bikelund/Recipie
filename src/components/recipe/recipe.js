import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

function Recipe() {

    const params = {
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
            <div className="recipe__ingredients">
                <h3>Ingredients</h3>

            </div>
            <div className="recipe__title">
                <h2 data-swiper-parallax="-300">"Title of the recipe"</h2>
                <p data-swiper-parallax="-200">"Title of the recipe"</p>
                <p data-swiper-parallax="-100">"Title of the recipe"</p>

                {/* <div className="button__container">
                    <button className="button__container--button-left">&#60;&#60; Ingredients</button>
                    <button className="button__container--button-right">How to cook &#62;&#62;</button>
                </div> */}
            </div>
            <div className="recipe__how-to-cook">
                <h3>How to cook</h3>

            </div>
        </Swiper>
    )
};

export default Recipe;
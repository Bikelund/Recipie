import React from 'react';

function Search() {
    return (
        <div className="search">
            <h1 className="search__title">Search</h1>
            <form className="search__form">
                <div className="search__form__container">
                    <input
                        name="search"
                        className="search__form__input"
                        type="text"
                        placeholder="Search recipes"
                    />
                    <button className="fontAwesome search__form__button">&#xf002;</button>
                </div>
            </form>

        </div>
    )
}

export default Search
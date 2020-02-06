import React, { useState } from 'react';

function Search() {
    const [searchWord, setSearchWord] = useState('')

    function handleChangeSearchWord(e){
       setSearchWord(e.target.value)
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        console.log(searchWord)
    }

    return (
        <div className="search">
            <h1 className="search__title">Search</h1>
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__form__container">
                    <input
                        name="search"
                        className="search__form__input"
                        type="text"
                        value={searchWord}
                        onChange={e => handleChangeSearchWord(e)}
                        placeholder="Search recipes"
                    />
                    <button className="fontAwesome search__form__button">&#xf002;</button>
                </div>
            </form>

        </div>
    )
}

export default Search
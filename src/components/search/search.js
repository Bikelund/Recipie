import React, { useState } from 'react';

function Search() {
    const [searchWord, setSearchWord] = useState('')
    const [focus, setFocus] = useState(false)
    const [result, setResult] = useState([])
    const [error, setError] = useState(null)

    function handleChangeSearchWord(e) {
        setFocus(true)
        setSearchWord(e.target.value)
    }

    function handleSubmit(event) {
        setSearchWord(searchWord.trim()) //Remove whitespacing
        event.preventDefault()
        if (searchWord.length > 0 && searchWord !== "" && searchWord !== ' ') {
            const search = searchWord.toLowerCase();

        }
        else {
            console.log('Empty')
        }

    }

    function focusElement() {
        setFocus(true)
    };

    function clearSearch() {
        setSearchWord('')
        setFocus(false)
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
                        onClick={() => focusElement()}
                        placeholder="Search recipes"
                    />
                    {focus ? (
                        <span className="search__form__delete__button fontAwesome" onClick={() => clearSearch()}>&#xf00d;</span>
                    ) : ''}
                    <button className="fontAwesome search__form__button">&#xf002;</button>
                </div>
            </form>

        </div>
    )
}

export default Search
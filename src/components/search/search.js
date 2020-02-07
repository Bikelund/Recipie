import React, { useState } from 'react'
import { getAllUserRecipes } from '../../server/api'
import Results from './result'

function Search() {
    const [searchWord, setSearchWord] = useState('')
    const [focus, setFocus] = useState(false)
    const [results, setResults] = useState([])
    const [error, setError] = useState(false)

    function handleChangeSearchWord(e) {
        setFocus(true)
        setError(false)
        setSearchWord(e.target.value)
    }

    /**
     * Search function - Search in 4 categories with filter() method. 
     * 
     * @param {string} word value to search  
     * @param {object} data contains all the recipe data to search 
     */
    function search(word, data) {
        const search = word.toLowerCase();
        //Search in title
        const title = data.filter(items => {
            const title = items.title.toLowerCase()
            return title.includes(search)
        })
        //Search in ingredients
        const ingredients = data.filter(items =>
            items.ingredients !== undefined ? items.ingredients.find(ingredient => ingredient.toLowerCase().includes(search)) : null
        )
        //Search in directions
        const directions = data.filter(items =>
            items.directions !== undefined ? items.directions.find(direction => direction.toLowerCase().includes(search)) : null
        )
        //Search in categories
        const categories = data.filter(items => {
            const category = items.category.toLowerCase()
            return category.includes(search)
        })
        return [...title, ...ingredients, ...directions, ...categories]
    }

    //Remove dublicate values because it can be contains same values in results
    //For example, if there is keyword 'Avocado' in title and ingredients, we will get dublicate values. 
    function removeDublicateValues(values) {
        return values.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    }

    function handleSubmit(event) {
        event.preventDefault()
        setSearchWord(searchWord.trim()) //Remove whitespacing

        if (searchWord.length > 0 && searchWord !== '' && searchWord !== ' ') {
            getAllUserRecipes() //Get all user recipes from firestore
                .then(response => {
                    let result = search(searchWord, response)
                    result = removeDublicateValues(result) //Remove dublicate values if there are dublicate values
                    if (result.length === 0) {
                        setError(true)
                    }
                    setResults(result)
                })
        }
    }

    function focusElement() {
        setFocus(true)
    };

    function clearSearch() {
        setError(false)
        setSearchWord('')
        setFocus(false)
        setResults([])
    }

    return (
        <div className="search">
            <h1 className="search__title">Search</h1>
            {error ? <div className="search__error__message">No matching results. Try a different search</div> : ''}
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
            {results.length > 0 ? <Results results={results} /> : ''}
        </div>
    )
}

export default Search
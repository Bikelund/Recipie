import React from 'react'
import { useHistory } from 'react-router-dom'


function Results(props) {
    const history = useHistory()
    const results = props.history.location.state //Get data through <Route render={...props} /> from myRecipes.js or recipes.js

    return (
        <>
            <div onClick={() => history.goBack()} className="arrow"></div>
            <div className='recipes'>
                <h1 className="search__title">Results</h1>
                {results.length === 0 ? ''
                    : Object.keys(results).map((i, key) => (
                        <div className='recipes__recipe' key={key} onClick={() => {
                            history.push({
                                pathname: '/recipe',
                                state: results[i]
                            })
                        }}>
                            <h2 className='recipes__recipe__title'>{results[i].title}</h2>
                            <div className="recipes__recipe__image" style={{ backgroundImage: `url(${results[i].imageUrl})` }}></div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Results
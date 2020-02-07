import React from 'react'
import { useHistory } from 'react-router-dom'


function Results({ results }) {
    const history = useHistory()

    return (
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
    )
}

export default Results
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../firebase/firebase'
import Loading from '../loading/Loading'

function EditRecipe(props) {
    console.log(props);
    const recipe = props.history.location.state
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [servings, setServings] = useState('')
    const [category, setCategory] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [fields, setFields] = useState([{ value: null }])
    const [directions, setDirections] = useState([])
    const [directionsFields, setDirectionsFields] = useState([{ value: null }])
    const [image, setImage] = useState('')
    const [srcImg, setSrcImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const ingredientsPlaceholder = ['500g tomato can', '150g penne', '1/2 eggplant', '1 garlic clove', 'cheese'] // Default placeholder ingredients value
    const directionsPlaceholder = ['Cut the eggplant', 'Prepare boild water with a pinch of salt added to cook the pasta in...', 'Divide the pasta between 2 serving bowls'] // Default placeholder directions value


    useEffect(() => {
        setTitle(recipe.title)
        setServings(recipe.servings)
        setCategory(recipe.category)
        setIngredients(recipe.ingredients)
        setDirections(recipe.directions)
        setSrcImg(recipe.imageUrl)

    }, [])
    

    //Add ingredients field when user click on Add button
    function addIngredientsField() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    //Add ingredients in array 
    function setIngredientsChange(event, i) {
        const values = [...ingredients];

        //Make first letter uppercase 
        values[i] = event.target.value
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substr(1))
            .join(' ');
        setIngredients(values);
    }

    //Add directions field when user click on Add button
    function addDirectionsField() {
        const values = [...directionsFields];
        values.push({ value: null });
        setDirectionsFields(values);
    }

    //Add directions in array
    function setDirectionsChange(event, i) {
        const values = [...directions];

        //Make first letter uppercase 
        values[i] = event.target.value
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substr(1))
            .join(' ');

        setDirections(values);
        console.log(values)
    }

    //When user chose image, display it on image input field
    function setSrcImage(file) {
        let reader = new FileReader()
        reader.onloadend = () => {
            setSrcImg(reader.result)
        }
        reader.readAsDataURL(file)
    }



    function handleSubmit(event) {
        event.preventDefault()
        // setIsLoading(true)
        console.log(!image)
        // if (image) {
            
        // } else {
        //    firebase.firestore().collection('recipes').doc(recipe.id)
        //     .update({
        //         title: title,
        //         category: category,
        //         servings: servings,
        //         ingredients: ['tomato','mushroom'],
        //         directions: directions,
        //         imageUrl: srcImg,
        //     })
        //     .then(() => {
        //         console.log('Success')
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })

        // }

    }
    
    //Delete recipe by recipe id
    function deleteSubmit() {
        setIsLoading(true)

        //Delete image in storage
       firebase.storage().ref('recipes').child(recipe.storageId).delete().then(function() {
            console.log('success')
        }).catch(function(error) {
            console.log(error)
          });
        //Delete recipe in firestore
        firebase.auth().onAuthStateChanged(user => {  //Check if user is logged in
            firebase.firestore().collection('users').doc(user.uid).collection('recipes')
            .doc(recipe.id).delete().then(function() {
                setIsLoading(false)
                history.push('/myRecipe')
            }).catch(function(error) {
                setErrorMsg(true)
            });
        })
    }



    return (
        <> {isLoading ? <Loading /> :
            <>
                <div onClick={() => history.goBack()} className="arrow"></div>
                <button className="delete__recipe fontAwesome"  onClick={() => deleteSubmit()}>Delete &#xf1f8;</button>
                <div className="create__recipe__title">Edit Recipe</div>
                {/* If delete function failed show error message */}
                {errorMsg? <div className="error__edit__message">Something went to wrong. Please try again</div> : ''} 
                <form className="create__recipe__form" onSubmit={handleSubmit}>
                    <div className="create__recipe__form__input">
                        <label htmlFor="title">
                            <div className="create__recipe__form__input__title">Title</div>
                            <input
                                name="title"
                                id="title"
                                className="create__recipe__form__input__text"
                                value={title}
                                type="text"
                                placeholder="Tomato pasta"
                                onChange={e => setTitle(e.target.value
                                    .toLowerCase() //Make first letter of a string uppercase
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substr(1))
                                    .join(' '))}
                                required
                            />
                        </label>
                        <label htmlFor="category">
                            <div className="create__recipe__form__input__title">Category</div>
                            <select
                                name="category"
                                id="category"
                                defaultValue={category}
                                className="create__recipe__form__category"
                                onChange={e => setCategory(e.target.value)}>
                                <option >-- choose --</option>
                                <option value="Brunch">Brunch</option>
                                <option value="Buffé">Buffé</option>
                                <option value="Efterrätt">Efterrätt</option>
                                <option value="Fika">Fika</option>
                                <option value="Frukost">Frukost</option>
                                <option value="Förrätt">Förrätt</option>
                                <option value="Huvudrätt">Huvudrätt</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Mellanmål">Mellanmål</option>
                                <option value="Middag">Middag</option>
                            </select>
                        </label>
                        <label htmlFor="servings">
                            <div className="create__recipe__form__input__title">Servings</div>
                            <select
                                name="servings"
                                id="servings"
                                defaultValue={servings}
                                className="create__recipe__form__select"
                                onChange={e => setServings(e.target.value)}>
                                <option>-- choose --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </label>

                        {/* Ingredients
                      If there are no ingredients show default input field.
                      Otherwise show ingredients list which user alreday wrote.
                      Both have Add ingredients field after map().
                    */}
                        <div className="create__recipe__form__input__title">Ingredients</div>
                        {ingredients ?
                            <>{ingredients.map((item, index) => {
                                return (
                                    <input
                                        name="ingredients"
                                        key={index}
                                        id={index}
                                        className="create__recipe__form__input__text"
                                        value={item}
                                        type="text"
                                        onChange={e => { setIngredientsChange(e, e.target.id) }}
                                    />
                                )
                            })}
                                {/* Add ingredients field when user click Add button */}
                                {fields.map((_, index) => {
                                    return (
                                        <input
                                            name="ingredients"
                                            key={index}
                                            id={index + ingredients.length} //Index starts from 0 + ingredients.length
                                            className="create__recipe__form__input__text"
                                            // value={ingredients[index + 5]}
                                            type="text"
                                            onChange={e => { setIngredientsChange(e, e.target.id) }}
                                        />
                                    );
                                })} </>
                            : <>
                                {/* Default ingredients field which is 5 fields*/}
                                {ingredientsPlaceholder.map((placeholder, index) => {
                                    return (
                                        <input
                                            name="ingredients"
                                            key={index}
                                            id={index}
                                            className="create__recipe__form__input__text"
                                            // value={ingredients[index]}
                                            type="text"
                                            placeholder={placeholder}
                                            onChange={e => { setIngredientsChange(e, e.target.id) }}
                                        />
                                    )
                                })}
                                {/* Add ingredients field when user click Add button */}
                                {fields.map((_, index) => {
                                    return (
                                        <input
                                            name="ingredients"
                                            key={index}
                                            id={index + ingredientsPlaceholder.length} //Index starts from 5 because there are already 4 default input field.
                                            className="create__recipe__form__input__text"
                                            // value={ingredients[index + 5]}
                                            type="text"
                                            onChange={e => { setIngredientsChange(e, e.target.id) }}
                                        />
                                    );
                                })}</>}

                        <div className="fontAwesome create__recipe__form__input__add" onClick={() => addIngredientsField()}>Add <span className="create__recipe__form__input__add__icon">&#xf055;</span></div>

                        {/* Directions
                      If there are no directions show default input field.
                      Otherwise show directions list which user alreday wrote.
                      Both have Add directions field after map().
                    */}
                        <div className="create__recipe__form__input__title">Directions</div>
                        {/* Directions field which user wrote */}
                        {directions ?
                            <> {directions.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="create__recipe__form__input__container">
                                            <div className="create__recipe__form__input__number">{index + 1}</div>
                                            <textarea
                                                name="directions"
                                                value={item}
                                                className="create__recipe__form__input__text"
                                                type="text"
                                                onChange={e => { setDirectionsChange(e, e.target.id) }}
                                            />
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                                {/* Add directions field when user click on Add button */}
                                {directionsFields.map((_, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="create__recipe__form__input__container">
                                                <div className="create__recipe__form__input__number">{index + directions.length + 1}</div>
                                                <textarea
                                                    name="directions"
                                                    id={index + directions.length} //Index starts from 0 + directions.length
                                                    className="create__recipe__form__input__text"
                                                    type="text"
                                                    onChange={e => { setDirectionsChange(e, e.target.id) }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </> : <>
                                {/* Default directions field which is 3 fields */}
                                {directionsPlaceholder.map((placeholder, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="create__recipe__form__input__container">
                                                <div className="create__recipe__form__input__number">{index + 1}</div>
                                                <textarea
                                                    name="directions"
                                                    id={index}
                                                    className="create__recipe__form__input__text"
                                                    type="text"
                                                    placeholder={placeholder}
                                                    onChange={e => { setDirectionsChange(e, e.target.id) }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                                {/* Add directions field when user click on Add button */}
                                {directionsFields.map((_, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="create__recipe__form__input__container">
                                                <div className="create__recipe__form__input__number">{index + 4}</div>
                                                <textarea
                                                    name="directions"
                                                    id={index + directionsPlaceholder.length} //Index starts from 3 because there are already 3 default input field.
                                                    className="create__recipe__form__input__text"
                                                    type="text"
                                                    onChange={e => { setDirectionsChange(e, e.target.id) }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </>}

                        <div className="fontAwesome create__recipe__form__input__add" onClick={() => addDirectionsField()}>Add <span className="create__recipe__form__input__add__icon">&#xf055;</span></div>
                        <label className="create__recipe__form__input__image__title" htmlFor="file_upload">Image
                            {srcImg ? <div><img className="create__recipe__form__input__image__box__img" src={srcImg}></img></div> : <div className="create__recipe__form__input__image__box"><div className="fontAwesome create__recipe__form__input__image__icon">&#xf1c5;</div></div>}
                            <input id="file_upload" className="create__recipe__form__input__image" type="file" name="pic" onChange={e => { setImage(e.target.files[0]); setSrcImage(e.target.files[0]) }} />
                        </label>
                    </div>
                    <button className="create__recipe__form__button" type="submit">
                        EDIT RECIPE
            </button>
                </form>
            </>
        }
        </>
    )
}

export default EditRecipe
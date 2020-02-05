import React, { useState, useEffect }from 'react';
import firebase from '../firebase/firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Menu() {
    const [isUserloggedIn, setIsUserLoggedIn] = useState(null)
    const [isMenuOpened, setIsMenuOpened] = useState(false)

  useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              setIsUserLoggedIn(true)
          }
          else {
              setIsUserLoggedIn(false)
          }
      })
      
  })
    
    return (
        <div className="menu">
            <ul className="menu__ul">
                <li className="menu__ul__li">
                <Link to="/" className="menu__ul__li--link">Home</Link>
                </li>
                <li className="menu__ul__li">
                <Link to="/recipes" className="menu__ul__li--link">Recipes</Link>
                </li>
                <li className="menu__ul__li">
                <Link to={isUserloggedIn? "/myRecipe" : "/login"} className="menu__ul__li--link">My Recipes</Link>
                </li>
                <li className="menu__ul__li">
                <Link to="/search" className="menu__ul__li--link">Search</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu;
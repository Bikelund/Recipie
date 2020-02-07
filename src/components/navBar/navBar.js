import React, { useState, useEffect } from 'react';
import Recipes from '../recipes/recipes';
import Hero from '../hero/hero';
import Login from '../login/Login';
import MyRecipes from '../myRecipes/myRecipes';
import CreateRecipe from '../createRecipe/createRecipe'
import ResetPassword from '../login/ResetPassword';
import Register from '../register/register';
import Recipe from '../recipe/recipe';
import EditRecipe from '../editRecipe/editRecipe';
import Search from '../search/search';
import Results from '../search/result';
import firebase from '../firebase/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function NavBar() {
  const [isUserloggedIn, setIsUserLoggedIn] = useState(null)
  const [isMenuOpened, setIsMenuOpened] = useState(false) // This changes the state of the menu from open or closed

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
    <Router>
      <div>
        <nav className="navigation">
          <ul className="navigation__ul">
            <li className="navigation__ul__li">
              <Link to="/" className="fontAwesome navigation__ul__li--link">
                <div className="navigation__ul__home" onClick={() => setIsMenuOpened(false)}></div>
              </Link>
            </li>
            <li className="navigation__ul__li">
              <Link to="/recipes" className="fontAwesome navigation__ul__li--link desktop__navbar__hidden" onClick={() => setIsMenuOpened(false)}>&#xf02d;</Link>
            </li>
            <li className="navigation__ul__li">
              {/* If a user isn't logged in, hen will be directed to login page */}
              <Link to={isUserloggedIn? "/myRecipe" : "/login"} className="fontAwesome navigation__ul__li--link desktop__navbar__my-recipes" onClick={() => setIsMenuOpened(false)}>&#xf2bd;</Link>
            </li>
            <li className="navigation__ul__li">
              <Link to="/search" className="fontAwesome navigation__ul__li--link desktop__navbar__hidden" onClick={() => setIsMenuOpened(false)}>&#xf002;</Link>
            </li>
            <li className="navigation__ul__li">
              <div className="fontAwesome navigation__ul__li--link navigation__dots desktop__navbar__dots" onClick={() => setIsMenuOpened(!isMenuOpened)}>&#xf111; &#xf111; &#xf111;</div>
            </li>
          </ul>
        </nav>
        {<div className={isMenuOpened? 'menuOpen' : 'menuOpen hidden'} >
          <ul className="menu__ul">
            <li className="menu__ul__li">
              <Link to="/" className="menu__ul__li--link" onClick={() => setIsMenuOpened(false)}>Home</Link>
            </li>
            <li className="menu__ul__li">
              <Link to="/recipes" className="menu__ul__li--link" onClick={() => setIsMenuOpened(false)}>Recipes</Link>
            </li>
            <li className="menu__ul__li">
              <Link to={isUserloggedIn? "/myRecipe" : "/login"} className="menu__ul__li--link" onClick={() => setIsMenuOpened(false)}>My Recipes</Link>
            </li>
            <li className="menu__ul__li">
              <Link to="/search" className="menu__ul__li--link" onClick={() => setIsMenuOpened(false)}>Search</Link>
            </li>
          </ul>
        </div>
        }

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact strict path="/">
            <Hero />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/myRecipe">
            <MyRecipes />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/createRecipe">
            <CreateRecipe />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/resetPassword">
            <ResetPassword />
          </Route>
          {/* To pass a prop to the Recipe component */}
          <Route path="/recipe" render={(props)=> <Recipe {...props} />} />
          {/* To pass a prop to the EditRecipe component */}
          <Route path="/editRecipe" render={(props)=> <EditRecipe {...props} />} />
          {/* To pass a prop to the EditRecipe component */}
          <Route path="/results" render={(props)=> <Results {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default NavBar;
import React, { useState, useEffect }from 'react';
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
import firebase from '../firebase/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function NavBar() {
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
              <Link to="/recipes" className="fontAwesome navigation__ul__li--link" onClick={() => setIsMenuOpened(false)}>&#xf02d;</Link>
            </li>
            <li className="navigation__ul__li">
              <Link to={isUserloggedIn? "/myRecipe" : "/login"} className="fontAwesome navigation__ul__li--link" onClick={() => setIsMenuOpened(false)}>&#xf2bd;</Link>
            </li>
            <li className="navigation__ul__li">
              <Link to="/search" className="fontAwesome navigation__ul__li--link" onClick={() => setIsMenuOpened(false)}>&#xf002;</Link>
            </li>
            <li className="navigation__ul__li">
              <div className="fontAwesome navigation__ul__li--link navigation__dots" onClick={() => setIsMenuOpened(!isMenuOpened)}>&#xf111; &#xf111; &#xf111;</div>
            </li>
          </ul>
        </nav>
        {<div className={isMenuOpened? 'menuOpen menuAnimation' : 'menuOpen hidden menuAnimation'} >
          <div className="menu">
              <ul className="menu__ul">
                  <li className="menu__ul__li">
                    <Link to="/" className="menu__ul__li--link" onClick={() => setIsMenuOpened(!isMenuOpened)}>Home</Link>
                  </li>
                  <li className="menu__ul__li">
                    <Link to="/recipes" className="menu__ul__li--link" onClick={() => setIsMenuOpened(!isMenuOpened)}>Recipes</Link>
                  </li>
                  <li className="menu__ul__li">
                    <Link to={isUserloggedIn? "/myRecipe" : "/login"} className="menu__ul__li--link" onClick={() => setIsMenuOpened(!isMenuOpened)}>My Recipes</Link>
                  </li>
                  <li className="menu__ul__li">
                    <Link to="/search" className="menu__ul__li--link" onClick={() => setIsMenuOpened(!isMenuOpened)}>Search</Link>
                  </li>
              </ul>
          </div>
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
          {/* to pass a prop to a Recipe component */}
          <Route path="/recipe" render={(props)=> <Recipe {...props} />} />
          {/* to pass a prop to a EditRecipe component */}
          <Route path="/editRecipe" render={(props)=> <EditRecipe {...props} />} />

        </Switch>
      </div>
    </Router>
  );
}

export default NavBar;
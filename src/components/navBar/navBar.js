import React, { useState, useEffect }from 'react';
import Recipes from '../recipes/recipes';
import Hero from '../hero/hero';
import Menu from '../menu/menu';
import Login from '../login/Login';
import MyRecipes from '../myRecipes/myRecipes';
import firebase from '../firebase/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function NavBar() {
  const [isUserloggedIn, setIsUserLoggedIn] = useState('')

  useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              setIsUserLoggedIn(<MyRecipes />)
          }
          else {
              setIsUserLoggedIn(<Login />)
          }
      })
      
  })

  return (
    <Router>
      <div>
        <nav className="navigation">
          <ul className="navigation__ul">
            <li className="navigation__ul__li">
              <Link to="/">Home</Link>
            </li>
            <li className="navigation__ul__li">
              <Link to="/recipes">Recipes</Link>
            </li>
            <li className="navigation__ul__li">
              <Link to="/user">User</Link>
            </li>
            <li className="navigation__ul__li">
              <Link to="/menu">Menu</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact strict path="/">
            <Hero />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/user">
            {isUserloggedIn}
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default NavBar;
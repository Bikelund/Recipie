import React from 'react';
import Recipe from '../recipe/recipe';
import Hero from '../hero/hero';
import Menu from '../menu/menu';
import Login from '../login/Login';
import firebase from '../firebase/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function NavBar() {
  firebase.auth().onAuthStateChanged(user => {
    console.log(user) // Check if user is logged in
  
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
              <Link to="/recipe">Recipe</Link>
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
          <Route path="/recipe">
            <Recipe />
          </Route>
          <Route path="/user">
            <Login />
            {/* <Register />
            <button onClick={() => firebase.auth().signOut()}>sign out</button> */}
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
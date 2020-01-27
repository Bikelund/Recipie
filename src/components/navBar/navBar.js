import React from 'react';
import Recipe from '../recipe/recipe';
import Hero from '../hero/hero';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  function NavBar() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipe">Recipe</Link>
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
          </Switch>
        </div>
      </Router>
    );
  }

  export default NavBar;
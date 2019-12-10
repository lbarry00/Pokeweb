import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SearchByType from "./SearchByType";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Pokeweb</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/searchbytype">Search By Type</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/searchbytype" component={SearchByType}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;

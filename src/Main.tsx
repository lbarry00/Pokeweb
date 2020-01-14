import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Search from "./Search";
import About from "./About";
import SearchByType from "./SearchByType";
import WhosThatPokemon from "./WhosThatPokemon";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="header">
          <ul className="header-nav">
            <li><NavLink exact to="/">Search</NavLink></li>
            <li><NavLink to="/searchbytype">Search By Type</NavLink></li>
            <li><NavLink to="/wtp">Who's That Pokemon</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          <h1>POKÉWEB</h1>
          </div>
          <div className="content">
            <Route exact path="/" component={Search}/>
            <Route path="/searchbytype" component={SearchByType}/>
            <Route path="/wtp" component={WhosThatPokemon}/>
            <Route path="/about" component={About}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;

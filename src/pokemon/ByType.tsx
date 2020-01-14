import React, { Component } from "react";

// define the types for the props
type Props = {
  query: string,
}

// define the types for the states
type State = {
  typeName: string,
  pokemonRetrieved: boolean
};

// Array for sorting pokemon types by "slot" (ie. fire before flying for Charizard)
let name = "";
let pokemonList = [];
let strengths = []; // "super effective"
let weaknesses = []; // weak to ("super effective" against this type)
let immunities = []; // immune to

class ByType extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      typeName: "",
      pokemonRetrieved: false,
    };
  }

  componentDidUpdate(prevProps) {
    // if the state has updated, but the props are the same,
    // we don't need to do anything/display different data
    if (this.props.query === prevProps.query) {
      return;
    } else if (this.props.query === "") {
      return;
    } else {
      name = "";
      pokemonList = [];
      strengths = [];
      weaknesses = [];
      immunities = [];
      // clear the results array so it's reset for new
    }

    // normalize casing
    let query = this.props.query.toLowerCase();

    // setup the HTTP request
    var request = require("request");
    var options = {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/type/' + query,
      headers: {
        'cache-control': 'no-cache',
         Connection: 'keep-alive',
         Host: 'pokeapi.co',
         'Cache-Control': 'no-cache',
         Accept: '*/*'
       }
     };

     // Send the request, handle the response for the callback
     request(options, this.handleResponse);
  }

  handleResponse = (error: any, response: any, body: any) => {
    // Detect any errors and alert user accordingly
    if (response.statusCode === 404) {
      alert("Pokemon type not found.");
      this.setState({ pokemonRetrieved: false });
      return;
    } else if (response.statusCode !== 200) {
      this.setState({ pokemonRetrieved: false });
      alert("An error has occurred. Have you tried turning it off and turning it back on again? :)");
      return;
    }

    // The API response body is returned as a raw string.
    // Use JSON.parse() to change the response body (the data we want) into a JSON object that we can access
    let jsonBody = JSON.parse(body);
    console.log(jsonBody);

    name = jsonBody.name;
    name = name.charAt(0).toUpperCase() + name.substring(1);

    let pokemon = jsonBody.pokemon; // JSON array of the pokemon's types
    this.handlePokemon(pokemon);
    this.handleDamageRelations(jsonBody.damage_relations);
    if (pokemon) {
      this.setState({ pokemonRetrieved: true });
    } else {
      this.setState({ pokemonRetrieved: false });
    }
  }

  handlePokemon(pokemon: any) {
    if (pokemon) {
      let i = 0;
      for (i = 0; i < pokemon.length; i++ ) {
        let name = pokemon[i].pokemon.name;
        name = name.charAt(0).toUpperCase() + name.substring(1); // capitalize the first letter

        pokemonList.push({name: name, key: name});
      }
    }
  }

  handleDamageRelations(damageRelations) {
    console.log(damageRelations);
    let doubleDamageFrom = damageRelations.double_damage_from;
    let doubleDamageTo = damageRelations.double_damage_to;
    let immuneTo = damageRelations.no_damage_from;

    // Get strengths
    for (let i = 0; i < doubleDamageTo.length; i++) {
      let typeName = doubleDamageTo[i].name;
      typeName = typeName.charAt(0).toUpperCase() + typeName.substring(1);
      strengths.push(typeName);
    }

    // Get weaknesses
    for (let i = 0; i < doubleDamageFrom.length; i++) {
      let typeName = doubleDamageFrom[i].name;
      typeName = typeName.charAt(0).toUpperCase() + typeName.substring(1);
      weaknesses.push(typeName);
    }

    // Get immunities
    for (let i = 0; i < immuneTo.length; i++) {
      let typeName = immuneTo[i].name;
      typeName = typeName.charAt(0).toUpperCase() + typeName.substring(1);
      immunities.push(typeName);
    }
  }

  onClickLink(pokemonName) {
    window.name = pokemonName;
  }

  render() {
    // Alphabetize the list of pokemon
    pokemonList.sort(function(a, b) {
      let nameA = a.name;
      let nameB = b.name;

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    // Map components for strengths, weaknesses, and immunities
    const strengthsComponent = strengths.map(type => (
      <p key={type} className={type.toLowerCase()}>{type}</p>
    ));
    const weaknessesComponent = weaknesses.map(type => (
      <p key={type} className={type.toLowerCase()}>{type}</p>
    ));
    const immunitiesComponent = immunities.map(type => (
      <p key={type} className={type.toLowerCase()}>{type}</p>
    ));

    // Map pokemon list to components
    const pokemonListComponent = pokemonList.map(poke => (
      <a href="/#" key={poke.name} className="pokemon-bytype" onClick={() => this.onClickLink(poke.name)}>{poke.name}</a>
    ));

    if (!this.state.pokemonRetrieved) {
      return(<div className="type"></div>)
    } else if (immunities.length > 0) {
      return(
        <div className="bytype">
          <h2 className={name.toLowerCase()}>{name}</h2>
          <div className="type-info">
            <div className="strengths">
              <h3>Strengths</h3>
              {strengthsComponent}
            </div>
            <div className="weaknesses">
              <h3>Weaknesses</h3>
              {weaknessesComponent}
            </div>
            <div className="immunities">
              <h3>Immune To</h3>
              {immunitiesComponent}
            </div>
          </div>
          <div className="pokemon">
            <h3>Pokemon</h3>
            <div className="pokemon-list">
              {pokemonListComponent}
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div className="bytype">
          <h2 className={name.toLowerCase()}>{name}</h2>
          <div className="type-info">
            <div className="strengths">
              <h3>Strengths</h3>
              {strengthsComponent}
            </div>
            <div className="weaknesses">
              <h3>Weaknesses</h3>
              {weaknessesComponent}
            </div>
          </div>
          <div className="pokemon">
            <h3>Pokemon</h3>
            <div className="pokemon-list">
              {pokemonListComponent}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ByType;

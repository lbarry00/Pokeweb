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
let pokemonList = [];

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
    } else {
      pokemonList = []
      // clear the results array so it's reset for new
    }

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
      return;
    } else if (response.statusCode !== 200) {
      alert("An error has occurred. Have you tried turning it off and turning it back on again? :)");
      return;
    }

    // The API response body is returned as a raw string.
    // Use JSON.parse() to change the response body (the data we want) into a JSON object that we can access
    let jsonBody = JSON.parse(body);

    let pokemon = jsonBody.pokemon; // JSON array of the pokemon's types
    this.handlePokemon(pokemon);
  }

  handlePokemon(pokemon: any) {
    if (pokemon) {
      let ndx = 0;
      for (ndx = 0; ndx < pokemon.length; ndx++ ) {
        pokemonList.push({name: pokemon[ndx].pokemon.name, key: ndx});
      }
      this.setState({ pokemonRetrieved: true });
    } else {
      this.setState({ pokemonRetrieved: false }); // it's false by default, this is just for resetting
    }
  }

  render() {
    return (
      <div>
        { pokemonList.map(poke => {
          return(
            <li key={poke.key}>{poke.name}</li>
          );
        })}
      </div>
    );
  }
}

export default ByType;

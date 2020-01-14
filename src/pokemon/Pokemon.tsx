import React, { Component } from "react";
import NameId from "./NameId"
import Abilities from "./Abilities"
import Stats from "./Stats"
import Types from "./Types"

// define the types for the props
type Props = {
  query: string,
}

// define the types for the states
type State = {
  dataRetrieved: boolean,
 };

// Array for sorting pokemon types by "slot" (ie. fire before flying for Charizard)
let name = "";
let pokemonId = -1;
let spriteUrl = "";
let sortedTypesArray = [];
let sortedAbilitiesArray = [];
let statsArray = [];

class Pokemon extends Component<Props, State> {

  constructor(props) {
    super(props);

    name = "";
    spriteUrl = "";
    pokemonId = -1;

    this.state = {
      dataRetrieved: false
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
      pokemonId = -1;
      spriteUrl = "";
      sortedTypesArray = [];
      sortedAbilitiesArray = [];
      statsArray = [];
      // clear the pokemon's info so it's reset for new
    }

    let query = this.props.query.toLowerCase();

    // setup the HTTP request
    var request = require("request");
    var options = {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/' + query,
      headers: {
        'cache-control': 'no-cache',
         Connection: 'keep-alive',
         Host: 'pokeapi.co',
         Accept: '*/*'
       }
     };

     // Send the request, handle the response for the callback
     request(options, this.handleResponse);
  }

  handleResponse = (error: any, response: any, body: any) => {
    // Detect any errors and alert user accordingly
    if (response.statusCode === 404) {
      this.setState({ dataRetrieved: false });
      alert("Pokemon or Index # not found.");
      return;
    } else if (response.statusCode !== 200) {
      this.setState({ dataRetrieved: false });
      alert("An error has occurred. Have you tried turning it off and turning it back on again? :)");
      return;
    }

    // if it's not a 404, then the Pokemon is valid. Set the name
    name = this.props.query;

    // The API response body is returned as a raw string.
    // Use JSON.parse() to change the response body (the data we want) into a JSON object that we can access
    let jsonBody = JSON.parse(body);
    console.log("Pokemon Response");
    console.log(jsonBody);

    pokemonId = jsonBody.id;

    // Grab the image URL for the pokemon's sprite and parse it
    let sprites = jsonBody.sprites;
    this.handleSprite(sprites);

    // Create a sub-object of the pokemon's types and parse
    let types = jsonBody.types;
    this.handleTypes(types);

    // parse sub-object of the pokemon's abilities
    let abilities = jsonBody.abilities;
    this.handleAbilities(abilities);

    // parse sub-object of stats
    let stats = jsonBody.stats;
    this.handleStats(stats);

    this.setState({ dataRetrieved: true });
  }

  handleSprite(sprites: any) {
    if (sprites.front_default) {
      spriteUrl = sprites.front_default;
    }
  }

  handleTypes(types: any) {
    if (types) {
      for (const type of types) {
        sortedTypesArray[type.slot] = type.type.name;
      }
    }
  }

  handleAbilities(abilities: any) {
    if (abilities) {
      for (const ability of abilities) {
        let abilityName = ability.ability.name;

        // remove "-" and replace with spaces. capitalize each word properly
        abilityName = abilityName.replace("-", " ");
        abilityName = abilityName.replace(/\b[a-z]/g, function(character) {
          return character.toUpperCase();
        });

        sortedAbilitiesArray.push(abilityName);
      }
    }
  }

  handleStats(stats: any) {
    if (stats) {
      for (const stat of stats) {
        let statName, statValue;
        statName = stat.stat.name;

        // remove "-" and replace with spaces. capitalize each word properly
        statName = statName.replace("-", " ");

        if (statName !== "hp") { // for all stats (except hp), we want to capitalize words like normal

            statName = statName.replace(/\b[a-z]/g, function(character) {
            return character.toUpperCase();
          });
        } else { // for "hp", we want it all uppercase like this: "HP"
          statName = statName.toUpperCase();
        }

        statValue = stat.base_stat;

        statsArray.push([statName, statValue]);
      }
    }
  }

  render() {
    // detect whether data was retrieved successfully. Render components appropriately
    let spriteComponent = spriteUrl ? <img src={spriteUrl} className="sprite" alt={"Pixel art sprite of " + this.props.query} /> : null;
    let nameIdComponent = this.state.dataRetrieved ? <NameId pokemonName={name} pokemonId= {pokemonId}/> : null;
    let typeComponent = this.state.dataRetrieved ? <Types typesArray={sortedTypesArray} /> : null;
    let abilitiesComponent = this.state.dataRetrieved ? <Abilities abilities={sortedAbilitiesArray} /> : null;
    let statsComponent = this.state.dataRetrieved ? <Stats statsArray={statsArray} /> : null;

    return(
      <div className="Pokemon">
        <div className="pokemon-top">
          <div className="pokemon-left">
            {spriteComponent}
            {typeComponent}
          </div>
          <div className="pokemon-right">
            {nameIdComponent}
            {abilitiesComponent}
          </div>
        </div>
        {statsComponent}
      </div>
    )
  }
}

export default Pokemon;

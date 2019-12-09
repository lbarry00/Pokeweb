import React, { Component } from "react";
import Abilities from "./Abilities"
import Stats from "./Stats"
import Types from "./Types"

// define the types for the props
type Props = {
  query: string,
}

// define the types for the states
type State = {
  name: string,
  abilitiesRetrieved: boolean,
  statsRetrieved: boolean
  typesRetrieved: boolean,
  dummy: number,
 };

 // Array for sorting pokemon types by "slot" (ie. fire before flying for Charizard)
let sortedTypesArray = [];
let sortedAbilitiesArray = [];
let statsArray = [];

class Pokemon extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      abilitiesRetrieved: false,
      statsRetrieved: false,
      typesRetrieved: false,
      dummy: 0

    };
  }

  componentDidUpdate(prevProps) {
    // if the state has updated, but the props are the same,
    // we don't need to do anything/display different data
    if (this.props.query === prevProps.query) {
      return;
    } else {
      sortedTypesArray = [];
      statsArray = [];
      // clear the types array so it's reset for new
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
      alert("Pokemon or Index # not found.");
      return;
    } else if (response.statusCode !== 200) {
      alert("An error has occurred. Have you tried turning it off and turning it back on again? :)");
      return;
    }

    // The API response body is returned as a raw string.
    // Use JSON.parse() to change the response body (the data we want) into a JSON object that we can access
    let jsonBody = JSON.parse(body);
    console.log(jsonBody);

    let types = jsonBody.types; // JSON array of the pokemon's types
    this.handleTypes(types);

    let abilities = jsonBody.abilities;
    this.handleAbilities(abilities);

    let stats = jsonBody.stats;
    this.handleStats(stats);
  }

  handleTypes(types: any) {
    if (types) {
      for (const type of types) {
        sortedTypesArray[type.slot] = type.type.name;
      }
      this.setState({ typesRetrieved: true });
    } else {
      this.setState({ typesRetrieved: false }); // it's false by default, this is just for resetting
    }
  }

  handleAbilities(abilities: any) {
    if (abilities) {
      for (const ability of abilities) {
        sortedAbilitiesArray[ability.slot] = ability.ability;
      }
      this.setState({ abilitiesRetrieved: true });
    } else {
      this.setState({ abilitiesRetrieved: false });
    }
  }

  handleStats(stats: any) {
    if (stats) {
      let statName, statValue;
      for (const stat of stats) {
        statName = stat.stat.name;
        statValue = stat.base_stat;
        // It would be nice to treat this as an associative array, but it screws up the scope
        //statsArray[statName] = statValue;
        statsArray.push([statName, statValue]);
      }
      console.log('Stats array: ' + statsArray);
      this.setState({ statsRetrieved: true });
    } else {
      this.setState({ statsRetrieved: false });
    }
  }

  render() {
    // detect whether types were retrieved successfully. Render appropriately
    const typesRetrieved = this.state.typesRetrieved;
    let typeComponent;
    if (typesRetrieved) {
      typeComponent = <Types typesArray={sortedTypesArray} />
    } else {
      typeComponent = <div className = "types"></div>
    }

    const abilitiesRetrieved = this.state.abilitiesRetrieved;
    let abilitiesComponent;
    if (abilitiesRetrieved) {
      abilitiesComponent = <Abilities abilities={sortedAbilitiesArray} />
    } else {
      abilitiesComponent = <div className = "abilities"></div>
    }

    const statsRetrieved = this.state.statsRetrieved;
    let statsComponent;
    if (statsRetrieved) {
      statsComponent = <Stats statsArray={statsArray} />
    } else {
      statsComponent = <div className = "stats"></div>
    }

    return(
      <div className="Pokemon">
        {typeComponent}
        {abilitiesComponent}
        {statsComponent}
      </div>
    )
  }
}

export default Pokemon;

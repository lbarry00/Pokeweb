import React, { Component } from "react";

type Props = {
  abilities: any,
  query: any,
}

type State = {
  abilitiesRetrieved: boolean,
}

let abilitiesList = [];
let prevQuery = "";
let globalThermonuclearWar = false;

class Abilities extends Component<Props, State> {

  constructor(props) {
    super(props);
    console.log(`Constructing`);
    prevQuery = this.props.query;

    this.state = {
      abilitiesRetrieved: false,
    }
  }

  componentDidUpdate() {
    console.log(`Component did update`)
    //abilitiesList = [];
  }

  killEmAll() {
    abilitiesList = [];
  }

  handleResponse = (error: any, response: any, body: any) => {
    // grab the description and name
    console.log(`handling response`); 
    let jsonBody = JSON.parse(body);
    let description = jsonBody.effect_entries[0].short_effect;
    let name = jsonBody.name;

    abilitiesList.push([name, description]);
    console.log(`Pushed ${name}:${description} to...`);
    console.log(abilitiesList);
    this.setState({abilitiesRetrieved: true});
  }

  render() {
    console.log(`rendering abilities`);
    for (const ability of this.props.abilities) {
      if (typeof ability === "undefined") { // there may be gaps in the props.abilities array. just ignore these
        continue;
      }

      // Request information on the ability
      var request = require("request");
      var options = {
        method: 'GET',
        url: ability.url,
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

    let abilityComponent: any;
    if (this.state.abilitiesRetrieved) {
      abilityComponent = abilitiesList.map( ability => (
        <p key={ability[0]}>
        {ability[0]}: {ability[1]}
        </p>
      ));
    } else {
      abilityComponent = <p>No abilities found.</p>
    }

    return(
      <div className="abilities">
        <h3>Abilities</h3>
          {abilityComponent}
      </div>
    )
  }
}

export default Abilities;

import React, { Component } from "react";

type Props = {
  abilities: any,
}

type State = {
  abilitiesList: any,
  abilitiesRetrieved: boolean,
}

class Abilities extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      abilitiesList: [],
      abilitiesRetrieved: false
    }
  }

  handleResponse = (error: any, response: any, body: any) => {
    // grab the description and name
    let jsonBody = JSON.parse(body);
    let description = jsonBody.effect_entries[0].short_effect;
    let name = jsonBody.name;

    // add to the key value pairs list
    this.state.abilitiesList.push([name, description]);

    this.setState({ abilitiesRetrieved: true });
  }

  render() {
    if (!this.state.abilitiesRetrieved) {
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
    }

    let abilityComponent;
    if (this.state.abilitiesRetrieved) {
      abilityComponent = this.state.abilitiesList.map( ability => (
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

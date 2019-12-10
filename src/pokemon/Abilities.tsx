import React, { Component } from "react";

type Props = {
  abilities: any,
}

// ***
// Commented code is from trying to get a second HTTP request to the "Abilities" endpoint working.
// While we were able to make the request fine, we couldn't get this rendering correctly due to errors in our React logic
// ***

/*
type State = {
  abilitiesRetrieved: any,
}

let abilitiesList;
let tempList;
let abilitiesRetrieved;
*/

class Abilities extends Component<Props, any> {

  /*
  constructor(props) {
    super(props);
    console.log(`Constructing`);

    tempList = []
    abilitiesRetrieved = false;

    this.state = {
      abilitiesList: null
    }
  }
  */

  /*
  handleResponse = (error: any, response: any, body: any) => {
    // grab the description and name
    console.log(`handling response`);
    let jsonBody = JSON.parse(body);
    let description = jsonBody.effect_entries[0].short_effect;
    let name = jsonBody.name;

    tempList.push([name, description]);
    console.log(`Pushed ${name}:${description} to...`);
    console.log(tempList);
  }
  */


  componentDidMount() {
    /*
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
           Accept: '*//*'
         }
       };

       // Send the request, handle the response for the callback
      request(options, this.handleResponse);
    }
    */
  }

  render() {
    /*
    let abilityComponent: any;
    if (abilitiesRetrieved) {
      abilityComponent = abilitiesList.map( ability => (
        <p key={ability[0]}>
        {ability[0]}: {ability[1]}
        </p>
      ));
    } else {
      abilityComponent = null;
    }
    */

    const abilityComponent = this.props.abilities.map( ability => (
      <p key={ability}>
      {ability}
      </p>
    ));

    return(
      <div className="abilities">
        <h3>Abilities</h3>
          {abilityComponent}
      </div>
    )
  }
}

export default Abilities;

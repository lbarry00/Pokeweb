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

class Abilities extends Component<Props, State> {

  constructor(props) {
    super(props);

    prevQuery = this.props.query;

    this.state = {
      abilitiesRetrieved: false,
    }
  }

  // Does not execute prior to handle
  /*
  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.query === prevProps.query) {
      return;
    } else {
      abilitiesList = [];
      this.setState({abilitiesRetrieved: false});
    }
  }
  */

  componentDidUpdate() {

  }

  handleResponse = (error: any, response: any, body: any) => {
    // grab the description and name
    let jsonBody = JSON.parse(body);
    let description = jsonBody.effect_entries[0].short_effect;
    let name = jsonBody.name;

    // add to the key value pairs list

    // Since abilities can have undefined entries in the API, only count the valid ones
    // We would LIKE to remove them but React won't let us.
    let abilityCount = 0;
    for (const ability of this.props.abilities) {
      if(ability) {
        abilityCount++;
      }
    }

    if (abilitiesList.length < abilityCount) {
      abilitiesList.push([name, description]);
    }
    console.log(`added ${name}:${description} to ${abilitiesList}`);
    this.setState({ abilitiesRetrieved: true });
  }

  render() {
    console.log(`Props query: ${this.props.query}, previous query: ${prevQuery}`);
    if (this.props.query !== prevQuery) {
      abilitiesList = [];
      prevQuery = this.props.query;
      this.setState({abilitiesRetrieved: false});  
      console.log(`Inside if, props query: ${this.props.query}, previous query: ${prevQuery}, abilities list: ${abilitiesList}`);
    } else {
      console.log(`Inside else, props query: ${this.props.query}, previous query: ${prevQuery}, abilities list: ${abilitiesList}`);
    }
    
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


    let abilityComponent: any;
    if (this.state.abilitiesRetrieved) {
      //abilityComponent = this.state.abilitiesList.map( ability => (
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

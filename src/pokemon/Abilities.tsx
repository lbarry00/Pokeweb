import React, { Component } from "react";

type Props = {
  abilities: any,
}

class Abilities extends Component<Props, any> {
  render() {
    let abilitiesList = {}; // will hold key/value pairs of the name/description of the abilities

    console.log(this.props.abilities);
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
       request(options, function(error, response, body) {
         // grab the description and name
         let jsonBody = JSON.parse(body);
         let description = jsonBody.effect_entries[0].effect;
         let name = jsonBody.name;

         // add to the key value pairs list
         abilitiesList[name] = description;
       });
    }

    console.log(abilitiesList);
    console.log(JSON.stringify(abilitiesList));

    const abilitiesComponent = Object.entries(abilitiesList).map(([key,value])=>{
      return (
          <p>{key} : {value.toString()}</p>
      );
    })

    return(
      <div className="abilities">
        <h3>Abilities</h3>
          {abilitiesComponent}
      </div>
    )
  }
}

export default Abilities;

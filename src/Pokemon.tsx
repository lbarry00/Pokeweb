import React, { Component } from "react";

type MyProps = {
  query: string,
}

type MyState = {
  name: string,
  isTypeDataRetrieved: boolean,
 };

 // Array for sorting pokemon types by "slot" (ie. fire before flying for Charizard)
 var sortedTypesArray = [];

class Pokemon extends Component<MyProps, MyState> {

  constructor(props) {
    super(props);

    this.state = {
      name: "default",
      isTypeDataRetrieved: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.query === prevProps.query) {
      return;
    }

    let query = this.props.query.toLowerCase();

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

     request(options, this.handleType);
  }

  handleType = (error: any, response: any, body: any) => {

    if (response.statusCode === 404) {
      alert("Pokemon or Index # not found.");
    } else if (response.statusCode !== 200) {
      alert("An error has occurred. Have you tried turning it off and turning it back on again? :)");
    }

    let jsonBody = JSON.parse(body);
    console.log(jsonBody);

    let types = jsonBody.types; // JSON array of types
    if (types ) {
      for (const type of types) {
        sortedTypesArray[type.slot] = type.type.name;
      }
      this.setState({ isTypeDataRetrieved: true});
    }
  }

  render() {
    const isTypeDataRetrieved = this.state.isTypeDataRetrieved;
    let typeRender;

    if (isTypeDataRetrieved) {
      typeRender = <div className="type"> <h3>Type</h3>{sortedTypesArray.map( type => ( <p>{type}</p> ))} </div>
    } else {
      typeRender = <div className = "type"></div>
    }

    return(
      <div className="Pokemon">
        {typeRender}
      </div>
    )
  }
}

export default Pokemon;

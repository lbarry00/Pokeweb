import React, { Component } from "react";

type MyProps = {
  query: string,
}

type MyState = {
  name: string,
 };

class Pokemon extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      name: "default",
    };
  }

  componentDidUpdate() {
    var Pokedex = require('pokedex-promise-v2');
    var P: any = new Pokedex();
    let currentComponent = this;
    let query = this.props.query;

    P.getPokemonByName(query)
      .then(function(response) {
        currentComponent.setState({ name: response.name });
      })
      .catch(error => console.log(error));
  }

  render() {
    return(
      <div>
        <p>{this.props.query}</p>
      </div>
    )
  }
}

export default Pokemon;

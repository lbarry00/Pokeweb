import React, { Component } from "react";

type Props = {
  pokemonName: any,
  pokemonId: any
}

class NameId extends Component<Props, any> {

  render() {
    let name = (this.props.pokemonName).toString();
    name = name.charAt(0).toUpperCase() + name.substring(1);

    return(
      <div className="name-id">
        <img src="./img/pokeball.png" alt="Icon of a Pokeball" className="pokeball-icon"/>
        <p className="id">#{this.props.pokemonId}</p>
        <p className="name">{name}</p>
      </div>
    )
  }
}

export default NameId;

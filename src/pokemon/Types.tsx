import React, { Component } from "react";

type Props = {
  typesArray: any,
}

class Types extends Component<Props, any> {

  render() {
    const typeItems = this.props.typesArray.map( type => (
      <p key={type}>
      {type}
      </p>
    ));

    return(
      <div className="types">
        <h3>Type</h3>
        {typeItems}
      </div>
    )
  }
}

export default Types;

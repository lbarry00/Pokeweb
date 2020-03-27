import React, { Component } from "react";

type Props = {
  typesArray: any,
}

class Types extends Component<Props, any> {


  render() {

    const typeItems = this.props.typesArray.map( type => (
      <p key={type} className={type}>
      {type.toUpperCase()}
      </p>
    ));

    return(
      <div className="types">
        {typeItems}
      </div>
    )
  }
}

export default Types;

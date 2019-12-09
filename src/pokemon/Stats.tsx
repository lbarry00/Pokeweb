import React, { Component } from "react";

type Props = {
  statsArray: any,
}

class Stats extends Component<Props, any> {

  render() {
    const statsItems = this.props.statsArray.map( type => (
      <p key={type}>
      {type}
      </p>
    ));

    return(
      <div className="stats">
        <h3>Stats</h3>
        {statsItems}
      </div>
    )
  }
}

export default Stats;

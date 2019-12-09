import React, { Component } from "react";

type Props = {
  statsArray: any,
}

class Stats extends Component<Props, any> {

  render() {
    const statsItems = this.props.statsArray.map( stat => (
      <p key={stat}>
          {stat[0]} = {stat[1].toString()}
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

import React, { Component } from "react";

type Props = {
  statsArray: any,
}

class Stats extends Component<Props, any> {

  render() {

    const statsItems = this.props.statsArray.map( stat => (
      // Capitalize the name of the stat, and replace '-' with ' '
      // special-defense -> Special defense
      <div key={stat}>
        <p className="stat-name">
        {(stat[0].charAt(0).toUpperCase() + stat[0].substring(1)).replace(/-/g, ' ')}
        </p>
        <p key={stat} className="stat-value">
        {stat[1].toString()}
        </p>
      </div>
    ));

    return(
      <div className="stats">
        <p>STATS</p>
        <div className="stats-box">
          {statsItems}
        </div>
      </div>
    )
  }
}

export default Stats;

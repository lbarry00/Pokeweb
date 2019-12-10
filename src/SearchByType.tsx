import React, { Component } from "react";
import ByType from "./pokemon/ByType";

type State = {
  query: string,
 };

class SearchByType extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      query: "default",
    }
  }

  onEnterKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      this.search();
    }
  }

  componentDidMount() {
    let button: HTMLElement = document.getElementById("search-button");
    button.addEventListener("click", (e:Event) => this.search());

    let searchBox: HTMLElement = document.getElementById("search-box");
    searchBox.addEventListener("keydown", this.onEnterKeyDown);
  }

  private search() {
    let inputValue = (document.getElementById("search-box") as HTMLInputElement).value;
    this.setState({ query: inputValue });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Enter a Pokemon type:</h2><br/>
          <input type="text" id="search-box"></input>
          <input type="button" id="search-button" value="Search"></input>
        </div>
        <div>
          <ByType query={this.state.query}/>
        </div>
      </div>
    );
  }
}

export default SearchByType;

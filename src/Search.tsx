import React, { Component } from "react";
import Pokemon from "./pokemon/Pokemon";
import "./css/search.scss";

type State = {
  query: string,
 };

class Search extends Component<{}, State> {
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

    if (window.name !== "") {
      this.setState({ query: window.name });
      window.name = "";
    }
  }

  componentDidUpdate() {
    // places the cursor into the search box
    let searchBox: HTMLElement = document.getElementById("search-box");
    searchBox.focus();

  }

  private search() {
    let inputValue = (document.getElementById("search-box") as HTMLInputElement).value;
    this.setState({ query: inputValue });
  }

  render() {
    return (
      <div className="search">
        <div className="search-area">
          <input type="text" id="search-box" placeholder="Search for a Pokemon"></input>
          <input type="button" id="search-button" value="Search"></input>
        </div>
        <div className="search-results">
          <Pokemon query={this.state.query}/>
        </div>
      </div>
    );
  }
}

export default Search;

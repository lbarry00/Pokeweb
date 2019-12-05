import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  onEnterKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode == 13 || e.key == "Enter") {
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
    alert("Search!");
  }

  render() {
    return (
      <div>
        <h2>Enter a Pokemon!</h2><br/>
        <input type="text" id="search-box"></input>
        <input type="button" id="search-button" value="Search"></input>
      </div>
    );
  }
}

export default Home;

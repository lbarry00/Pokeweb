import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <p>Pokeweb is a web-based Pokedex built with React, TypeScript, and NodeJS.</p>

        <p>Created by Lauren Barry and Jude Battista.</p>

        <p>Source code can be found <a href="https://github.com/laurenbarry00/Pokeweb">HERE</a>.</p>

        <h3>Current Features</h3>
        <p>
            <em>Search</em> - Query Pokemon by name or ID number. The name is case-insensitive. The ID number is a value internal to PokeApi, so is largely useless to external customers. The results include the Pokemon's type, ability list, and statistics.
            <br /> <br />
            <em>Search By Type</em> - Query a Pokemon by name or ID number. The name is case-insensitive. The ID number is a value internal to PokeApi, so is largely useless to external customers. The results include a list of all the Pokemon in the Pokedex belonging to that type. Each result contains a link to the raw data associated with that Pokemon.
            <br /> <br />
            <em>Who's That Pokemon</em> - Provides a graphic of a randomly selected Pokemon and asks the user to guess its name. When the user correctly guesses the Pokemon's name, they are presented with another randomly selected image. It tracks the total number of guesses, the number of correct guesses, and the percentage of correct guesses.
        </p>
       </div>
    );
  }
}

export default About;

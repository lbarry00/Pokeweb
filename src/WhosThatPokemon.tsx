import React, {Component} from "react";
import './css/wtp.css';

type State = {
  guessedCorrectly: boolean,
  validPokemonToGuess: boolean,
}

var pokemonToGuess: string;
var index: number;
var spriteUrl: string;

var correctGuesses: number;
var guessCount: number;

var correctAlert; // the element that states whether the user has guessed correctly or not

class WhosThatPokemon extends Component<any, State> {

  constructor(props) {
    super(props);

    correctGuesses = 0;
    guessCount = 0;

    this.state = {
      guessedCorrectly: false,
      validPokemonToGuess: false
    };
  }

  onEnterKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      this.guess();
    }
  }

  getRandomPokemonIndex(): number {
    let index;

    // max: 807
    // min: 1
    index = Math.floor(Math.random() * (807 - 1) + 1);

    return index;
  }

  getPokemonSprite(index: number) {
    // setup request
    var request = require("request");
    var options = {
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/' + index,
      headers: {
        'cache-control': 'no-cache',
         Connection: 'keep-alive',
         Host: 'pokeapi.co',
         'Cache-Control': 'no-cache',
         Accept: '*/*'
       }
     };

     let currentComponent = this;

     request(options, function(error, response, body) {
       if (response.statusCode !== 200) {
         // on the off chance we get a 404 not found (or otherwise)
         return;
       }

       let jsonBody = JSON.parse(body);
       pokemonToGuess = jsonBody.name;
       spriteUrl = jsonBody.sprites.front_default;

       console.log("Retrieved Pokemon (cheater!): " + pokemonToGuess);

       currentComponent.setState({validPokemonToGuess: true});
     });
  }

  guess(): void {
    let guess = (document.getElementById("guess-box") as HTMLInputElement).value;
    guessCount++;

    // check if the player guessed correctly.
    if (guess.toLowerCase() === pokemonToGuess) {
      this.setState({guessedCorrectly: true, validPokemonToGuess: false});
      correctGuesses++;
    } else {
      this.setState({guessedCorrectly: false});
      correctAlert = <h3>Incorrect. Try again.</h3>
      this.forceUpdate();
    }
  }

  componentDidMount() {
    let button: HTMLElement = document.getElementById("guess-button");
    button.addEventListener("click", (e:Event) => this.guess());

    let guessBox: HTMLElement = document.getElementById("guess-box");
    guessBox.addEventListener("keydown", this.onEnterKeyDown);
  }

  componentDidUpdate() {
    // clear the text box
    ((document.getElementById("guess-box")) as HTMLInputElement).value = "";

    // puts the cursor in the guessbox
    let guessBox: HTMLElement = document.getElementById("guess-box");
    guessBox.focus();
  }

  render() {
    if (!this.state.validPokemonToGuess) { // We need to get a new pokemon
      index = this.getRandomPokemonIndex();

      this.getPokemonSprite(index);
    }

    if (this.state.guessedCorrectly) {
      correctAlert = <h3>Correct!</h3>
    }

    // percentage guessed correctly
    let guessAccuracy: number = ((correctGuesses / guessCount) * 100) || 0;

    return(
      <div className="WhosThatPokemon">
        <h2>Who's That Pokemon?</h2>
        <div className="guessing-area">
          <img src={spriteUrl} alt={pokemonToGuess} className="sprite-img"></img>
          <h3>Enter your guess below.</h3>
          <input type="text" id="guess-box"></input>
          <input type="button" id="guess-button" value="Guess!"></input>
        </div>
        <div className="correct-alert">{correctAlert}</div>
        <div className="guess-counts">
          <p>Correct Guesses: {correctGuesses}</p>
          <p>Total Guesses: {guessCount}</p>
          <p>Guess Accuracy: {guessAccuracy.toFixed(2)}%</p>
        </div>
      </div>
    )
  }
}

export default WhosThatPokemon;

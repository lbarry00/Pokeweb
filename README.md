# Pokeweb
This project is designed to allow users to query a variety of Pokemon information from the [Pokemon API](https://pokeapi.co/).

## Current Features

*Search* - Query Pokemon by name or ID number. The name is case-insensitive. The ID number is a value internal to PokeApi, so is largely useless to external customers. The results include the Pokemon's type, ability list, and statistics.
  
*Search By Type* - Query a Pokemon by name or ID number. The name is case-insensitive. The ID number is a value internal to PokeApi, so is largely useless to external customers. The results include a list of all the Pokemon in the Pokedex belonging to that type. Each result contains a link to the raw data associated with that Pokemon. 
  
*Who's That Pokemon* - Provides a graphic of a randomly selected Pokemon and asks the user to guess its name. When the user correctly guesses the Pokemon's name, they are presented with another randomly selected image. It tracks the total number of guesses, the number of correct guesses, and the percentage of correct guesses.

## Technology

This project utilized [Node.js](https://nodejs.org/en/) as the server-side environment.

The UI was written with [React](https://reactjs.org/). This allowed us to create simple views that are stateful and modular. We were able to use React and ReactRouter (see below) to create a single-page application this way. 

[TypeScript](https://www.typescriptlang.org/) enables static type-checking, which attempts to fix some of JavaScript's more dangerous aspects.

[create-react-app](https://github.com/facebook/create-react-app) was used to setup and automate the build configuration.

[ReactRouter](https://reacttraining.com/react-router/) was used to help maintain URI and content integrity when developing a single-page application.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs node dependencies. (All modules listed in `package.json`).
Run this before running `npm start`. 

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

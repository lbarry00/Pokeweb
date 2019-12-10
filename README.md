# Pokeweb
This project is designed to allow users to query a variety of Pokemon information from the Pokemon API at PokeApi.co
Currently implemented features include:

  Search - query pokemon by name or ID number. The name is case-insensitive. The ID number is a value internal to PokeApi, so is largely useless to external customers. The results include the pokemon's type, ability list, and statistics.
  
  Search By Type - query a pokemon type by name or ID number. The name is case-insensitive. The ID number is a value internal to PokeApi, so is largely useless to external customers. The results include a list of all the pokemon in the Pokedex belonging to that type. Each result contains a link to the raw data associated with that pokemon. 
  
  Who's That Pokemon - Provides a graphic of a randomly selected Pokemon and asks the user to guess its name. When the user correctly guesses the Pokemon's name, they are presented with another randomly selected image. It tracks the total number of guesses, the number of correct guesses, and the percentage of correct guesses.

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It uses node.js to...

The single page application is built with React.js in combination with TypeScript to help alleviate some of the more dangerous aspects of Javascript. It employs ReactRouter to help maintain URI and content integrity during navigation between components.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs node dependencies. (All modules listed in `package.json`).
Run this before running `npm start`. 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

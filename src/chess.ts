// Import the necessary libraries
import * as chessboard from 'chessboardjs';

// Define the API endpoint and your API token
const apiEndpoint = 'https://api.chess.com/pub/player';
const apiToken = '<your-api-token>';

// Define the username and game ID for the game you want to render
const username = '<username>';
const gameId = '<game-id>';

// Retrieve the game data from the API
const response = await fetch(`${apiEndpoint}/${username}/games/archives?token=${apiToken}`);
const data = await response.json();
const games = data.games.flat();

const game = games.find(g => g.url.split('/').pop() === gameId);
const gameUrl = game.url;
const gameDataResponse = await fetch(`${gameUrl}?token=${apiToken}`);
const gameData = await gameDataResponse.json();

// Parse the game data to extract the moves and players
const moves = gameData.moves.split(' ');
const whitePlayer = gameData.white.username;
const blackPlayer = gameData.black.username;
const result = gameData.result;

// Render the game using chessboard.js
const board = chessboard('board', {position: 'start'});
for (let i = 0; i < moves.length; i++) {
  const move = moves[i];
  board.move(move);
}

// Display the players and game result
console.log(`White: ${whitePlayer}`);
console.log(`Black: ${blackPlayer}`);
console.log(`Result: ${result}`);

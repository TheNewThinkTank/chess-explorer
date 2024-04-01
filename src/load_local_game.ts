import * as fs from 'fs'
import * as Chess from 'chess.js'
import * as Chessboard from 'chessboardjs'

const gameText = fs.readFileSync('../game_archive/fried-liver-defence.txt', 'utf-8')

const game = new Chess()
const moves = gameText.split('\n').filter(move => move.trim() !== '');

moves.forEach(move => {
    game.move(move.trim())
});

const board = Chessboard('board', {
    position: game.fen(),
    orientation: 'white',
    draggable: false,
});

// Optional: Render the moves on the side of the board
const gameHistory = game.history({ verbose: true })
const $history = document.getElementById('history')!
gameHistory.forEach((move, index) => {
    const moveNumber = Math.floor(index / 2) + 1
    const formattedMove = `${moveNumber}. ${move.from}${move.to}`
    const $move = document.createElement('div')
    $move.textContent = formattedMove
    $history.appendChild($move)
});

import React from 'react';
//import { createStore } from 'redux'
import Row from './Row.js';
import Menu from './Menu.js';
import Victory from './Victory.js';

const length = 16;
const numOfBombs = 51;
let board = initGame()
let startTable = new Array(length);
startTable = init();


function initGame() {
  const table = new Array(length);
  let bombs = numOfBombs, row, column, counter = 0;

  for (let i = 0; i < length; i++) {
    table[i] = new Array(length);
  }

  while (bombs > 0) {
    row = Math.floor(Math.random() * length);
    column = Math.floor(Math.random() * length);
    if (table[row][column] !== 'X') {
      table[row][column] = 'X';
      bombs--;
    }
  }

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      for (let k = i - 1; k <= i + 1; k++) {
        for (let n = j - 1; n <= j + 1; n++) {
          if (table[k] !== undefined && table[k][n] !== undefined && table[k][n] === 'X') {
            counter++;
          }
        }
      }

      if (table[i][j] !== 'X' && counter !== 0) {
        table[i][j] = counter;
      }
      if (counter === 0) {
        table[i][j] = '';
      }

      counter = 0;
    }
  }

  return table;
}

function init() {
  for (let i = 0; i < length; i++) {
    startTable[i] = new Array(length);
  }

  for (let i = 0; i < startTable.length; i++) {
    for (let j = 0; j < startTable[i].length; j++) {
      startTable[i][j] = '-';
    }
  }

  return startTable;
}

const initialState = {
  gameBoard: board,
  currentBoard: startTable,
  currentPlayer: 'Red',
  nextTurn: 'Blue',
  bombs: numOfBombs,
  redScore: 0,
  blueScore: 0,
  redWins: 0,
  blueWins: 0
}

export default class App extends React.Component {
  constructor() {
    super()

    this.renderRows = this.renderRows.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.switchTurns = this.switchTurns.bind(this);
    this.findNearEmptyCells = this.findNearEmptyCells.bind(this);
    this.copyEmptyCells = this.copyEmptyCells.bind(this);
    this.padBlankCells = this.padBlankCells.bind(this);
    this.rematch = this.rematch.bind(this);

    this.state = initialState;
  }

  findNearEmptyCells(board, row, column) {
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        const isNearCellEmpty = this.state.gameBoard[i] !== undefined && this.state.gameBoard[i][j] !== undefined &&
          board[i][j] !== 'empty' && this.state.gameBoard[i][j] === '';

        if (isNearCellEmpty) {
          board[i][j] = 'empty';
          board = this.findNearEmptyCells(board, i, j);
        }
      }
    }

    return board;
  }

  copyEmptyCells(currentBoard, emptyCells) {
    for (let i = 0; i < emptyCells.length; i++) {
      for (let j = 0; j < emptyCells[i].length; j++) {
        if (emptyCells[i][j] === 'empty') {
          currentBoard[i][j] = '';
        }
      }
    }

    return currentBoard;
  }

  padBlankCells(board) {
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column <= board[row].length; column++) {
        if (board[row][column] === 'empty') {
          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
              if (this.state.gameBoard[i] !== undefined && this.state.gameBoard[i][j] !== undefined &&
                Number.isInteger(this.state.gameBoard[i][j])) {
                board[i][j] = this.state.gameBoard[i][j];
              }
            }
          }
        }
      }
    }

    return board;
  }


  onCellClick(row, column) {
    let currentBoard = [...this.state.currentBoard];
    let score, redScore = this.state.redScore, blueScore = this.state.blueScore;
    let bombs = this.state.bombs;
    const flagAudio = new Audio(require('./kick.wav'));
    const numAudio = new Audio(require('./tink.wav'));

    if (this.state.gameBoard[row][column] === 'X') {
      currentBoard[row][column] = this.state.currentPlayer;
      score = (this.state.currentPlayer === 'Red') ? redScore + 1 : blueScore + 1;
      if (this.state.currentPlayer === 'Red') {
        redScore = score;
      } else {
        blueScore = score;
      }
      flagAudio.play();
      bombs--;
    } else if (this.state.gameBoard[row][column] === '') {
      let tempBoard = this.findNearEmptyCells(currentBoard, row, column);
      tempBoard = this.padBlankCells(tempBoard);
      currentBoard = this.copyEmptyCells(currentBoard, tempBoard);
      numAudio.play();
      this.switchTurns();
    } else if (Number.isInteger(this.state.gameBoard[row][column])) {
      currentBoard[row][column] = this.state.gameBoard[row][column];
      this.switchTurns();
      numAudio.play();
    }

    this.setState({ currentBoard, redScore, blueScore, bombs })
  }

  switchTurns() {
    const currentPlayer = this.state.nextTurn;
    const nextTurn = this.state.currentPlayer;

    this.setState({ currentPlayer, nextTurn })
  }

  rematch(winner) {
    board = initGame()

    let table = new Array(board.length);
    
    table = init();
    
    if (winner === 'Red') {
      initialState.redWins++;
    } else {
      initialState.blueWins++;
    }

    initialState.gameBoard = board;
    initialState.currentBoard = table;

    this.setState(initialState);
  }

  renderRows() {
    return (

      this.state.currentBoard.map((cell, index) => {
        return (<Row player={this.state.currentPlayer} key={index} currentRow={cell} onCellClick={(column) => this.onCellClick(index, column)} />)
      })
    )
  }

  render() {
    if (this.state.redScore === 26 || this.state.blueScore === 26) {
      return (
        <div className="container">
          <Menu bombs={this.state.bombs} currentPlayer={this.state.currentPlayer} red={this.state.redScore}
            blue={this.state.blueScore} redWins={this.state.redWins} blueWins={this.state.blueWins} />
            
          <Victory rematch={(winner) => this.rematch(winner)} player={this.state.currentPlayer} red={this.state.redScore} blue={this.state.blueScore} />
        </div>
      )
    } else {
      return (
        <div className="container">
          <Menu bombs={this.state.bombs} redWins={this.state.redWins} blueWins={this.state.blueWins} 
          currentPlayer={this.state.currentPlayer} red={this.state.redScore} blue={this.state.blueScore} />
          {this.renderRows()}
        </div>
      )
    }
  }
}
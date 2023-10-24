import { saveGameResult } from './fileHandler.js';

class Morpion {
  constructor() {
    this.grid = Array(9).fill(' ');
    this.players = ['X', 'O'];
    this.currentPlayer = this.players[0];
  }

  playMove(position) {
    if (this.isValidMove(position)) {
      this.grid[position] = this.currentPlayer;
      this.togglePlayer();
      return true;
    }
    return false;
  }

  isValidMove(position) {
    return this.grid[position] === ' ';
  }

  checkWin() {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winCombinations) {
      if (this.grid[a] !== ' ' && this.grid[a] === this.grid[b] && this.grid[b] === this.grid[c]) {
        return this.grid[a];
      }
    }

    if (!this.grid.includes(' ')) {
      return 'Tie';
    }

    return null;
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  saveGameResult(result) {
    saveGameResult(result);
  }
}

export default Morpion;

import readline from 'readline';
import Morpion from './morpion.mjs';

class Ihm {
  constructor() {
    this.morpion = new Morpion();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  printGrid() {
    const { grid } = this.morpion;
    console.log(`
     ${grid[0]} | ${grid[1]} | ${grid[2]}
    -----------
     ${grid[3]} | ${grid[4]} | ${grid[5]}
    -----------
     ${grid[6]} | ${grid[7]} | ${grid[8]}
    `);
  }

  startGame() {
    console.log('Bienvenue dans le jeu du morpion !');
    this.playRound();
  }

  playRound() {
    this.printGrid();

    this.rl.question(`Joueur ${this.morpion.currentPlayer}, choisissez une position (0-8): `, (position) => {
      if (this.morpion.playMove(position)) {
        const result = this.morpion.checkWin();

        if (result) {
          this.printGrid();
          if (result === 'Tie') {
            console.log("C'est un match nul !");
          } else {
            console.log(`Le joueur ${result} gagne !`);
            this.morpion.saveGameResult(result);
          }
          this.rl.close();
        } else {
          this.playRound();
        }
      } else {
        console.log('Mouvement invalide. Veuillez réessayer.');
        this.playRound();
      }
    });
  }
}

export { Ihm };

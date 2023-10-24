const fs = require('fs');

function saveGameResult(result) {
  fs.writeFileSync('morpion_results.txt', `Le joueur ${result} a gagné !`, 'utf-8');
}

module.exports = { saveGameResult };

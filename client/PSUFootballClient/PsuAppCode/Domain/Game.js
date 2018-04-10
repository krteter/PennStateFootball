// This class will hold game schedule data that
// will be pulled from an external website
export default class Game {

  constructor(gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) {
    // console.debug('Game.constructor()');
    this.gamedate = gamedate;
    this.gamedatezulu = gamedatezulu;
    this.homeaway = homeaway;
    this.opponentid = opponentid;
    this.opponent = opponent;
    this.href = href;
    this.imgsrc = imgsrc;
    this.result = result;
    this.score = score;
    // console.debug('leaving... Game.constructor()');
  }

}  // end class Game

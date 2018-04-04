// This class will hold game schedule data that
// will be pulled from an external website
export default class Game {

  constructor(gamedate, homeaway, opponent, href, imgsrc, result, score) {
    // console.debug('Game.constructor()');
    this.gamedate = gamedate;
    this.homeaway = homeaway;
    this.opponent = opponent;
    this.href = href;
    this.imgsrc = imgsrc;
    this.result = result;
    this.score = score;
    // console.debug('leaving... Game.constructor()');
  }

}  // end class Game

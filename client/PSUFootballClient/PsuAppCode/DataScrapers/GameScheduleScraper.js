import GameScheduleDao from "../DAO/GameScheduleDao";
import Game from "../Domain/Game";

// By default, we'll scrape schedule for current year (2018).  url variable for previous year is
// also present but commented to allow testing of scrape consistency.  Perhaps we want to scrape
// game schedule for other years also (???)
export const scrapeGameScheduleData = () => {

  console.debug('scrapeGameScheduleData()');

  // For now we will create the Game DB here. In the final version, creation of the
  // DB will probably need to reside in the app service (?) so that the DB remains
  // 'alive' while the appliction is in service
  //let GameSchedule = GameScheduleDao.initGameScheduleDB();
  GameScheduleDao.initGameScheduleDB();

  // Using cheerio module for scraping
  const cheerio = require('react-native-cheerio');
  let url = 'http://www.espn.com/college-football/team/schedule/_/id/213';
  //let url = 'http://www.espn.com/college-football/team/schedule/_/id/213/year/2017';

  return fetch(url)
  .then(response => response.text())
  .then(function(html) {
    let $ = cheerio.load(html);
    let parsedResults = [];
    // Look for string '[class*=team-23]'. This will be our starting
    // point for each line item in the game schedule table
    $('[class*=team-23]').each(function(i, element){
      // Scrape opposing team id
  		let str = $(this).attr('class');
  		let oppid;
  		if (str.substring(0,str.search('even') < 0)) {
  			oppid = str.substring(15,str.length);
  		} else {
  			oppid = str.substring(16,str.length);
  		}
      // Scrape game date; Scrape home or away
      let str2 = $(this).children().text();
      let gamedate;
      let homeaway;
      if (str2.search('@') < 0) {
        gamedate = str2.substring(0,str2.search('vs')).trim();
        homeaway = 'Home';
        // console.debug('gamedate = ' + gamedate);
      } else {
        gamedate = str2.substring(0,str2.search('@')).trim();
        homeaway = 'Away';
        // console.debug('gamedate = ' + gamedate);
      }

      // Convert game date to zulu date format (for add calendar functionality)
      let gamedatezulu;
      let month;
      let day;
      let year = (new Date()).getFullYear();
      let time = 'T18:00:00.000Z';

      // Note: This sequence of if statments may not be pretty... however
      // it works...
      if (gamedate.indexOf('Jan') > 0) {
        month = '01';
        day = gamedate.substring(gamedate.search('Jan')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Feb') > 0) {
        month = '02';
        day = gamedate.substring(gamedate.search('Feb')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Mar') > 0) {
        month = '03';
        day = gamedate.substring(gamedate.search('Mar')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Apr') > 0) {
        month = '04';
        day = gamedate.substring(gamedate.search('Apr')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('May') > 0) {
        month = '05';
        day = gamedate.substring(gamedate.search('May')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Jun') > 0) {
        month = '06';
        day = gamedate.substring(gamedate.search('Jun')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Jul') > 0) {
        month = '07';
        day = gamedate.substring(gamedate.search('Jul')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Aug') > 0) {
        month = '08';
        day = gamedate.substring(gamedate.search('Aug')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Sept') > 0) {
        month = '09';
        day = gamedate.substring(gamedate.search('Sept')+4,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Oct') > 0) {
        month = '10';
        day = gamedate.substring(gamedate.search('Oct')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Nov') > 0) {
        month = '11';
        day = gamedate.substring(gamedate.search('Nov')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else if (gamedate.indexOf('Dec') > 0) {
        month = '12';
        day = gamedate.substring(gamedate.search('Dec')+3,gamedate.length).trim();
        if ((day.length) == 1) {
          day = '0' + day;
        }
        gamedatezulu = year + '-' + month + '-' + day + time;
        //console.debug(gamedatezulu);
      } else {
        gamedatezulu = ''
        console.debug('No dates to convert into zulu format!');
      }

      // Scrape opposing team name
      let opponent = $(this).children().children().children('.team-name').text();
      // Scrape opposing team href and img src
      let opphref = $(this).children().children().children('.team-name').children().attr('href');
      let oppsrc = $(this).children().children().children('.team-logo-small*').children().children().attr('src');
      // Scrape score
      let score = $(this).children().children().children('.score').text();
      // Scrape game win(W) or loss(L)
      let str3 = $(this).children().children().children('.game-status').text();
      let result;
      if (str3.search('@') < 0) {
        result = str3.substring(2);
      } else {
        result = str3.substring(1);
      }
      ////////////////////////////////////////////////////
      // Output scraped data to console - FOR DEBUGGING //
      ////////////////////////////////////////////////////
      // console.log(gamedate);
      // console.log(homeaway);
      // console.log(opponent);
      // console.log(oppid);
      // console.log(opphref);
      // console.log(oppsrc);
      // console.log(result);
      // console.log(score);

      /////////////////////////////////////////////////////////////
      // Insert scraped data into the metadata collection object //
      /////////////////////////////////////////////////////////////
      // let metadata = {
      //   OpponentTeamID: oppid,
      //   GameDate: gamedate,
      //   HomeAway: homeaway,
      //   OpponentTeam: opponent,
      //   OpponentHREF: opphref,
      //   OpponentIMGSRC: oppsrc,
      //   GameResult: result,
      //   GameScore: score
      // };
      //
      // // Push metadata into parsedResults array
      // parsedResults.push(metadata);
      // // Output data array to console
      // console.log(parsedResults);

      /////////////////////////////////////////////////////////////

      // Store game information in game object
      let game = new Game(gamedate, gamedatezulu, homeaway, oppid, opponent, opphref, oppsrc, result, score);

      // Store each game object into parsedResults array
      parsedResults.push(game);
    }); // End loop

    // Clear SQL table
    GameScheduleDao.clearScheduleTbl();

    // Drop SQl table
    // GameScheduleDao.dropScheduleTbl();

    // Store game schedule array into the DB
    GameScheduleDao.addSchedule(parsedResults);

    // SQL Select TEST - Check to see if scraped data is getting into DB
    // GameScheduleDao.testSelect();

    console.debug('leaving... scrapeGameScheduleData()');
  }); // End function()
} // End scrapeGameScheduleData()

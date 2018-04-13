import {SQLite} from "expo";
import Game from "../Domain/Game";
import {AsyncStorage} from 'react-native';
import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";
import {scrapeGameScheduleData} from "./../DataScrapers/GameScheduleScraper";


// smitty - Add for Android Studio emulator database
//          and not use Expo for it
//let SQLite = require('react-native-sqlite-storage');



//  Open the Team Roster Database locally
//  on the device
let psuFootballApp_db = SQLite.openDatabase('PsuFootballApp.db');
let init_Done = false;


//
//  Database Class to hold the Team's Roster
//  of players
//
export default class TeamRosterDao {


    //
    //  Method to create the Database & Player_Table to hold the
    //  roster
    static createTeamRosterDatabase() {

        console.debug('TRDao.createTeamRosterDatabase()');

        //  This will ensure the DB exists on first load
        //  -Create our Table with the following player fields:
        //          name   (Primary Key)
        //          jerseyNum
        //          position
        //          imageUrl
        //          classyear
        //          hometown
        //          highschool
        //          heightWeight
        //          experience
        //          major
        psuFootballApp_db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Player_Table (name TEXT PRIMARY KEY NOT NULL UNIQUE, jerseyNum TEXT, position TEXT, imageUrl TEXT, classyear TEXT, hometown TEXT, heightWeight TEXT, highschool TEXT, experience TEXT, major TEXT);'
            );
              tx.executeSql(
                // Note: Opposing team id that is scraped will be used as the key value in the record
                'CREATE TABLE IF NOT EXISTS schedule (gamedate TEXT PRIMARY KEY NOT NULL UNIQUE, gamedatezulu TEXT, homeaway TEXT, opponentid TEXT, opponent TEXT, href TEXT, imgsrc TEXT, result TEXT, score TEXT);',
                    [], (_, { rows }) => console.debug('TeamRosterDao.initScheduleTbl()....    schedule table created!'), function(e) {console.log("ERROR: " + e.message);}
              );
            tx.executeSql(
                            'CREATE TABLE IF NOT EXISTS global (date INTEGER PRIMARY KEY NOT NULL UNIQUE);'
                        );
            tx.executeSql(
                'select * from Player_Table', [], (_, {rows}) => console.log('Number of rows in Player_table: ' + rows.length)
            );
            tx.executeSql(
                'select * from schedule', [], (_, {rows}) => console.log('Number of rows in schedule: ' + rows.length)
            );
        });

        console.debug('leaving.... createTeamRosterDatabase()');
    };


    //
    //  Method to create & add players to the Player_Table of the database
    //     - We can use this to make sure something exists for testing purposes
    //
    static initializeScrapedPlayers(theResultsFunction, updateDatabase) {

        if(updateDatabase == true){
            try {
              let dbUpdateTime = Date.now().toString();
              AsyncStorage.setItem('@PSUfootballDBupdateDate:key', dbUpdateTime);
              console.debug('Database update timestamp: ' + dbUpdateTime);
            } catch (error) {
              console.debug(error);
            }
            console.debug('TRDao.initializeScrapedPlayers()');

            //  Create Player_Table in database if not  already created
            this.createTeamRosterDatabase();

            //  Scrape the website for the players and their
            //  respective bio data.   They will be added to the
            //  database.
            scrapeTeamRosterData();
            // Scrape game schedule data
            scrapeGameScheduleData();

            //  Get all the players put into the database
            //  by the website scrape
            //this.getAllPlayers(theResultsFunction);

            console.debug('leaving.... initializeScrapedPlayers()');
        }
        else {
            console.debug('Database not updated. Leaving.... initializeScrapedPlayers()');
        }



    };



    //
    //  Method to ADD players to our Player_Table in our database
    //
    static addSinglePlayer(name, jerseyNum, position, imageUrl, classyear,
                           hometown, heightWeight, highschool, experience, major) {

        //console.debug('TRDao.addSinglePlayer()....    ' + name + '  #' + jerseyNum);

        //  Add a single player row to the database
        psuFootballApp_db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Player_Table(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major]
            );
//            tx.executeSql(
//                            'select * from Player_Table', [], (_, {rows}) => console.debug('Contents of Player_Table: ' + JSON.stringify(rows))
//                        );
        });

    };

    static addGameSchedule(gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) {
        console.debug('TeamRosterDao.addGameSchedule()....    ' + opponent);
        psuFootballApp_db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO schedule (gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score],
              function(tx, results) {
                console.debug('insertId: ' + results.insertId + '; rowsAffected: ' + results.rowsAffected);
            }, function(e) {
                             console.log("ERROR: " + e.message);
                           });
//            tx.executeSql(
//                            'select * from Player_Table', [], (_, {rows}) => console.debug('Contents of Player_Table: ' + JSON.stringify(rows))
//                        );
        });


    }


    //
    //  Method to GET all players from our Player_Table in our database
    //
    static getAllPlayers(setResultsFunction) {

        console.debug('TRDao.getPlayers()');

        psuFootballApp_db.transaction(tx => {
                tx.executeSql('SELECT * FROM Player_Table', [], (_, {rows: {_array} }) => {
                    setResultsFunction(_array)
                });
            }
        );
        console.debug('leaving.... getPlayers()');
    };


    //
    //  Method to GET a player from our Player_Table in our database
    //   - the requested player
    //   - the function to call with the player's info as input argument
    //
    static getSinglePlayer(playerName, theResultFunction) {

        console.debug('TRDao.getSinglePlayer()');

        //  TODO:  Need some help here figuring out how to query and return data
        psuFootballApp_db.transaction(tx => {
                tx.executeSql('SELECT * FROM Player_Table WHERE name=?', [playerName], (_, {rows: {_array}}) => {
                    theResultFunction(_array[0])
                });
            }
        );

        console.debug('leaving.... getSinglePlayer()');
    };


    static getPlayersNames(setResultsFunction) {
        psuFootballApp_db.transaction(tx => {
                tx.executeSql('SELECT name, position FROM roster', [], (_, {rows: {_array} }) => {
                    setResultsFunction(_array)
                });
            }
        );
    }

      // CREATE TABLE 'schedule'
//      static initGameScheduleDB(setResultsFunction) {
//        console.debug('TeamRosterDao.initScheduleTbl()');
//        // This will ensure the DB exists on first load
//        psuFootballApp_db.transaction(tx => {
//
//        });
//
//        //setResultsFunction(game);
//        console.debug('leaving... TeamRosterDao.initScheduleTbl()');
//        init_Done = true;
//      };

      
      // SQL Drop (schedule table)
//      static dropScheduleTbl() {
//        console.debug('TeamRosterDao.dropScheduleTbl()');
//       psuFootballApp_db.transaction(tx => {
//          tx.executeSql(
//            'DROP TABLE schedule;'
//          );
//          console.debug('Table SCHEDULE successfully dropped');
//        }, function(e) {
//          console.log("ERROR: " + e.message);
//        });
//        console.debug('leaving... TeamRosterDao.dropScheduleTbl()');
//      }
    
//      // SQL Delete (data)
//      static clearScheduleTbl() {
//        console.debug('TeamRosterDao.clearScheduleTbl()');
//       psuFootballApp_db.transaction(tx => {
//          tx.executeSql(
//            'DELETE FROM schedule;'
//          );
//          console.debug('Table SCHEDULE successfully cleared');
//        }, function(e) {
//          console.log("ERROR: " + e.message);
//        });
//        console.debug('leaving... TeamRosterDao.clearScheduleTbl()');
//      }
    
      // SQL Insert
//      static addSchedule(rows) {
//        if (init_Done = true){
//            console.debug('TeamRosterDao.addSchedule()');
//            psuFootballApp_db.transaction(tx => {
//              rows.forEach(game => {
//                console.debug('Inserting into SCHEDULE table -- OpponentName: ' + game.opponent);
//                tx.executeSql(
//                  'INSERT INTO schedule (gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//                  [game.gamedate, game.gamedatezulu, game.homeaway, game.opponentid, game.opponent, game.href, game.imgsrc, game.result, game.score],
//                  function(tx, results) {
//                    console.debug('insertId: ' + results.insertId + '; rowsAffected: ' + results.rowsAffected);
//                }, function(e) {
//                                 console.log("ERROR: " + e.message);
//                               });
//              });
//            }, );
//            console.debug('leaving... TeamRosterDao.addSchedule()');
//        }
//        else {
//            console.debug('DB not initiated!');
//        }
//
//      };



    
      // SQL Select
      static getSchedule(setResultsFunction) {
        console.debug('TeamRosterDao.getSchedule()');
       psuFootballApp_db.transaction(tx => {
          tx.executeSql('SELECT * FROM schedule', [], (_, {rows: {_array} }) => {
            setResultsFunction(_array)
            console.debug('# of records in SCHEDULE table: ' + _array.length);
          });
        }, function(e) {
          console.log("ERROR: " + e.message);
        });
        console.debug('leaving... TeamRosterDao.getSchedule()');
      }
    
      // TEST SQL SELECT
      static testSelect() {
        console.debug('TeamRosterDao.testSelect()');
       psuFootballApp_db.transaction(tx => {
          tx.executeSql('SELECT * FROM schedule', [], (tx, results) => {
            let len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.debug('Id: ' + row.id + '; OpponentName: ' + row.opponent + '; GameDate: ' + row.gamedate + '; HomeAway: ' + row.homeaway);
            }
          });
        }, function(e) {
          console.log("ERROR: " + e.message);
        });
        console.debug('leaving... TeamRosterDao.testSelect()');
      }

}  // end class TeamRosterDao

import {SQLite} from "expo";
import {AsyncStorage} from 'react-native';
import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";
import {scrapeGameScheduleData} from "./../DataScrapers/GameScheduleScraper";
import OfflineDatabaseDAO from "./OfflineDatabaseDAO";

//Define the database
let psuFootballApp_db = SQLite.openDatabase('PsuFootballApp.db');
//Ensure asynchronous database functions occur synchronously
let init_Done = false;

export default class TeamRosterDao {

    static initializeDatabase(theResultsFunction, updateDatabase) {
        console.debug('TRDao.initializeDatabase()');
        //We determined that the database needed to be updated
        if(updateDatabase == true){
            try {
                //Take the current epoch time and place it in AsyncStorage
                let dbUpdateTime = Date.now().toString();
                AsyncStorage.setItem('@PSUfootballDBupdateDate:key', dbUpdateTime);
                console.debug('Database update timestamp: ' + dbUpdateTime);
            } catch (error) {
                console.debug(error);
            }
            //Populate or update the database
            this.createDatabase();
            //Scrape roster data

            OfflineDatabaseDAO.populateOfflineDatabase();


            scrapeTeamRosterData();
            // Scrape game schedule data
            scrapeGameScheduleData();
            console.debug('leaving.... initializeDatabase()');
        }
        else {
            console.debug('Database not updated. Leaving.... initializeDatabase()');
        }
    };

    static createDatabase() {
        console.debug('DatabaseDAO.createDatabase()');
        //One database transaction to rule them all
        psuFootballApp_db.transaction(tx => {
            //Create the player table
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Player_Table (name TEXT PRIMARY KEY NOT NULL UNIQUE, jerseyNum TEXT, position TEXT, imageUrl TEXT, classyear TEXT, hometown TEXT, heightWeight TEXT, highschool TEXT, experience TEXT, major TEXT, recruitURL TEXT);'
            );
            //Create the schedule database
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS schedule (gamedate TEXT PRIMARY KEY NOT NULL UNIQUE, gamedatezulu TEXT, homeaway TEXT, opponentid TEXT, opponent TEXT, href TEXT, imgsrc TEXT, result TEXT, score TEXT);',
                    [], (_, { rows }) => console.debug('TeamRosterDao.initScheduleTbl()....    schedule table created!'), function(e) {console.log("ERROR: " + e.message);}
            );
            //Debug code shows the number of rows in the Player_Table
            tx.executeSql(
                'select * from Player_Table', [], (_, {rows}) => console.log('Number of rows in Player_table: ' + rows.length)
            );
            //Debug code shows the number of rows in the schedule
            tx.executeSql(
                'select * from schedule', [], (_, {rows}) => console.log('Number of rows in schedule: ' + rows.length)
            );
        });
        console.debug('leaving.... createDatabase()');
    };

    //Add a player to the Player_Table table. See scrapeTeamRosterData() and RosterScraper.js
    static addSinglePlayer(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major, recruitURL) {
        console.debug('DatabaseDAO.addSinglePlayer()....    ' + name + '  #' + jerseyNum);
        psuFootballApp_db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Player_Table(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major, recruitURL) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major, recruitURL],
                function(tx, results) {
                console.debug('insertId: ' + results.insertId + '; rowsAffected: ' + results.rowsAffected);
                }, function(e) {
                    console.log("ERROR: " + e.message);
                    console.log("Record likely exists.")
                   }

            );
        });
    };







    //Add a game to the schedule table. See scrapeGameScheduleData() and GameScheduleScraper.js
    static addGameSchedule(gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) {
        console.debug('DatabaseDAO.addGameSchedule()....    ' + opponent + '\n' + gamedatezulu);
        psuFootballApp_db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO schedule (gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score],
//                function(tx, results) {
//                console.debug('insertId: ' + results.insertId + '; rowsAffected: ' + results.rowsAffected);
//                }, function(e) {
//                    console.log("ERROR: " + e.message);
//                    console.log("Record likely exists.")
//                   }
            );
        });
    }


    //Gets all players when the roster button is clicked. See RosterSectionList.js
    static getAllPlayers(setResultsFunction) {
        console.debug('DatabaseDAO.getPlayers()');
        psuFootballApp_db.transaction(tx => {
                tx.executeSql('SELECT * FROM Player_Table', [], (_, {rows: {_array} }) => {
                    setResultsFunction(_array)
                });
            }
        );
        console.debug('leaving.... getPlayers()');
    };

    //Get a single player when their name is clicked in RosterSectionList.js
    static getSinglePlayer(playerName, theResultFunction) {
        console.debug('DatabaseDAO.getSinglePlayer().... ' + playerName);
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
    
    //It does what it says it does
    static getSchedule(setResultsFunction) {
    console.debug('DatabaseDAO.getSchedule()');
    psuFootballApp_db.transaction(tx => {
        tx.executeSql('SELECT * FROM schedule', [], (_, {rows: {_array} }) => {
            setResultsFunction(_array)
            //Debug code to make sure we aren't creating extra records
            console.debug('# of records in SCHEDULE table: ' + _array.length);
      });
    }, function(e) {
      console.log("ERROR: " + e.message);
    });
    console.debug('leaving... DatabaseDAO.getSchedule()');
    }
}

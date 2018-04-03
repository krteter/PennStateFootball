import {SQLite} from "expo";
import Game from "../Domain/Game";

//let SQLite = require('react-native-sqlite-storage');
let psuFootballApp_db = SQLite.openDatabase('Game.db');

export default class GameScheduleDao {

  // CREATE TABLE 'schedule'
  static initGameScheduleDB() {
    console.debug('GameScheduleDao.initScheduleTbl()');
    // This will ensure the DB exists on first load
      psuFootballApp_db.transaction(tx => {
      tx.executeSql(
        // Note: Opposing team id that is scraped will be used as the key value in the record
        'CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY NOT NULL UNIQUE, gamedate TEXT, homeaway TEXT, opponent TEXT, href TEXT, imgsrc TEXT, result TEXT, score TEXT);'
      );
      console.debug('Table created');
    });
    ////////////////////////////////
    // Do not need this stuff below
    ////////////////////////////////
    // psuFootballApp_db.transaction(tx => {
    //     tx.executeSql(
    //         'DELETE FROM roster;'
    //     );
    // });
    // psuFootballApp_db.transaction(tx => {
    //     tx.executeSql(
    //         'DROP TABLE roster;'
    //     );
    // });
    ////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////
    // TODO: remove this before prod we'll use some other process to load data into the
    // db, but this will make sure something exists for testing now
    ////////////////////////////////////////////////////////////////////////////////////
    // let player = new Player('Test Player', 'QB', 'A test player description.');
    // player.id = 1;
    // let player2 = new Player('Test2 Player2', 'CB', 'Another test player description.');
    // player2.id = 2;
    // let players = [player, player2];
    // players.forEach(player =>
    //   {
    //     psuFootballApp_db.transaction(tx => {
    //       tx.executeSql(
    //         'INSERT OR IGNORE INTO roster(id, name, position, description) VALUES (?, ?, ?, ?)',
    //         [player.id, player.name, player.position, player.description]
    //       )
    //     })
    //   }
    // );
    // End remove this
    //setResultsFunction(game);
    ////////////////////////////////////////////////////////////////////////////////////

    console.debug('leaving... GameScheduleDao.initGameScheduleDB()');
  };

  // SQL Insert
  static addSchedule(rows) {
    console.debug('GameScheduleDao.addSchedule()');
      psuFootballApp_db.transaction(tx => {
      rows.forEach(game => {
        tx.executeSql(
          'INSERT INTO schedule (id, gamedate, homeaway, opponent, href, imgsrc, result, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [game.opponentid, game.gamedate, game.homeaway, game.opponent, game.href, game.imgsrc, game.result, game.score]
        );
      });
    });
    console.debug('leaving... GameScheduleDao.addSchedule()');
  };

  // SQL Select
  static getSchedule(setResultsFunction) {
    console.debug('GameScheduleDao.getSchedule()');
      psuFootballApp_db.transaction(tx => {
      tx.executeSql('SELECT * FROM schedule', [], (_, {rows: {_array} }) => {
        setResultsFunction(_array)
      });
    });
    console.debug('leaving... GameScheduleDao.getSchedule()');
  }

  // // Query the success callback
  // function querySuccess(tx, results) {
  //   console.log("Returned rows = " + results.rows.length);
  //   // This will be true since it was a select statement
  //   // and so rowsAffected was 0
  //   if (!results.rowsAffected) {
  //     console.log('No rows affected!');
  //     return false;
  //   }
  //   // For an insert statement, this property will return
  //   // the ID of the last inserted row
  //   console.log("Last inserted row ID = " + results.insertId);
  // }
  //
  // // Transaction error callback
  // function queryError(err) {
  //   console.log("Error processing SQL: "+err.code);
  // }

}

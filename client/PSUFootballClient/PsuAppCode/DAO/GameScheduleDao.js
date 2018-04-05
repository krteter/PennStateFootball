//import {SQLite} from "expo";
import Game from "../Domain/Game";


// smitty - Add for Android Studio emulator database
//          and not use Expo for it
let SQLite = require('react-native-sqlite-storage');

let db = SQLite.openDatabase('Game.db');


export default class GameScheduleDao {

  // CREATE TABLE 'schedule'
  static initGameScheduleDB(setResultsFunction) {
    console.debug('GameScheduleDao.initScheduleTbl()');
    // This will ensure the DB exists on first load
    db.transaction(tx => {
      tx.executeSql(
        // Note: Opposing team id that is scraped will be used as the key value in the record
        'CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY NOT NULL UNIQUE, gamedate TEXT, homeaway TEXT, opponent TEXT, href TEXT, imgsrc TEXT, result TEXT, score TEXT);'
      );
    }, function(e) {
      console.log("ERROR: " + e.message);
    });

    // Don't need this...
    // db.transaction(tx => {
    //     tx.executeSql(
    //         'DROP TABLE roster;'
    //     );
    // });

    //setResultsFunction(game);
    console.debug('leaving... GameScheduleDao.initScheduleTbl()');
  };

  // SQL Delete (data)
  static clearGameScheduleDB() {
    console.debug('GameScheduleDao.clearGameScheduleDB()');
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM schedule;'
      );
      console.debug('Table SCHEDULE successfully cleared');
    }, function(e) {
      console.log("ERROR: " + e.message);
    });
    console.debug('leaving... GameScheduleDao.clearGameScheduleDB()');
  }

  // SQL Insert
  static addSchedule(rows) {
    console.debug('GameScheduleDao.addSchedule()');
    db.transaction(tx => {
      rows.forEach(game => {
        console.debug('Inserting into SCHEDULE table -- OpponentName: ' + game.opponent);
        tx.executeSql(
          'INSERT INTO schedule (gamedate, homeaway, opponent, href, imgsrc, result, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [game.gamedate, game.homeaway, game.opponent, game.href, game.imgsrc, game.result, game.score],
          function(tx, results) {
            // console.debug('insertId: ' + results.insertId + '; rowsAffected: ' + results.rowsAffected);
        });
      });
    }, function(e) {
      console.log("ERROR: " + e.message);
    });
    console.debug('leaving... GameScheduleDao.addSchedule()');
  };

  // SQL Select
  static getSchedule(setResultsFunction) {
    console.debug('GameScheduleDao.getSchedule()');
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM schedule', [], (_, {rows: {_array} }) => {
        setResultsFunction(_array)
        console.debug('# of records in SCHEDULE table: ' + _array.length);
      });
    }, function(e) {
      console.log("ERROR: " + e.message);
    });
    console.debug('leaving... GameScheduleDao.getSchedule()');
  }

  // TEST SQL SELECT
  static testSelect() {
    console.debug('GameScheduleDao.testSelect()');
    db.transaction(tx => {
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
    console.debug('leaving... GameScheduleDao.testSelect()');
  }
}

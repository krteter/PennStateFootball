//import {SQLite} from "expo";
//import Game from "../Domain/Game";
//
////let SQLite = require('react-native-sqlite-storage');
//// let db = SQLite.openDatabase('PsuFootballApp.db');
//let db = SQLite.openDatabase('Game.db');
//
//export default class GameScheduleDao {
//
//  // CREATE TABLE 'schedule'
//  static initGameScheduleDB(setResultsFunction) {
//    console.debug('GameScheduleDao.initScheduleTbl()');
//    // This will ensure the DB exists on first load
//    db.transaction(tx => {
//      tx.executeSql(
//        // Note: Opposing team id that is scraped will be used as the key value in the record
//        'CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY NOT NULL UNIQUE, gamedate TEXT, gamedatezulu TEXT, homeaway TEXT, opponentid TEXT, opponent TEXT, href TEXT, imgsrc TEXT, result TEXT, score TEXT);'
//      );
//    }, function(e) {
//      console.log("ERROR: " + e.message);
//    });
//
//    //setResultsFunction(game);
//    console.debug('leaving... GameScheduleDao.initScheduleTbl()');
//  };
//
//  // SQL Drop (schedule table)
//  static dropScheduleTbl() {
//    console.debug('GameScheduleDao.dropScheduleTbl()');
//    db.transaction(tx => {
//      tx.executeSql(
//        'DROP TABLE schedule;'
//      );
//      console.debug('Table SCHEDULE successfully dropped');
//    }, function(e) {
//      console.log("ERROR: " + e.message);
//    });
//    console.debug('leaving... GameScheduleDao.dropScheduleTbl()');
//  }
//
//  // SQL Delete (data)
//  static clearScheduleTbl() {
//    console.debug('GameScheduleDao.clearScheduleTbl()');
//    db.transaction(tx => {
//      tx.executeSql(
//        'DELETE FROM schedule;'
//      );
//      console.debug('Table SCHEDULE successfully cleared');
//    }, function(e) {
//      console.log("ERROR: " + e.message);
//    });
//    console.debug('leaving... GameScheduleDao.clearScheduleTbl()');
//  }
//
//  // SQL Insert
//  static addSchedule(rows) {
//    console.debug('GameScheduleDao.addSchedule()');
//    db.transaction(tx => {
//      rows.forEach(game => {
//        console.debug('Inserting into SCHEDULE table -- OpponentName: ' + game.opponent);
//        tx.executeSql(
//          'INSERT INTO schedule (gamedate, gamedatezulu, homeaway, opponentid, opponent, href, imgsrc, result, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//          [game.gamedate, game.gamedatezulu, game.homeaway, game.opponentid, game.opponent, game.href, game.imgsrc, game.result, game.score],
//          function(tx, results) {
//            // console.debug('insertId: ' + results.insertId + '; rowsAffected: ' + results.rowsAffected);
//        });
//      });
//    }, function(e) {
//      console.log("ERROR: " + e.message);
//    });
//    console.debug('leaving... GameScheduleDao.addSchedule()');
//  };
//
//  // SQL Select
//  static getSchedule(setResultsFunction) {
//    console.debug('GameScheduleDao.getSchedule()');
//    db.transaction(tx => {
//      tx.executeSql('SELECT * FROM schedule', [], (_, {rows: {_array} }) => {
//        setResultsFunction(_array)
//        console.debug('# of records in SCHEDULE table: ' + _array.length);
//      });
//    }, function(e) {
//      console.log("ERROR: " + e.message);
//    });
//    console.debug('leaving... GameScheduleDao.getSchedule()');
//  }
//
//  // TEST SQL SELECT
//  static testSelect() {
//    console.debug('GameScheduleDao.testSelect()');
//    db.transaction(tx => {
//      tx.executeSql('SELECT * FROM schedule', [], (tx, results) => {
//        let len = results.rows.length;
//        for (let i = 0; i < len; i++) {
//          let row = results.rows.item(i);
//          console.debug('Id: ' + row.id + '; OpponentName: ' + row.opponent + '; GameDate: ' + row.gamedate + '; HomeAway: ' + row.homeaway);
//        }
//      });
//    }, function(e) {
//      console.log("ERROR: " + e.message);
//    });
//    console.debug('leaving... GameScheduleDao.testSelect()');
//  }
//}

import React from 'react';
import {SQLite} from "expo";
import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";

// smitty - Add for Android Studio emulator database
//          and not use Expo for it
//let SQLite = require('react-native-sqlite-storage');



//  Open the Team Roster Database locally
//  on the device
let psuFootballApp_db = SQLite.openDatabase('PsuFootballApp.db');
let roster_created === false;

export default class Dao {

    createTeamRosterDatabase() {

        console.debug('Dao.createTeamRosterDatabase()');

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
        });

        console.debug('leaving.... createTeamRosterDatabase()');
    };

}
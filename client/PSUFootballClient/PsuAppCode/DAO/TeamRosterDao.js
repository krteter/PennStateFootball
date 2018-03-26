import {SQLite} from "expo";
import TeamPlayer from "../Domain/TeamPlayer";

import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";


// smitty - Add for Android Studio emulator database
//          and not use Expo for it
//let SQLite = require('react-native-sqlite-storage');



//  Open the Team Roster Database locally
//  on the device
let team_db = SQLite.openDatabase('teamRoster.db');


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
        team_db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Player_Table (name TEXT PRIMARY KEY NOT NULL UNIQUE, jerseyNum TEXT, position TEXT, imageUrl TEXT, classyear TEXT, hometown TEXT, heightWeight TEXT, highschool TEXT, experience TEXT, major TEXT);'
            );
        });

        console.debug('leaving.... createTeamRosterDatabase()');
    };


/************


    //
    //  Method to create & add players to the Player_Table of the database
    //     - We can use this to make sure something exists for testing purposes
    //

    static initPlayers(setResultsFunction) {

        console.debug('TRDao.initPlayers()');

        //  Create Player_Table in database if not  already created
        this.createTeamRosterDatabase();


        //TODO remove this before prod we'll use some other process to load data into the db, but this will make sure something exists for testing now
        let teamplayer1 = new TeamPlayer('Tiger Woods', '44', 'GF', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg', 'Senior', 'Jupiter, FL', '6-2/186', 'Stanford', 'SR', 'Presidents Cup Captain');
        let teamplayer2 = new TeamPlayer('Phil Mickelson', '47', 'GF', 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_190,q_auto,r_max,w_190/headshots_01810.png', 'Junior', 'Carlisbad, CA', '6-0/195', 'Arizona St', 'JR', 'Ryder Cup Team Member');
        let teamplayer3 = new TeamPlayer('Brad Faxon', '56', 'GF', 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_190,q_auto,r_max,w_190/headshots_01810.png', 'Junior', 'Carlisbad, CA', '6-0/195', 'Arizona St', 'JR', 'Ryder Cup Team Member');

        let teamplayers = [teamplayer1, teamplayer2, teamplayer3];

        //  Loop thru above player array and add player
        //  to the Player_Table database
        teamplayers.forEach(player =>
            {
                team_db.transaction(tx => {
                    tx.executeSql(
                        'INSERT OR IGNORE INTO Player_Table(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [player.name, player.jerseyNum, player.position, player.imageUrl, player.classyear, player.hometown, player.heightWeight, player.highschool, player.experience, player.major]
                    );
                });
            }
        );

        setResultsFunction(teamplayers);

        console.debug('leaving.... initPlayers()');

    };


 ***********/





    //
    //  Method to create & add players to the Player_Table of the database
    //     - We can use this to make sure something exists for testing purposes
    //
    static initializeScrapedPlayers(theResultsFunction) {

        console.debug('TRDao.initializeScrapedPlayers()');


        //  Create Player_Table in database if not  already created
        this.createTeamRosterDatabase();

        //  Scrape the website for the players and their
        //  respective bio data.   They will be added to the
        //  database.
        scrapeTeamRosterData();


        //  Get all the players put into the database
        //  by the website scrape
        this.getAllPlayers(theResultsFunction);


        console.debug('leaving.... initializeScrapedPlayers()');

    };



    //
    //  Method to ADD players to our Player_Table in our database
    //
    static addSinglePlayer(name, jerseyNum, position, imageUrl, classyear,
                           hometown, heightWeight, highschool, experience, major) {

        console.debug('TRDao.addSinglePlayer()....    ' + name + '  #' + jerseyNum);

        //  Add a single player row to the database
        team_db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Player_Table(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major]
            );
        });

    };


    //
    //  Method to GET all players from our Player_Table in our database
    //
    static getAllPlayers(setResultsFunction) {

        console.debug('TRDao.getPlayers()');

        team_db.transaction(tx => {
            // tx.executeSql('SQL QUERY HERE where name = ?', [AnyParametersToMatchThe?], functionToReturnTheResultSetTo);
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
        team_db.transaction(tx => {
                tx.executeSql('SELECT * FROM Player_Table WHERE name=?', [playerName], (_, {rows: {_array}}) => {
                    theResultFunction(_array[0])
                });
            }
        );

        console.debug('leaving.... getSinglePlayer()');
    };




}  // end class TeamRosterDao

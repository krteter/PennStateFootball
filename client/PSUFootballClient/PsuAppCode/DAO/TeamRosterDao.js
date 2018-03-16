import {SQLite} from "expo";
import TeamPlayer from "../Domain/TeamPlayer";


// smitty - Add for Android Studio emulator
//let SQLite = require('react-native-sqlite-storage');

let team_db = SQLite.openDatabase('teamRoster.db');


export default class TeamRosterDao {

    static initPlayers(setTeamResultsFunction) {

        console.debug('TeamRosterDao.initPlayers()');

        //  This will ensure the DB exists on first load
        //  -Create our Table with the following player fields:
        //          name
        //          jerseyNum
        //          position
        //          bioUrl
        //          imageUrl
        //          classyear
        //          hometown
        //          highschool
        //          heightWeight
        //          experience
        //          major
        team_db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS teamrosterTable (id INTEGER PRIMARY KEY NOT NULL UNIQUE, name TEXT, jerseyNum TEXT, position TEXT, bioUrl TEXT, imageUrl TEXT, classyear TEXT, hometown TEXT, heightWeight TEXT, highschool TEXT, experience TEXT, major TEXT);'
            );
        });

        // team_db.transaction(tx => {
        //     tx.executeSql(
        //         'DELETE FROM teamrosterTable;'
        //     );
        // });
        // team_db.transaction(tx => {
        //     tx.executeSql(
        //         'DROP TABLE teamrosterTable;'
        //     );
        // });

        //TODO remove this before prod we'll use some other process to load data into the db, but this will make sure something exists for testing now
        let teamplayer1 = new TeamPlayer('Tiger Woods', '44', 'GF', 'http://www.gopsusports.com/sports/m-footbl/mtt/mark_allen_905734.html', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg', 'Senior', 'Jupiter, FL', '6-2/186', 'Stanford', 'SR', 'Presidents Cup Captain');
        teamplayer1.id = 4;
        let teamplayer2 = new TeamPlayer('Phil Mickelson', '47', 'GF', 'http://www.gopsusports.com/sports/m-footbl/mtt/mark_allen_905734.html', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg', 'Junior', 'Carlisbad, CA', '6-0/195', 'Arizona St', 'JR', 'Ryder Cup Team Member');
        teamplayer2.id = 5;
        let teamplayers = [teamplayer1, teamplayer2];

        //  Loop thru above player array and add player
        //  to the teamrosterTable database
        teamplayers.forEach(player =>
            {
                team_db.transaction(tx => {
                    tx.executeSql(
                        'INSERT OR IGNORE INTO teamrosterTable(name, jerseyNum, position, bioUrl, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [player.id, player.name, player.jerseyNum, player.position, player.bioUrl, player.imageUrl, player.classyear, player.hometown, player.heightWeight, player.highschool, player.experience, player.major]
                    )
                })
            }
        );
        // end remove this

        setTeamResultsFunction(teamplayers);
        console.debug('leaving.... initPlayers()');
    };


    //
    //  Method to ADD players to our teamrosterTable in our database
    //
    static addPlayers(rows) {

        console.debug('TeamRosterDao.addPlayers()');

        team_db.transaction(tx => {
            rows.forEach(player => {
                tx.executeSql(
                    'insert into teamrosterTable(name, jerseyNum, position, bioUrl, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [player.name, player.jerseyNum, player.position, player.bioUrl, player.imageUrl, player.classyear, player.hometown, player.heightWeight, player.highschool, player.experience, player.major]
                );
            });
        });
        console.debug('leaving.... getPlayers()');
    };



    //
    //  Method to GET players from our teamrosterTable in our database
    //
    static getPlayers(setResultsFunction) {

        console.debug('TeamRosterDao.getPlayers()');

        team_db.transaction(tx => {
                tx.executeSql('SELECT * FROM teamrosterTable', [], (_, {rows: {_array} }) => {
                    setResultsFunction(_array)
                });
            }
        );
        console.debug('leaving.... getPlayers()');
    }
}

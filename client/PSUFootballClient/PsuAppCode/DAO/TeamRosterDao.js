import {SQLite} from "expo";
import TeamPlayer from "../Domain/TeamPlayer";


// smitty - Add for Android Studio emulator
//let SQLite = require('react-native-sqlite-storage');

let team_db = SQLite.openDatabase('teamRoster.db');


export default class TeamRosterDao {

    static createTeamRosterDatabase() {

        console.debug('TRDao.createTeamRosterDatabase()');

        //  This will ensure the DB exists on first load
        //  -Create our Table with the following player fields:
        //          name
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



    static initPlayers(setTeamResultsFunction) {

        console.debug('TRDao.initPlayers()');

        //  This will ensure the DB exists on first load
        //  -Create our Table with the following player fields:
        //          name
        //          jerseyNum
        //          position
        //          imageUrl
        //          classyear
        //          hometown
        //          highschool
        //          heightWeight
        //          experience
        //          major
//        team_db.transaction(tx => {
//            tx.executeSql(
//                'CREATE TABLE IF NOT EXISTS Player_Table (name TEXT PRIMARY KEY NOT NULL UNIQUE, jerseyNum TEXT, position TEXT, imageUrl TEXT, classyear TEXT, hometown TEXT, heightWeight TEXT, highschool TEXT, experience TEXT, major TEXT);'
//            );
//        });



        //TODO remove this before prod we'll use some other process to load data into the db, but this will make sure something exists for testing now
        let teamplayer1 = new TeamPlayer('Tiger Woods', '44', 'GF', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg', 'Senior', 'Jupiter, FL', '6-2/186', 'Stanford', 'SR', 'Presidents Cup Captain');
        //teamplayer1.id = 4;
        let teamplayer2 = new TeamPlayer('Phil Mickelson', '47', 'GF', 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_190,q_auto,r_max,w_190/headshots_01810.png', 'Junior', 'Carlisbad, CA', '6-0/195', 'Arizona St', 'JR', 'Ryder Cup Team Member');
        //teamplayer2.id = 5;
        let teamplayer3 = new TeamPlayer('Brad Faxon', '56', 'GF', 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_190,q_auto,r_max,w_190/headshots_01810.png', 'Junior', 'Carlisbad, CA', '6-0/195', 'Arizona St', 'JR', 'Ryder Cup Team Member');
        //teamplayer2.id = 6;
        let teamplayers = [teamplayer1, teamplayer2, teamplayer3];

        //  Loop thru above player array and add player
        //  to the Player_Table database
        teamplayers.forEach(player =>
            {
                team_db.transaction(tx => {
                    tx.executeSql(
                        'INSERT OR IGNORE INTO Player_Table(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [player.name, player.jerseyNum, player.position, player.imageUrl, player.classyear, player.hometown, player.heightWeight, player.highschool, player.experience, player.major]
                    )
                })
            }
        );
        // end remove this

        setTeamResultsFunction(teamplayers);
        console.debug('leaving.... initPlayers()');
        console.debug('       .... ');
    };


    //
    //  Method to ADD players to our Player_Table in our database
    //
    static addPlayers(rows) {

        console.debug('TRDao.addPlayers()');

        team_db.transaction(tx => {
            rows.forEach(player => {
                tx.executeSql(
                    'INSERT INTO Player_Table(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [player.name, player.jerseyNum, player.position, player.imageUrl, player.classyear, player.hometown, player.heightWeight, player.highschool, player.experience, player.major]
                );
            });
        });
        console.debug('leaving.... addPlayers()');
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
        //console.debug('leaving.... addSinglePlayer()');
    };


    //
    //  Method to GET players from our Player_Table in our database
    //
    static getPlayers(setResultsFunction) {

        console.debug('TRDao.getPlayers()');

        team_db.transaction(tx => {
            // tx.executeSql('SQL QUERY HERE where name = ?', [AnyParametersToMatchThe?], functionToReturnTheResultSetTo);
                tx.executeSql('SELECT * FROM Player_Table', [], (_, {rows: {_array} }) => {
                    setResultsFunction(_array)
                });
            }
        );
        console.debug('leaving.... getPlayers()');
        console.debug('       .............');
    };


    //
    //  Method to GET players from our Player_Table in our database
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


//        let player = new TeamPlayer('Arnold Palmer', '83', 'GF',
//                                    'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg',
//                                    'Senior', 'Latrobe, PA', '5-10/186', 'Wake Forest', 'SR', '4 Time Masters Champion');

//        let theTeamPlayer =  new TeamPlayer('Rory McIlroy', '29', 'GF', 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_190,q_auto,r_max,w_190/headshots_28237.png', 'Junior', 'Dublin Ireland', '6-0/195', 'European Tour', 'Fr', 'Arnold Palmer Invitational Champion');

        //  call the function with the respective 'Player' object & data
//        theResultFunction(theTeamPlayer);

        console.debug('leaving.... getSinglePlayer()');
    };










}  // end class TeamRosterDao

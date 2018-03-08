import {SQLite} from "expo";

let db = SQLite.openDatabase('football.db');

export default class RosterDao {

    static initPlayers(setResultsFunction) {
        console.debug('RosterDao.initPlayers()');
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS roster (id INTEGER PRIMARY KEY NOT NULL, name TEXT, position TEXT, description TEXT);'
            );
        });
        // //TODO remove this - this is test data - we'll use some other process to load data into the db
        // let player = new Player('Test Player', 'QB', 'A test player description.');
        // let player2 = new Player('Test2 Player2', 'CB', 'Another test player description.');
        // let players = [player, player2];
        // this.addPlayers(players);
        //
        // // end remove this
        //setResultsFunction(players);
    };

    static addPlayers(rows) {
        db.transaction(tx => {
            rows.forEach(player => {
                tx.executeSql(
                    'insert into roster(name, position, description) values (?, ?, ?)', [player.name, player.position, player.description]
                );
            });
        });
    };

    static getPlayers(setResultsFunction) {
        console.debug('RosterDao.getPlayers()');
        db.transaction(tx => {
                tx.executeSql('SELECT * FROM roster', [], (_, {rows: {_array} }) => {
                    setResultsFunction(_array)
                });
            }
        );
        console.debug('leaving...')
    }
}

import {SQLite} from "expo";
import Player from "../Domain/Player";

let db = SQLite.openDatabase('football.db');

export default class RosterDao {

    static initPlayers(setResultsFunction) {
        console.debug('RosterDao.initPlayers()');
        //this will ensure the DB exists on first load
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS roster (id INTEGER PRIMARY KEY NOT NULL UNIQUE, name TEXT, position TEXT, description TEXT);'
            );
        });
        // db.transaction(tx => {
        //     tx.executeSql(
        //         'DELETE FROM roster;'
        //     );
        // });
        // db.transaction(tx => {
        //     tx.executeSql(
        //         'DROP TABLE roster;'
        //     );
        // });

        //TODO remove this before prod we'll use some other process to load data into the db, but this will make sure something exists for testing now
        let player = new Player('Test Player', 'QB', 'A test player description.');
        player.id = 1;
        let player2 = new Player('Test2 Player2', 'CB', 'Another test player description.');
        player2.id = 2;
        let players = [player, player2];
        players.forEach(player =>
            {
                db.transaction(tx => {
                    tx.executeSql(
                        'INSERT OR IGNORE INTO roster(id, name, position, description) VALUES (?, ?, ?, ?)',
                        [player.id, player.name, player.position, player.description]
                    )
                })
            }
        );
        // end remove this

        setResultsFunction(players);
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

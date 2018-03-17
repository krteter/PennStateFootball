import React from 'react';
import RosterDao from "../DAO/RosterDao";

//example test for a component to render
test('Initializes DB correctly', () => {
    const tree = RosterDao.initPlayers((players) => {
        expect(players.length <= 0);
    });
    //expect(tree.length > 10);
});

test('Add some players', () => {
   const player = {
       id: 5000,
       name: 'test name',
       position: 'Test',
       description: 'Test Desc'
   };
   const players = [player];
   RosterDao.addPlayers(players);
   // make sure the player was added and is equal to the test player
    // expect()
});

test('getPlayers', () => {
   // get the players - are there any?  how many?
    RosterDao.getPlayers((players) => {
        expect(players.length <= 0);
    });
});

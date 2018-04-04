import React from 'react';
import TeamRosterDao from "../DAO/TeamRosterDao";



//example test for a component to render
test('Initializes DB correctly', () => {

    //  Create the table in our database
    TeamRosterDao.createTeamRosterDatabase();

    const tree = TeamRosterDao.initPlayers((players) => {
        expect(players.length <= 0);
    });
    //expect(tree.length > 10);
});


test('Add a player', () => {

    const test_player = {

        name: "Phil Mickelson",
        jerseyNum: "1",
        position: 'Glfr',
        imageUrl: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_190,q_auto,r_max,w_190/headshots_01810.png',
        classyear: 'SR',
        hometown: 'Carlisbad, CA',
        heightWeight: '6-0',
        highschool: 'Arizona State',
        experience: 'Ryder Cup Captain',
        major: 'Psychology',
    }

    //  Add a test player to the roster table of the database
    TeamRosterDao.addSinglePlayer(test_player.name,
                                  test_player.jerseyNum,
                                  test_player.position,
                                  test_player.imageUrl,
                                  test_player.classyear,
                                  test_player.hometown,
                                  test_player.heightWeight,
                                  test_player.highschool,
                                  test_player.experience,
                                  test_player.major);


    // make sure the player was added and is equal to the test player
    // expect()
});

test('Get a player', () => {

   // TeamRosterDao.getSinglePlayer(playerName, theResultFunction);


    // get the players - are there any?  how many?
    TeamRosterDao.getPlayers((players) => {
        expect(players.length <= 0);
    });
});

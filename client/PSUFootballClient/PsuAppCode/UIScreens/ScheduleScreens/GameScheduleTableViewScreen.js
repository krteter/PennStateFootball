import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image, ImageBackground } from 'react-native';
import { Table, TableWrapper, Row, Col, Rows, Cell } from 'react-native-table-component';

import GameScheduleDao from "../../DAO/GameScheduleDao";
import Game from "../../Domain/Game";


export default class GameScheduleTableViewScreen extends Component {


    //    Website reference for a TABLE
    //
    //      https://www.npmjs.com/package/react-native-table-component
    //
    //        stole their example with a button and started adding
    //        some of our stuff to see if it will work...


    constructor(props) {
        super(props);

        const imageItem = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80';

//        const elementButton = (value) => (
//            <TouchableOpacity onPress={() => this._alertIndex(value)}>
//                <View style={styles.btn}>
//                    <Text style={styles.btnText}>button</Text>
//                </View>
//            </TouchableOpacity>
//        );



        const cellImage = (value) => (

            <Image style={styles.imagestyle}  source={{uri: imageItem}} tableIconCol
            />
        );


        this.state = {

            //   we could maybe lose the header... but for now... it gives a sense of where things line
            //   up in the rendered table.   If we want the GameSchedule to be a scrolling list of games,
            //   we could lose the header and if we dont have separators in the table as lines... then
            //   we could 'fake' out a table to look like a bunch of scrolling "rows" of game info.
            //   Just a thought.
            tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7'],

            //  Hard coded these database fields in here for now.  Just to see if I could get them
            //  to show up in the table.   At some point we can pull in from the database and populate
            //  this tableData array.   But again... babysteps.   that could be a separate task rather
            //  than the render task below.
            tableData: [
                ['Sept 1' , '3:01pm',  'Appalachian St.', 'Home', 'A2Cal', 'FTick'],
                ['Sept 2' , '3:02pm',  'Pittsburgh', 'Away', 'A2Cal', 'FTick'],
                ['Sept 3' , '3:03pm', 'Kent State', 'Home', 'A2Cal', 'FTick'],
                ['Sept 4' , '3:04pm',  'Purdue St.', 'Home', 'A2Cal', 'FTick'],
                ['Sept 11' , '3:05pm',  'Appalachian St.', 'Home', 'A2Cal', 'FTick'],
                ['Sept 14' , '3:06pm',  'Wisconsin', 'Away', 'A2Cal', 'FTick'],
                ['Sept 18' , '3:07pm',  'USC', 'Away', 'A2Cal', 'FTick'],
                ['Sept 29' , '3:08pm', 'Ball State', 'Home', 'A2Cal', 'FTick'],
                ['Oct 13' , '3:09pm',  'Ohio State', 'Away', 'A2Cal', 'FTick'],
                ['Oct 22' , '4:00pm',  'NY State', 'Away', 'A2Cal', 'FTick'],
                ['Nov 1' , '5:00pm',  'Maryland', 'Home', 'A2Cal', 'FTick'],
                ['Nov 12' , '6:00pm',   'Virginia Tech', 'Away', 'A2Cal', 'FTick'],
                ['Nov 10' , '7:00pm',  'Arizona', 'Home', 'A2Cal', 'FTick'],
                ['Dec 1' , '8:00pm',  'Notre Lame', 'Home', 'A2Cal', 'FTick'],
                ['Dec 25' , '9:00pm',  'Colorado St.', 'Away', 'A2Cal', 'FTick']
            ],


/*
                //   So do we need to .push() each individual item into this array
                //   to then call each one when we want to render it.

            tableIconCol: [
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],

                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
                [ 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80' ],
            ],
	*/

            tableIconCol: [
                [ cellImage('1') ],
                [ cellImage('2') ],
                [ cellImage('3') ],
                [ cellImage('4') ],
                [ cellImage('5') ],
                [ cellImage('6') ],
                [ cellImage('7') ],
                [ cellImage('8') ],
                [ cellImage('9') ],
                [ cellImage('10') ],
                [ cellImage('11') ],
                [ cellImage('12') ],
                [ cellImage('13') ],
                [ cellImage('14') ],
                [ cellImage('15') ],
                [ cellImage('16') ],

            ],
			
			
			
			
            tableRows: {}
        }

        this.dbResultsFunction = this.dbResultsFunction.bind(this);

    }


    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }


    //  Method called with the Game Schedule
    //  data returning....   TO TRY TO PULL the database info
    //  into a tableData array structure??????   TBD code below
    dbResultsFunction(rows) {


        // Look for string '[class*=team-23]'. This will be our starting
        // point for each line item in the game schedule table
        for (let i=0; i<12; i++) {


            // THIS IS PULLED FROM THE SCRAPER CLASS FOR REFERENCE WHEN
            // CODING UP THIS CLASS.... RATHER THAN SWITCHING BACK AND
            // FORTH BETWEEN EDITOR FILES... IT CAN BE DELETED.  JOHN
            //  YOU PROBABLY KNOW THESE BY HEART ALREADY... HAHA.
            ////////////////////////////////////////////////////
            // Output scraped data to console - FOR DEBUGGING //
            ////////////////////////////////////////////////////
            // console.log(gamedate);
            // console.log(homeaway);
            // console.log(opponent);
            // console.log(oppid);
            // console.log(opphref);
            // console.log(oppsrc);
            // console.log(result);
            // console.log(score);

            /////////////////////////////////////////////////////////////
            // Insert scraped data into the metadata collection object //
            /////////////////////////////////////////////////////////////
            // let metadata = {
            //   OpponentTeamID: oppid,
            //   GameDate: gamedate,
            //   HomeAway: homeaway,
            //   OpponentTeam: opponent,
            //   OpponentHREF: opphref,
            //   OpponentIMGSRC: oppsrc,
            //   GameResult: result,
            //   GameScore: score
            // };
            //


            // Store game information in game object
            let game = new Game(gamedate, homeaway, opponent, opphref, oppsrc, result, score);

            // Store each game object into parsedResults array
            parsedResults.push(game);
        } // End loop







        let tempTable = [];

        if (rows !== undefined) {


            this.setState({
                tableRows: rows
            });
        }
    }


    componentWillMount () {

        // Get the Game Schedule from the database
        GameScheduleDao.getSchedule(this.dbResultsFunction);

    }






    render() {

        const state = this.state;
        const element = (data, index) => (

            //  So this is the button and if we can have this
            //  hook up to go to the TicketSearchScreen....  or next cut
            //  after that... take the guts of the method of calling the
            //  SeatGeek webpage with the url and marry into this
            //  class as a method (but that could come real late if
            //  we could get the first cut of just going to the TicketSearchScreen
            //  working.


            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Button{index}</Text>
                </View>
            </TouchableOpacity>


        );

        return (
            <View style={styles.container}>
                <ScrollView vertical={true}>
                        <Text style={styles.header}> Add Event To Calendar </Text>
                        <View>
                            <Table borderStyle={{borderColor: '#000000'}} >

                                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>


                                <TableWrapper style={styles.wrapper}>

                                    <Col data={state.tableIconCol}
                                        style={styles.imagestyle}
                                        heightArr={[50, 70, 90, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                                        textStyle={styles.text}/>

                                    <Rows data={state.tableData}
                                        style={styles.rowstyle}
                                        flexArr={[2, 2, 4, 2, 1, 1]}
                                        textStyle={styles.text}/>

                                </TableWrapper>
                            </Table>
                        </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    head: {
        height: 40,
        backgroundColor: '#808B97',
    },
    header: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#20159c',
    },
    text: {
        //margin: 6,
        color: '#000000',
        textAlign: 'center',
        fontSize: 10,
    },
    wrapper: {
        flexDirection: 'row',
    },
    btn: {
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
    },
    imagestyle: {
        flex: 1,
        //margin: 3,
        height: (50),
        width: 50,
        backgroundColor: '#bbf7b4',
    },
    rowstyle: {
        justifyContent: 'center',
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#FFF1C1',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: null,
        alignItems: 'center',
    },
});




{/*
                                                   {
                                            //  Im not sure how the 4th column gets a button out of this per say...
                                            //  but I see the "3" below.. would need to look at this to see about
                                            //  adding another column for "add to calendar".   Then we can look
                                            //  at rendering the image of the opponent team as an icon.  We have
                                            //  the URL.  might need to put it in an 'Image' tag.   Again TBD.
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex}
                                                      data={((cellIndex === 4) || (cellIndex === 5)) ? element(cellData, index) : cellData}
                                                      textStyle={styles.text}/>
                                            ))
}

                                            */}




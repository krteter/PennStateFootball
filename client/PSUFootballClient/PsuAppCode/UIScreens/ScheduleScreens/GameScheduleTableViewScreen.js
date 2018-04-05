import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import GameScheduleDao from "../../DAO/GameScheduleDao";
import Game from "../../Domain/Game";


export default class GameScheduleTableViewScreen extends Component {



    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],

            tableData: [
                ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Appalachian St.', 'Home'],
                ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Pitt', 'Away'],
                ['Sept 29' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Kent State', 'Home'],
                ['Oct 13' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Ohio State', 'Away'],
                ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Maryland', 'Home'],
                ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Purdue St.', 'Home'],
                ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Wisconsin', 'Away'],
                ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Home'],
                ['Nov 17' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Away'],
                ['Dec 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Washington St.', 'Away'],
                ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Appalachian St.', 'Home'],
                ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Pitt', 'Away'],
                ['Sept 29' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Kent State', 'Home'],
                ['Oct 13' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Ohio State', 'Away'],
                ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Maryland', 'Home'],
                ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Purdue St.', 'Home'],
                ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Wisconsin', 'Away'],
                ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Home'],
                ['Nov 17' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Away'],
                ['Dec 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Washington St.', 'Away'],
                ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Appalachian St.', 'Home'],
                ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Pitt', 'Away'],
                ['Sept 29' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Kent State', 'Home'],
                ['Oct 13' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Ohio State', 'Away'],
                ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Maryland', 'Home'],
                ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Purdue St.', 'Home'],
                ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Wisconsin', 'Away'],
                ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Home'],
                ['Nov 17' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Away'],
                ['Dec 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Washington St.', 'Away']
            ],
            tableRows: {}
        }

        this.dbResultsFunction = this.dbResultsFunction.bind(this);

    }


    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }


    //  Method called with the Game Schedule
    //  data returning
    dbResultsFunction(rows) {


        // Look for string '[class*=team-23]'. This will be our starting
        // point for each line item in the game schedule table
        for (let i=0; i<12; i++) {



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
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <ScrollView vertical={true}>
                    <View>
                        <Table borderStyle={{borderColor: 'transparent'}}>
                            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                            {
                                state.tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                                            ))
                                        }
                                        </TableWrapper>
                                ))
                            }
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
        backgroundColor: '#fff'
    },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: {
        flexDirection: 'row',
        backgroundColor: '#FFF1C1'
    },
    btn: {
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
    },
    btnText: {
        textAlign: 'center',
        color: '#fff'
    }
});






























/*
        const tableData = [
            ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Appalachian St.', 'Home'],
            ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Pitt', 'Away'],
            ['Sept 29' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Kent State', 'Home'],
            ['Oct 13' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Ohio State', 'Away'],
            ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Maryland', 'Home'],
            ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Purdue St.', 'Home'],
            ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Wisconsin', 'Away'],
            ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Home'],
            ['Nov 17' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Away'],
            ['Dec 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Washington St.', 'Away'],
            ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Appalachian St.', 'Home'],
            ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Pitt', 'Away'],
            ['Sept 29' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Kent State', 'Home'],
            ['Oct 13' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Ohio State', 'Away'],
            ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Maryland', 'Home'],
            ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Purdue St.', 'Home'],
            ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Wisconsin', 'Away'],
            ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Home'],
            ['Nov 17' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Away'],
            ['Dec 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Washington St.', 'Away'],
            ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Appalachian St.', 'Home'],
            ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Pitt', 'Away'],
            ['Sept 29' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Kent State', 'Home'],
            ['Oct 13' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Ohio State', 'Away'],
            ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Maryland', 'Home'],
            ['Sept 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Purdue St.', 'Home'],
            ['Sept 8' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Wisconsin', 'Away'],
            ['Nov 10' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Home'],
            ['Nov 17' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'MaryWood', 'Away'],
            ['Dec 1' , '3:00pm', 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80', 'Washington St.', 'Away'],
        ];


*/








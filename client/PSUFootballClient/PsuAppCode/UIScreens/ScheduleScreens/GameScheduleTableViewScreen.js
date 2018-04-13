import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image, ImageBackground, Button } from 'react-native';
import { Table, TableWrapper, Row, Col, Cols, Rows, Cell } from 'react-native-table-component';


import GameScheduleDao from "../../DAO/GameScheduleDao";
import Game from "../../Domain/Game";
import TicketSearchScreen from "../GameDayInfoScreens/TicketSearchScreen";


export default class GameScheduleTableViewScreen extends Component {


    //    Website reference for a TABLE
    //
    //      https://www.npmjs.com/package/react-native-table-component
    //
    //        stole their example with a button and started adding
    //        some of our stuff to see if it will work...


    constructor(props) {

        super(props);

        this.state = {

            tableGameData: [],
            tableIconCol: [],
            games: {}       //  rows of games from schedule DB

        }  // end state


        this.getGamesFunction = this.getGamesFunction.bind(this);

    }  // end constructor




    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }



    //  Method called with the Game Schedule
    //  data returning....
    getGamesFunction(rows) {

        //  Add the games to our state
        if (rows !== undefined) {
            this.setState({
                games: rows
            });
        }
    }  // end getGamesFunction()


    componentDidMount() {
        // Make sure the db table exists if this is the first load
        let that = this;
        GameScheduleDao.initGameScheduleDB(that.getGamesFunction);
    }


    componentWillMount () {

        // Get the Game Schedule from the database
        let that = this;
        GameScheduleDao.getSchedule(that.getGamesFunction);
    }




    render() {


        const cLogoImage = (value) => (
            <Image style={styles.imagestyle}  source={{uri: value}}
            />
        );


        const calendarButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Cal</Text>
                </View>
            </TouchableOpacity>
        );

        const ticketButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Tick</Text>
                </View>
            </TouchableOpacity>
        );


        //  Now loop thru the games and get the data to  be displayed on the TableView
        //  and put them in our table arrays to be displayed
        for (let i = 0; i < this.state.games.length; i++) {

            //  game data text
            //    - default the time since TBD
            let gameData = [];
            gameData.push(this.state.games[i].gamedate + '\n' + '3:00 PM');
            //gameData.push('4:00 PM');
            gameData.push(this.state.games[i].opponent);
            gameData.push(this.state.games[i].homeaway);
            gameData.push(calendarButton(i));
            gameData.push(ticketButton(i));
            this.state.tableGameData.push(gameData);

            //  Add our image icon source for
            //  display in schedule
            let oppTeamIcon = [];
            oppTeamIcon = [cLogoImage(this.state.games[i].imgsrc)];
            this.state.tableIconCol.push(oppTeamIcon);

        } // end for



        return (
            <View style={styles.container}>

                <ScrollView vertical={true}>

                    <ImageBackground source={require('./../../../Images/FieldBackground.png')}
                                     resizeMode='cover'
                                     style={styles.backdrop}>
                        <Button style={styles.button}
                                title="Add To Calendar"
                                onPress={() => this.props.navigation.navigate('CalendarEvent', {startDateString: '2018-05-06T18:00:00.000Z',
                                                                                                location: 'Beaver Stadium',
                                                                                                description: 'PSU Nittany Lions vs. VaTech Hokies',
                                                                                                notes: 'White-Out Game'} )}
                        />
                        <Button style={styles.button}
                                title="Search For Ticket"
                                onPress={() => this.props.navigation.navigate('TicketSearch', {startDateString: '2018-09-29T18:00:00.000Z',
                                                                                               description: 'PSU Nittany Lions vs. Ohio State Buckeyes'} )}
                        />

                        <Text style={styles.schedtitle}>2018 Game Schedule</Text>

                        <Table borderStyle={{borderColor: 'transparent' }} style={{flexDirection: 'row'}}>

                            {/* Left TableWrapper */}
                            <TableWrapper style={styles.tableWrap }>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={this.state.tableIconCol} style={styles.logocol}
                                         heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                                         textStyle={styles.titleText}/>
                                </TableWrapper>
                            </TableWrapper>

                            {/* Right Table */}
                            <Table  style={{flex: 1}}>
                                <Rows data={this.state.tableGameData}
                                      widthArr={[80, 95, 50, 70, 70]}
                                      heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                                      textStyle={styles.rowstyle}/>
                            </Table>

                        </Table>

                        <Text style={styles.header}> </Text>
                        <Text style={styles.header}> </Text>
                        <Text style={styles.header}> </Text>
                        <Text style={styles.header}> </Text>

                    </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        color: '#bbf7b4',
    },
    container: {
        flex: 1,
        padding: 2,
        paddingTop: 10,
        backgroundColor: '#0f0b40',
    },
    tableWrap: {
        width: 40,
        justifyContent: 'center',
    },
    schedtitle: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
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
        height: 90,
        width: 90,
        justifyContent: 'center',
        backgroundColor: '#4cf76b',
    },
    rowstyle: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
        flexDirection: 'row',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 6,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    logocol: {
        flex: 1,
        //backgroundColor: '#ffffff',
        justifyContent: 'center',
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




                                <Col data={state.tableGameData} heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]} textStyle={styles.text}/>

borderStyle={{borderColor: 'transparent' }}












                                            */}




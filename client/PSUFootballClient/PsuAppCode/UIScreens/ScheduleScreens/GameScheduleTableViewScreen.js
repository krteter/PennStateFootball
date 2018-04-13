import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image, ImageBackground, Button } from 'react-native';
import { Table, TableWrapper, Row, Col, Rows, Cell } from 'react-native-table-component';

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



//        const elementButton = (value) => (
//            <TouchableOpacity onPress={() => this._alertIndex(value)}>
//                <View style={styles.btn}>
//                    <Text style={styles.btnText}>button</Text>
//                </View>
//            </TouchableOpacity>
//        );



        const cellLogoImage = (value) => (

            <Image style={styles.imagestyle}  source={{uri: value}}
            />
        );



        const calendarButton = (value) => (

            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Button{value}</Text>
                </View>
            </TouchableOpacity>



        );


        const ticketButton = (value) => (

            <Button style={styles.button}
                    title="Search For Ticket"
                    onPress={() => this.props.navigation.navigate('TicketSearch')}
            />
        );


        this.state = {

            tableGameData: [],

    //        tableIconCol: [],

            tableIconCol: [
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&amp;h=80&amp;w=80') ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/221.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2309.png&amp;h=80&amp;w=80') ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/356.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/127.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/84.png&amp;h=80&amp;w=80'  ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2294.png&amp;h=80&amp;w=80') ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/130.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/275.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/164.png&amp;h=80&amp;w=80' ) ],
                [ cellLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/120.png&amp;h=80&amp;w=80' ) ]
            ],


            calIconCol: [
                [ calendarButton('1') ],
                [ calendarButton('2') ],
                [ calendarButton('3') ],
                [ calendarButton('4') ],
                [ calendarButton('5') ],
                [ calendarButton('6') ],
                [ calendarButton('7') ],
                [ calendarButton('8') ],
                [ calendarButton('9') ],
                [ calendarButton('10') ],
                [ calendarButton('11') ],
                [ calendarButton('12') ]
            ],

            ticketIconCol: [
                [ ticketButton('1') ],
                [ ticketButton('2') ],
                [ ticketButton('3') ],
                [ ticketButton('4') ],
                [ ticketButton('5') ],
                [ ticketButton('6') ],
                [ ticketButton('7') ],
                [ ticketButton('8') ],
                [ ticketButton('9') ],
                [ ticketButton('10') ],
                [ ticketButton('11') ],
                [ ticketButton('12') ]
            ],

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


        const cLogoImage = (value) => (

            <Image style={styles.imagestyle}  source={{uri: value}}
            />
        );



        //  Now loop thru the games and get the data to  be displayed on the TableView
        //  and put them in our table arrays to be displayed
        let gameData = [];
        let oppTeamIcon = [];

        for (let i = 0; i < this.state.games.length; i++) {

            //  game data text (default the time since TBD)
            gameData = [this.state.games[i].gamedate, '3:00 PM', this.state.games[i].opponent , this.state.games[i].homeaway];
            this.state.tableGameData.push(gameData);

            //  game data icon url
            console.debug('href = ' + this.state.games[i].href);

            //  TODO:  JOHN CAN WE MAKE THIS THE URL of the IMAGE ICON INSTEAD OF THE TEAM URL ??????
            //   The second statement works with the hardcoded icon.  however I am going to use the
            //   hardcoded array of icons above for Adrian demo.   So in reality if we could change
            //   the scraper to get the team logo icon and put into the database, I think the next statement (KS) will be the one
            //   we need.
        //(KS)    oppTeamIcon = [cLogoImage(this.state.games[i].href)];

         //   oppTeamIcon = [cLogoImage('http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/127.png&amp;h=80&amp;w=80')];
         //   this.state.tableIconCol.push(oppTeamIcon);

        } // end for



        return (
            <View style={styles.container}>

                    <ScrollView vertical={true}>
                        {/*   <View>  */}
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
                            {/*    </View> */}

                    <Text style={styles.schedtitle}>2018 Game Schedule</Text>
                        {/* <View>  */}

                        <Table borderStyle={{borderColor: 'transparent' }} style={{flexDirection: 'row'}}>

                            {/* Left Wrapper */}
                            <TableWrapper style={styles.tableWrap }>
                                <TableWrapper style={{flexDirection: 'row'}}>

                                    <Col data={state.tableIconCol} style={styles.logocol}
                                         heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]} textStyle={styles.titleText}/>

                                </TableWrapper>
                            </TableWrapper>


                            {/* Middle Wrapper */}
                            <TableWrapper style={{flex:1}}>

                                <Rows data={state.tableGameData} heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]} textStyle={styles.rowstyle}/>
                            </TableWrapper>


                            {/* Right Wrapper */}
                            <TableWrapper style={styles.tableWrap }>
                                <TableWrapper style={{flexDirection: 'row'}}>

                                    <Col data={state.tableIconCol} style={styles.addbuttoncol}
                                         heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]} textStyle={styles.titleText}/>
                                    <Col data={state.tableIconCol} style={styles.ticketbuttoncol}
                                         heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]} textStyle={styles.titleText}/>

                                </TableWrapper>
                            </TableWrapper>

                        </Table>



                        {/*   </View>   */}
                    <Text style={styles.header}>remove spacer1</Text>
                    <Text style={styles.header}>remove spacer2</Text>

                        </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        paddingTop: 10,
        backgroundColor: '#c2ceff',
    },
    tableWrap: {
        width: 40,
        justifyContent: 'center',
    },
    schedtitle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    text: {
        //margin: 6,
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 12,
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
        justifyContent: 'center',
        backgroundColor: '#4cf76b',
    },
    rowstyle: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
        flexDirection: 'row',
        color: '#ffffff',
        backgroundColor: '#fff246',
        margin: 6,
    },
    logocol: {
        flex: 1,
        backgroundColor: '#fa3f37',
        justifyContent: 'center',
    },
    addbuttoncol: {
        flex: 1,
        backgroundColor: '#faa7aa',
        justifyContent: 'center',
    },
    ticketbuttoncol: {
        flex: 1,
        backgroundColor: '#fa8876',
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



                                            */}




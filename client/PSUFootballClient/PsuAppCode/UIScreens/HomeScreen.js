import React from 'react';
import {Button, StyleSheet, Text, View, ImageBackground} from 'react-native';

import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";
import TeamRosterDao from "../DAO/TeamRosterDao";





export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            showMsg: false,
            teamplayers: {}
        };

        this.resultsFunction = this.resultsFunction.bind(this);
    }


    resultsFunction(rows) {

        if (rows !== undefined) {         //  rows keeps being undefined here! KS  3/23
            this.setState({
                teamplayers: rows
            });
        }
    }


    componentWillMount () {


        //  Scrape the player roster data from an
        //  external web page and load it into our database.
        //  doesnt work too.  KS 3/23
        let that = this;
        TeamRosterDao.initializeScrapedPlayers(that.resultsFunction);

    }


    render() {

        let backgroundImg = './../../Images/psuFootballPlayer.png';
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: backgroundImg}}
                                 resizeMode='cover'
                                 style={styles.backdrop}>
                    <Text style={styles.header}>
                        Main Menu
                    </Text>
                    <View style={styles.button}>
                        <Button
                            title="Twitter Feed"
                            onPress={() => this.props.navigation.navigate('Twitter')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="DB Test"
                            onPress={() => this.props.navigation.navigate('DBTest')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Roster DB Test"
                            onPress={() => this.props.navigation.navigate('DBRosterTest')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="TimerExampleScreen"
                            onPress={() => this.props.navigation.navigate('TimerExample')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Team Roster List"
                            onPress={() => this.props.navigation.navigate('AlphabetRosterList')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Player Page"
                            onPress={() => this.props.navigation.navigate('PlayerData', {requestedPlayer: 'Phil Mickelson'} )}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Gameday Weather"
                            onPress={() => this.props.navigation.navigate('GameDayWeather')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Add Calendar Event"
                            onPress={() => this.props.navigation.navigate('CalendarEvent', {startDateString: '2018-05-06T18:00:00.000Z',
                                                                                            endDateString:   '2018-05-06T20:30:00.000Z',
                                                                                            location: 'Beaver Stadium',
                                                                                            description: 'PSU Nittany Lions vs. VaTech Hokies',
                                                                                            notes: 'White-Out Game'} )}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Find Tickets For Event"
                            onPress={() => this.props.navigation.navigate('TicketSearch', {startDateString: '2018-09-29T12:00:00.000Z',
                                                                                           endDateString:   '2018-09-29T14:30:00.000Z',
                                                                                           location: 'Beaver Stadium',
                                                                                           description: 'PSU Nittany Lions vs. OSU Buckeyes',
                                                                                           notes: 'Stripe-Out Game'} )}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
    },
    header: {
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'darkgrey',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 5,
        minWidth: 200,
        maxWidth: '95%',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: null,
        height: null,
    },
});
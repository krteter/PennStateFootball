import React from 'react';
import {View} from 'native-base';
import {Image, StyleSheet, WebView} from 'react-native';
import Expo from "expo";
import {scrapeGameScheduleData} from "./../DataScrapers/GameScheduleScraper";
import TeamRosterDao from "../DAO/TeamRosterDao";
import MenuFab from "../CustomComponents/MenuFab";
import TwitterStream from "./TwitterFeedScreen/TwitterStream";
import AbstractNavigableScreen from "./AbstractNavigableScreen";
import RosterSearchBox from "../CustomComponents/RosterSearchBox";


/*

- Eventually we need to move the database here for the whole app
  and each table for schedule, teamplayers, etc should be created
  and used from this single database
- Sandwich this in the HomeScreen or App.js class as global so
  all can access it.-  KS 4/2/18

import {SQLite} from "expo";

//  Open the PSU Football App Database locally on the device
let psuFootballApp_db = SQLite.openDatabase('PsuFootballApp.db');
 */


export default class HomeScreen extends AbstractNavigableScreen {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showMsg: false,
            teamplayers: {}
        };
        this.resultsFunction = this.resultsFunction.bind(this);
        this.navigate = this.navigate.bind(this);
    }


    resultsFunction(rows) {
        if (rows !== undefined) {         //  rows keeps being undefined here! KS  3/23
            this.setState({
                teamplayers: rows
            });
        }
    }

    navigate(location) {
        this.props.navigation.navigate(location);
    }

    async componentWillMount() {

        //  Scrape the player roster data from an
        //  external web page and load it into our database.
        let that = this;
        TeamRosterDao.initializeScrapedPlayers(that.resultsFunction);

        // Scrape game schedule data
        scrapeGameScheduleData();

        // Native-base quirk. App will crash in Expo if these fonts are not loaded before render.
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({loading: false});
    }

    render() {
        // Checks to see if font loading is complete before render.
        if (this.state.loading) {
            return <Expo.AppLoading/>;
        }
        let sourceESPN = 'https://www.espn.com/college-football/game?gameId=400953407';
        // Placeholer for the schedule. Can be modified to update automatically. Does not currently fit in the view.
        const webapp = require('./WebContent/index3.html');
        return (
            <View style={styles.topContainer}>
                <View style={styles.bannerContainer}>
                    <RosterSearchBox
                        players={this.state.teamplayers}
                        navigate={this.navigate}
                    />
                    <WebView
                        source={{uri: sourceESPN}}
                    />
                </View>
                <View style={styles.middleContainer}>
                    <Image
                        style={styles.scheduleStyle}
                        source={require('./images/psuSchedule.png')}
                    />
                    <TwitterStream/>
                </View>
                <View style={styles.bottomContainer}>
                    <Image
                        style={styles.recruitingStyle}
                        source={require('./images/psuRecruiting.png')}/>
                    <MenuFab navigate={this.navigate}/>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    topContainer: {
        //marginTop: 24,
        flex: 1,
        flexDirection: 'column'
    },
    bannerContainer: {
        flex: .31,
        flexDirection: 'column'
    },
    middleContainer: {
        flex: .63,
        flexDirection: 'row'
    },
    bottomContainer: {
        flex: .16,
        flexDirection: 'row',
    },
    recruitingStyle: {
        flex: .77,
        width: null,
        resizeMode: 'stretch',
        height: null,
        flexDirection: 'row'
    },
    espnBanner: {
        flex: .75,
        backgroundColor: '#000'
    },
    scheduleStyle: {
        flex: .5,
        resizeMode: 'cover',
        backgroundColor: '#FF3366'
    },
    twitterStyle: {
        flex: 1,
        backgroundColor: '#FF3366'
    },
});

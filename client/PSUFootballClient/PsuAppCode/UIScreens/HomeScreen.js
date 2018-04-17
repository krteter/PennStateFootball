import React from 'react';
import {View} from 'native-base';
import {ImageBackground, StyleSheet, Text, WebView} from 'react-native';
import Expo from "expo";

import MenuFab from "../CustomComponents/MenuFab";
import TwitterStream from "./TwitterFeedScreen/TwitterStream";
import AbstractNavigableScreen from "./AbstractNavigableScreen";
import RosterSearchBox from "../CustomComponents/RosterSearchBox";
import GameScheduleTable from "./ScheduleScreens/GameScheduleTable";
import DatabaseDAO from '../DAO/DatabaseDAO';


/*

- Eventually we need to move the database here for the whole app
  and each table for schedule, teamPlayers, etc should be created
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
            games: []
        };
        this.navigateWithProps = this.navigateWithProps.bind(this);
        this.getGamesFunction = this.getGamesFunction.bind(this);
    }

    navigateWithProps(location, props) {
        this.props.navigation.navigate(location, props);
    }

    async componentWillMount() {
        // Native-base quirk. App will crash in Expo if these fonts are not loaded before render.
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({loading: false});

        let that = this;
        DatabaseDAO.getNextTwoScheduledGames(that.getGamesFunction);
    }

    getGamesFunction(rows) {

        //  Add the games to our state
        if (rows !== undefined) {
            this.setState({
                games: rows
            });
        }
    }

    render() {
        // Checks to see if font loading is complete before render.
        if (this.state.loading) {
            return <Expo.AppLoading/>;
        }
        let sourceESPN = 'https://www.espn.com/college-football/game?gameId=400953407';
        return (
            <View style={styles.topContainer}>
                <RosterSearchBox
                    navigateWithProps={this.navigateWithProps}
                />
                <View style={styles.bannerContainer}>
                    <WebView
                        source={{uri: sourceESPN}}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.scheduleStyle}>
                    <ImageBackground source={require('./../../Images/FieldBackground.png')}
                                     resizeMode='cover'
                                     style={scheduleStyles.backdrop}>
                        <Text style={styles.scheduleHeader}>Upcoming Games</Text>
                        <GameScheduleTable styles={scheduleStyles} games={this.state.games}/>
                    </ImageBackground>
                </View>
                <View style={styles.twitterContainer}>
                    <TwitterStream/>
                </View>
                <MenuFab navigate={this.navigate}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    bannerContainer: {
        flex: 1.5,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: '#636363',
    },
    twitterContainer: {
        borderTopWidth: 1,
        borderColor: '#636363',
        flex: 4,
        flexDirection: 'column'
    },
    espnBanner: {
        flex: 1.33,
        backgroundColor: '#000'
    },
    scheduleStyle: {
        flex: 1.48,
        flexDirection: 'column',
        zIndex: 1,
        paddingTop: 2,
        paddingBottom: 2,
    },
    searchBox: {
        flex: .5,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    scheduleHeader: {
        color:  '#ffffff',
        textAlign: 'center',
    }

});

const scheduleStyles = StyleSheet.create({
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
        width: 35,
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

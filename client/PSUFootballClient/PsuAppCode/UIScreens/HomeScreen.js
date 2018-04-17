import React from 'react';
import {View} from 'native-base';
import {Image, StyleSheet, WebView} from 'react-native';
import Expo from "expo";

import MenuFab from "../CustomComponents/MenuFab";
import TwitterStream from "./TwitterFeedScreen/TwitterStream";
import AbstractNavigableScreen from "./AbstractNavigableScreen";
import RosterSearchBox from "../CustomComponents/RosterSearchBox";


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
        };
        this.navigateWithProps = this.navigateWithProps.bind(this);
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
                <Image
                    style={styles.scheduleStyle}
                    source={require('./images/psuSchedule.png')}
                />
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
        flex: 1.5,
        flexDirection: 'column',
        backgroundColor: '#FF3366',
        zIndex: 1,
    },
    searchBox: {
        flex: .5,
        flexDirection: 'column',
        backgroundColor: '#000',
    }
});

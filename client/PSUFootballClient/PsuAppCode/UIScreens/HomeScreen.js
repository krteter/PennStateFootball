import React from 'react';
import {Button, StyleSheet, Text, View, ImageBackground} from 'react-native';

import {scrapeTeamRosterData} from "./../DataScrapers/TeamRosterScraper";
import {scrapePlayerBioData} from "./../DataScrapers/PlayerBioScraper";





export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            showMsg: false
        };
    }

    render() {

        //  Scrape the player roster data from an
        //  external webpage and load it into our database.
        scrapeTeamRosterData();

        //  Scrape each player's bio data from an
        //  external webpage and load it into our database.
        scrapePlayerBioData();


        return (
            <View style={styles.container}>
                <ImageBackground source={require('./Images/psuFootballPlayer.png')}
                       resizeMode='cover'
                       style={styles.backdrop}>
                    <Text
                        style={styles.header}
                    >
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
                            title="API call"
                            onPress={() => this.props.navigation.navigate('APIcall')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Display Roster Webpage"
                            onPress={() => this.props.navigation.navigate('Roster')}
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
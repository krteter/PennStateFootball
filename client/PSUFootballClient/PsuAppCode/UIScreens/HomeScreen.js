import React from 'react';
import {Button, StyleSheet, Text, View, ImageBackground} from 'react-native';

import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";




export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            showMsg: false
        };
    }

    render() {
        //  Scrape the player roster data from an
        //  external web page and load it into our database.
        scrapeTeamRosterData();

        let backgroundImg = './../../Images/psuFootballPlayer.png';
        return (
                <View style={styles.container}>
                    <ImageBackground source={{ uri: backgroundImg}}
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
                            onPress={() => this.props.navigation.navigate('RosterWeb')}
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
                            title="DB RosterTest"
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
                            onPress={() => this.props.navigation.navigate('PlayerData')}
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
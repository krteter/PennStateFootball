/**
 *  Main Class for the Penn State Football App
 *  This react native component will render the
 *  main screen for the application
 */

import React from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import {StackNavigator} from "react-navigation";

import HomeScreen from "./PsuAppCode/UIScreens/HomeScreen";
import RosterSectionList from "./PsuAppCode/UIScreens/RosterScreens/RosterSectionList";
import GameScheduleScreen from "./PsuAppCode/UIScreens/ScheduleScreens/GameScheduleScreen";
import PlayerBio from "./PsuAppCode/UIScreens/RosterScreens/PlayerBio";
import WeatherScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/WeatherScreen";
import AddCalendarEventScreen from "./PsuAppCode/UIScreens/AddCalendarEventScreen";
import TwitterScreen from "./PsuAppCode/UIScreens/TwitterFeedScreen/TwitterScreen";
import TicketSearchScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/TicketSearchScreen";
import GameScheduleTableViewScreen from "./PsuAppCode/UIScreens/ScheduleScreens/GameScheduleTableViewScreen";
import SplashScreen from "./PsuAppCode/UIScreens/SplashScreen";
import DatabaseDAO from "./PsuAppCode/DAO/DatabaseDAO";
import {scrapeGameScheduleData} from "./PsuAppCode/DataScrapers/GameScheduleScraper";

//
//  Main React.Component Class for PSU App
//
export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                teamplayers: {}
            };
        this.resultsFunction = this.resultsFunction.bind(this);
    }

    resultsFunction(rows) {
        if (rows !== undefined) {
            this.setState({
                teamplayers: rows
            });
        }
    }

    async componentWillMount() {
        let that = this;
        //Database initially considered created
        var updateDatabase = false;
        try {
            //Use AsyncStorage to persist the key
            let dateOfUpdate = await AsyncStorage.getItem('@PSUfootballDBupdateDate:key');
            console.log('Database last updated: ' + dateOfUpdate);
            if (dateOfUpdate !== null){
                //Key can only be stored as a String. Make it an Integer
                dateOfUpdate = parseInt(dateOfUpdate);
                //Update the database if the database was last updated less than five seconds ago
                if ((Date.now() - dateOfUpdate) > 5000){
                //Update the database if the database was last updated less than three days ago
                //if ((Date.now() - dateOfUpdate) > 259200000){
                    updateDatabase = true;
                    console.log('Database is three or more days old. Updating...');
                }

            }
            else if (dateOfUpdate == null){
                console.log('Database has never been updated. Updating...');
                updateDatabase = true;
            }
            else {
                console.log('Database is not more than three days old. Continuing...')
            }
        } catch (error) {
            console.log(error)
            updateDatabase = true;
        }
        //Initialize the database
        DatabaseDAO.initializeDatabase(that.resultsFunction, updateDatabase);
    }

    render() {
        return (
            <RootStack/>
        );
    }
}


const RootStack = StackNavigator(
    {
        Splash: {
            screen: SplashScreen,
        },
        Home: {
            screen: HomeScreen,
        },
        Twitter: {
            screen: TwitterScreen,
        },
        AlphabetRosterList: {
            screen: RosterSectionList,
        },
        PlayerData: {
            screen: PlayerBio,
        },
        GameDayWeather: {
            screen: WeatherScreen,
        },
        CalendarEvent: {
            screen: AddCalendarEventScreen,
        },
        TicketSearch: {
            screen: TicketSearchScreen,
        },
        GameTable: {
            screen: GameScheduleTableViewScreen,
        },
    },
    { headerMode: 'none' },
    {
        initialRouteName: 'Splash',
        navigationOptions: {
            title: 'PSU Football',
        }
    }
);


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

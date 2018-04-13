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
import TimerExampleScreen from "./PsuAppCode/UIScreens/TimerExampleScreen";
import GameScheduleScreen from "./PsuAppCode/UIScreens/ScheduleScreens/GameScheduleScreen";
import PlayerBio from "./PsuAppCode/UIScreens/RosterScreens/PlayerBio";
import WeatherScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/WeatherScreen";
import AddCalendarEventScreen from "./PsuAppCode/UIScreens/AddCalendarEventScreen";
import TwitterScreen from "./PsuAppCode/UIScreens/TwitterFeedScreen/TwitterScreen";
import TicketSearchScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/TicketSearchScreen";
import GameScheduleTableViewScreen from "./PsuAppCode/UIScreens/ScheduleScreens/GameScheduleTableViewScreen";
import SplashScreen from "./PsuAppCode/UIScreens/SplashScreen";

import TeamRosterDao from "./PsuAppCode/DAO/TeamRosterDao";
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
        if (rows !== undefined) {         //  rows keeps being undefined here! KS  3/23
            this.setState({
                teamplayers: rows
            });
        }
    }

    async componentWillMount() {

        //  Scrape the player roster data from an
        //  external web page and load it into our database.
        let that = this;
        var updateDatabase = false;

        try {
            const dateOfUpdate = await AsyncStorage.getItem('@PSUfootballDBupdateDate:key');
            console.log('Database last updated: ' + dateOfUpdate);
            if (dateOfUpdate !== null){
                dateOfUpdate = parseInt(dateOfUpdate);
                //console.log('Database last updated: ' + dateOfUpdate)
                if ((Date.now() - dateOfUpdate) > 5000){
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
            // Error retrieving data
        }

        TeamRosterDao.initializeScrapedPlayers(that.resultsFunction, updateDatabase);



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
       GameSchedule: {
           screen: GameScheduleScreen,
       },
        TimerExample: {
            screen: TimerExampleScreen,
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

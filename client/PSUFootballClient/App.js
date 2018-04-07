/**
 *  Main Class for the Penn State Football App
 *  This react native component will render the
 *  main screen for the application
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import TwitterScreen from "./PsuAppCode/UIScreens/TwitterFeedScreen/TwitterScreen";
import HomeScreen from "./PsuAppCode/UIScreens/HomeScreen";
import {StackNavigator} from "react-navigation";
import RosterSectionList from "./PsuAppCode/UIScreens/RosterScreens/RosterSectionList";
import Roster from "./PsuAppCode/CustomComponents/Roster";
import TeamRoster from "./PsuAppCode/CustomComponents/TeamRoster";
import TimerExampleScreen from "./PsuAppCode/UIScreens/TimerExampleScreen";
import PlayerBio from "./PsuAppCode/UIScreens/RosterScreens/PlayerBioScreen";
import WeatherScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/WeatherScreen";
import AddCalendarEventScreen from "./PsuAppCode/UIScreens/AddCalendarEventScreen";
import TicketSearchScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/TicketSearchScreen";
import GameScheduleScreen from "./PsuAppCode/UIScreens/ScheduleScreens/GameScheduleScreen";
import GameScheduleTableViewScreen from "./PsuAppCode/UIScreens/ScheduleScreens/GameScheduleTableViewScreen";
import SplashScreen from "./PsuAppCode/UIScreens/SplashScreen";



//
//  Main React.Component Class for PSU App
//
export default class App extends React.Component {

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
        DBTest: {
            screen: Roster,
        },
        DBRosterTest: {
            screen: TeamRoster,
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
        GameSchedule: {
            screen: GameScheduleScreen,
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 */

import React from 'react';
import {StyleSheet} from 'react-native';
import TwitterStream from "./PsuAppCode/UIScreens/TwitterStream";
import HomeScreen from "./PsuAppCode/UIScreens/HomeScreen";
import {StackNavigator} from "react-navigation";
import ExampleAPICall from "./PsuAppCode/UIScreens/ExampleHTMLFetch";
import RosterScreen from "./PsuAppCode/UIScreens/RosterScreens/RosterScreen";
import RosterSectionList from "./PsuAppCode/UIScreens/RosterScreens/RosterSectionList";
import Roster from "./PsuAppCode/CustomComponents/Roster";
import TeamRoster from "./PsuAppCode/CustomComponents/TeamRoster";
import TimerExampleScreen from "./PsuAppCode/UIScreens/TimerExampleScreen";
import PlayerBio from "./PsuAppCode/UIScreens/RosterScreens/PlayerBio";

export default class App extends React.Component {
    render() {
        return (
            <RootStack/>
        );
    }
}


const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Twitter: {
            screen: TwitterStream,
        },
        APIcall: {
            screen: ExampleAPICall,
        },
 //       RosterWeb: {
 //           screen: RosterScreen,
 //       },
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
    },
    {
        initialRouteName: 'Home',
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

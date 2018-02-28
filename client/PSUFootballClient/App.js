/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 */

import React from 'react';
import {StyleSheet} from 'react-native';
import TwitterStream from "./UIScreens/TwitterStream";
import HomeScreen from "./UIScreens/HomeScreen";
import {StackNavigator} from "react-navigation";
import TestScreen from "./UIScreens/TestScreen";
import ExampleAPICall from "./UIScreens/ExampleHTMLFetch";
import RosterScreen from "./UIScreens/RosterScreens/RosterScreen";
import HtmlRosterScreen from "./UIScreens/RosterScreens/HtmlRosterScreen";
import RosterSectionList from "./UIScreens/RosterScreens/RosterSectionList";
import RosterDataWorker from "./WorkerInterfaces/RosterDataWorker";
import PlayerText from "./UIScreens/RosterScreens/PlayerText";



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
        Test: {
            screen: TestScreen,
        },
        APIcall: {
            screen: ExampleAPICall,
        },
        AlphabetRosterList: {
            screen: RosterSectionList,
        },
        Roster: {
            screen: RosterScreen,
        },
        HtmlRoster: {
            screen: HtmlRosterScreen,
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            title: 'PSU Football',
        }
    }
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

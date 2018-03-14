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
import RosterScreen from "./PsuAppCode/UIScreens/RosterScreen";
import Roster from "./PsuAppCode/CustomComponents/Roster";
import TimerExampleScreen from "./PsuAppCode/UIScreens/TimerExampleScreen";

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
        Roster: {
            screen: RosterScreen,
        },
        DBTest: {
            screen: Roster,
        },
        TimerExample: {
            screen: TimerExampleScreen,
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

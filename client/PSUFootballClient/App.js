import React from 'react';
import { StyleSheet } from 'react-native';
import TwitterStream from "./TwitterClient/TwitterStream";
import HomeScreen from "./Navigation/HomeScreen";
import {StackNavigator} from "react-navigation";
import TestScreen from "./TwitterClient/TestScreen";


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
    },
    {
        initialRouteName: 'Home',
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

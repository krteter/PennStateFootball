// #IMPORTS

import React, { Component } from 'react';
import TwitterStream from "./PsuAppCode/UIScreens/TwitterStream";
import HomeScreen from "./PsuAppCode/UIScreens/HomeScreen";
import {StackNavigator} from "react-navigation";
import ExampleAPICall from "./PsuAppCode/UIScreens/ExampleHTMLFetch";
import RosterSectionList from "./PsuAppCode/UIScreens/RosterScreens/RosterSectionList";
import Roster from "./PsuAppCode/CustomComponents/Roster";
import TeamRoster from "./PsuAppCode/CustomComponents/TeamRoster";
import TimerExampleScreen from "./PsuAppCode/UIScreens/TimerExampleScreen";
import PlayerBio from "./PsuAppCode/UIScreens/RosterScreens/PlayerBioScreen";
import WeatherScreen from "./PsuAppCode/UIScreens/GameDayInfoScreens/WeatherScreen";
import AddCalendarEventScreen from "./PsuAppCode/UIScreens/AddCalendarEventScreen";

// #CLASS

export default class App extends Component {
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
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
        title: 'PSU Football',
    }
  }
);

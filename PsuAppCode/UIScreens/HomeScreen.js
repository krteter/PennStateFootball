// #IMPORTS

import React from 'react';
import { Container, Header, Item, View, Input, Icon, Button, Text, Fab } from 'native-base';
import { WebView, Image } from 'react-native';
import {StyleSheet} from 'react-native';
import Expo from "expo";
import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";
import TeamRosterDao from "../DAO/TeamRosterDao";
import AddCalendarEventScreen from "./AddCalendarEventScreen";

// #CLASS

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showMsg: false,
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
      let that = this;
      TeamRosterDao.initializeScrapedPlayers(that.resultsFunction);
      // Native-base quirk. App will crash in Expo if these fonts are not loaded before render.
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ loading:false });
      this.setState({ active:false });
    }
    render() {
      // Checks to see if font loading is complete before render.
      if (this.state.loading) {
        return <Expo.AppLoading />;
      }
      // Took Kevin's Twitter code and stuck it in a WebView. Probably a more elegant way to do this.
      let jsTwitter = '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
      let sourceTwitter = jsTwitter + '<a class="twitter-timeline" href="https://twitter.com/PennStateFball?ref_src=twsrc%5Etfw">Tweets by PennStateFball</a>';
      let sourceESPN = 'https://www.espn.com/college-football/game?gameId=400953407';
      // Placeholer for the schedule. Can be modified to update automatically. Does not currently fit in the view.
      const webapp = require('./WebContent/index3.html');
      return (
        <View style={styles.topContainer}>
          <View style={styles.bannerContainer}>
            <Header searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
                <Icon name="ios-people" />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
            <WebView
              source={{uri: sourceESPN}}
            />
          </View>
          <View style={styles.middleContainer}>
              <Image
                style={styles.scheduleStyle}
                source={require('./images/psuSchedule.png')}
              />
              <WebView
                  style={styles.twitterStyle}
                  source={{html: sourceTwitter}}
                  javaScriptEnabled={true}
              />
          </View>
          <View style={styles.bottomContainer}>
              <Image
                style={styles.recruitingStyle}
                source={require('./images/psuRecruiting.png')} />
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={[styles.fabStyle, {backgroundColor: '#5067FF'}]}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}>
              <Icon name="share" />
              <Button style={{ backgroundColor: '#4248f4' }}>
                <Icon
                  name="home"
                  onPress={() => this.props.navigation.navigate('Home')}
                />
              </Button>
              <Button style={{ backgroundColor: '#f44242' }}>
                <Icon name="american-football" />
              </Button>
              <Button style={{ backgroundColor: '#f4a941' }}>
                <Icon
                  name="search"
                />
              </Button>
              <Button style={{ backgroundColor: '#dcf441' }}>
                <Icon
                  name="people"
                  onPress={() => this.props.navigation.navigate('AlphabetRosterList')}
                />
              </Button>
              <Button style={{ backgroundColor: '#4ff441' }}>
                <Icon
                  name="rainy"
                  onPress={() => this.props.navigation.navigate('GameDayWeather')}
                />
              </Button>
              <Button style={{ backgroundColor: '#41f4eb' }}>
                <Icon
                  name="calendar"
                  onPress={() => this.props.navigation.navigate('CalendarEvent')}
                />
              </Button>
              <Button disabled style={{ backgroundColor: '#4155f4' }}>
                <Icon
                  name="egg"
                  onPress={() => this.props.navigation.navigate('Twitter')}
                />
              </Button>
            </Fab>
          </View>
        </View>
      );
    }
  }

  var styles = StyleSheet.create({
      topContainer: {
          marginTop: 24,
          flex: 1,
          flexDirection: 'column'
      },
      bannerContainer: {
          flex: .31,
          flexDirection: 'column'
      },
      middleContainer: {
          flex: .63,
          flexDirection: 'row'
      },
      bottomContainer: {
          flex: .16,
          flexDirection: 'row',
      },
      recruitingStyle: {
          flex: .77,
          width: null,
          resizeMode: 'stretch',
          height: null,
          flexDirection: 'row'
      },
      fabStyle: {
          flex: .23,
          flexDirection: 'row',
          backgroundColor: '#FF3366'
      },
      espnBanner: {
          flex: .75,
          backgroundColor: '#000'
      },
      scheduleStyle: {
          flex: .5,
          resizeMode: 'cover',
          backgroundColor: '#FF3366'
      },
      twitterStyle: {
          flex: 1,
          backgroundColor: '#FF3366'
      },
  });

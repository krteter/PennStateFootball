import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {Fab, Button, Icon} from 'native-base';
import TeamPlayer from "./../../Domain/TeamPlayer";
import TeamRosterDao from "../../DAO/TeamRosterDao";



//
//  Class for a UI to display a player's
//  biographical data.
//
export default class PlayerBio extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    async componentWillMount() {
      let that = this;
      // Native-base quirk. App will crash in Expo if these fonts are not loaded before render.
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ loading:false });
      this.setState({ active:false });
    }

    render() {
      if (this.state.loading) {
        return <Expo.AppLoading />;
      }
      let dbPulledPlayer = this.props.navigation.state.params.player;
      console.debug('PlayerBio.componentWillMount()....    requestedPlayer is: ' + dbPulledPlayer.name);
      let player = new TeamPlayer(dbPulledPlayer.name, dbPulledPlayer.jerseyNum, dbPulledPlayer.position,
                                  'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg',
                                  dbPulledPlayer.classyear, dbPulledPlayer.hometown, dbPulledPlayer.heightWeight, dbPulledPlayer.highschool, dbPulledPlayer.experience, dbPulledPlayer.major);
      console.debug('PlayerBio.componentWillMount()....    Player Name is: ' + player.name);
      console.debug('PlayerBio.componentWillMount()....    Player Number is: ' + player.jerseyNum);
      console.debug('PlayerBio.componentWillMount()....    Player Position is: ' + player.position);

        return (
            <View style={styles.playercontainer}>

                <Image
                    style={styles.imagestyle}
                    source={{uri: 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571374.jpeg'}}
                />

                <Text style={styles.nametext}>#{player.jerseyNum}   {player.name} </Text>
                <Text style={styles.playertext}>  </Text>
                <Text style={styles.playertext}>Position: {player.position}</Text>
                <Text style={styles.playertext}>Class: {player.classyear}</Text>
                <Text style={styles.playertext}>Height/Weight: {player.heightWeight}</Text>
                <Text style={styles.playertext}>Hometown: {player.hometown}</Text>
                <Text style={styles.playertext}>Experience: {player.experience}</Text>
                <Text style={styles.playertext}>Major:
                    <Text style={styles.majortext}> {player.major}</Text>
                </Text>
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
        );
    }


}  //  end PlayerBio



const styles = StyleSheet.create({
    playercontainer: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        height: '100%',
    },
    imagestyle: {
        marginTop: 30,
        marginBottom: 10,
        justifyContent: 'center',
        width: 175,
        height: 175,
    },
    nametext: {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    playertext: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    majortext: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: null,
        height: null,
    },
});

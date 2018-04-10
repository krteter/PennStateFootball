import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import TeamPlayer from "./../../Domain/TeamPlayer";

import AbstractNavigableScreen from "../AbstractNavigableScreen";
import MenuFab from "../../CustomComponents/MenuFab";



//
//  Class for a UI to display a player's
//  biographical data.
//
export default class PlayerBio extends AbstractNavigableScreen {

    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    async componentWillMount() {

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
      let player = new TeamPlayer(dbPulledPlayer.name, dbPulledPlayer.jerseyNum, dbPulledPlayer.position,
                                  dbPulledPlayer.imageUrl,
                                  dbPulledPlayer.classyear, dbPulledPlayer.hometown, dbPulledPlayer.heightWeight, dbPulledPlayer.highschool, dbPulledPlayer.experience, dbPulledPlayer.major);
      //console.debug('PlayerBio.render()....    requestedPlayer is: ' + dbPulledPlayer.name);


        return (
            <View style={styles.playercontainer}>
                <ImageBackground source={require('./../../../Images/FieldBackground.png')}
                                 resizeMode='cover'
                                 style={styles.backdrop}>
                    <Image
                       style={styles.imagestyle}
                        source={{uri: player.imageUrl }}
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
                    <MenuFab navigate={this.navigate} />
                </ImageBackground>
            </View>
        );
    }


}  //  end PlayerBio



const styles = StyleSheet.create({
    playercontainer: {
        // flex: 1,
        backgroundColor: '#0f0b40',
        alignItems: 'center',
        //justifyContent: 'center',
        height: '100%',
    },
    imagestyle: {
        marginTop: 90,
        marginBottom: 40,
        justifyContent: 'center',
        width: 175,
        height: 175,
    },
    nametext: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    playertext: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    majortext: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: null,
        alignItems: 'center',
    },
});

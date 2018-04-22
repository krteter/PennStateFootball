import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, WebView, Platform, SectionList} from 'react-native';
import TeamPlayer from "./../../Domain/TeamPlayer";
import AbstractNavigableScreen from "../AbstractNavigableScreen";
import MenuFab from "../../CustomComponents/MenuFab";

//
//  Class for a UI to display a player's
//  biographical data.
//

const LocalWebURL = require('./../WebContent/PlayerStats/Mark  Allen.html');
//const LocalWebURL = require('./../WebContent/PlayerStats/index3.html');

export default class PlayerBio extends AbstractNavigableScreen {

    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }









    async componentWillMount() {

        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

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
      //let sourceESPN = 'https://www.espn.com/college-football/game?gameId=400953407';
      let dbPulledPlayer = this.props.navigation.state.params.player;
      let player = new TeamPlayer(dbPulledPlayer.name, dbPulledPlayer.jerseyNum, dbPulledPlayer.position,
                                  dbPulledPlayer.imageUrl,
                                  dbPulledPlayer.classyear, dbPulledPlayer.hometown, dbPulledPlayer.heightWeight, dbPulledPlayer.highschool, dbPulledPlayer.experience, dbPulledPlayer.major);
      //console.debug('PlayerBio.render()....    requestedPlayer is: ' + dbPulledPlayer.name);


        return (
            <View style={styles.pagecontainer}>

                <ImageBackground source={require('./../../../Images/FieldBackground.png')}
                                 resizeMode='cover'
                                 style={styles.backdrop}>
                    <View style={styles.biocontainer}>
                        <View style={styles.biotitlecontainer}>
                            <Text style={styles.nametext}>#{player.jerseyNum}</Text>
                            <Text style={styles.nametext}>{player.name}</Text>
                            <Text style={styles.nametext}>{player.position}</Text>
                        </View>
                        <View style={styles.biodetailscontainer}>
                            <Image
                               style={styles.imagestyle}
                                source={{uri: player.imageUrl }}
                            />
                            <View style={styles.biotextcontainer}>

                                <Text style={styles.playertext}>  </Text>
                                <Text style={styles.playertext}>Height / Weight: {player.heightWeight}</Text>
                                <Text style={styles.playertext}>Class: {player.classyear}</Text>
                                <Text style={styles.playertext}>Eligibility: {player.experience}</Text>
                                <Text style={styles.playertext}>Hometown: {player.hometown}</Text>
                                <Text style={styles.playertext}>Major:
                                    <Text style={styles.majortext}> {player.major}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statscontainer}>
                        <WebView
//                            source={{uri: isAndroid?'file:Mark  Allen.html'
//                                :'./Mark  Allen.html'}}
                            source={LocalWebURL}
                            //scalesPageToFit= {false}
                            style={{
                                flex: 1,
                                //alignSelf: 'center',
                                //marginTop: 10,
                                //left: (Platform.OS) == 'ios' ? 30 : 50,
                                //right: 30,
                                //marginBottom: 10,
                                //width: (Platform.OS) == 'ios' ? '82%' : '75%',
                                height: '80%',
                            }}
                            bounces={false}
                            scrollEnabled={false}
                        />
                    </View>

                    <View style={styles.recruitingcontainer} scrollEnabled={false}>
                        <WebView
                            source={{uri: 'https://247sports.com/PlayerSport/Mark-Allen-at-DeMatha-Catholic-44677/Embed'}}
                            //scalesPageToFit= {false}
                            style={{
                                flex: 1,
                                //alignSelf: 'center',
                                marginTop: 10,
                                left: (Platform.OS) == 'ios' ? 30 : 50,
                                //right: 30,
                                marginBottom: 10,
                                width: (Platform.OS) == 'ios' ? '82%' : '75%',
                                height: '80%',
                            }}
                            bounces={false}
                            scrollEnabled={false}







                        />
                    </View>
                    <MenuFab navigate={this.navigate} />
                </ImageBackground>
            </View>
        );
    }

}  //  end PlayerBio



const styles = StyleSheet.create({
    pagecontainer: {
        //flex: 1,
        backgroundColor: '#0f0b40',
        marginTop: (Platform.OS) == 'ios' ? 20 : 24,
        //alignItems: 'flex-start',
        //justifyContent: 'center',
        height: '100%',
    },
    biocontainer: {
        flex: .30,
        //backgroundColor: '#0f0b40',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        height: '100%',
    },
    biotitlecontainer: {
        flex: .15,
        //backgroundColor: '#0f0b40',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: '100%',
    },
    biodetailscontainer: {
        flex: .85,
        //backgroundColor: '#0f0b40',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: '100%',
    },
    biotextcontainer: {
        //flex: .30,
        //backgroundColor: '#0f0b40',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '100%',
    },
    statscontainer: {
        flex: .30,
        backgroundColor: '#15ff00',
        //alignItems: 'flex-start',
        //justifyContent: 'center',
        height: '100%',
    },
    recruitingcontainer: {
        flex: .4,
        //flexDirection: 'row',
        //backgroundColor: '#ff0000',
        //alignItems: 'center',
        //justifyContent: 'center',
        //height: '100%',
        //width: '100%',
    },
    imagestyle: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        //alignItems: 'flex-start',
        width: 140,
        height: 140,
    },
    webviewstyle: {
        flex: 1,
    },
    nametext: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    playertext: {
        width: 170,
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'left',
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
        //alignItems: 'center',
    },
});

//const styles = StyleSheet.create({
//    playercontainer: {
//        //flex: 1,
//        backgroundColor: '#0f0b40',
//        alignItems: 'flex-start',
//        //justifyContent: 'center',
//        height: '100%',
//    },
//    imagestyle: {
//        marginTop: 10,
//        marginBottom: 40,
//        alignItems: 'flex-start',
//        width: 175,
//        height: 175,
//    },
//    nametext: {
//        color: '#ffffff',
//        fontSize: 18,
//        fontWeight: 'bold',
//        textAlign: 'center',
//    },
//    playertext: {
//        color: '#ffffff',
//        fontSize: 13,
//        fontWeight: 'bold',
//        textAlign: 'center',
//    },
//    majortext: {
//        color: '#ffffff',
//        fontSize: 12,
//        fontWeight: 'bold',
//        textAlign: 'center',
//    },
//    backdrop: {
//        flex: 1,
//        flexDirection: 'column',
//        width: '100%',
//        height: null,
//        alignItems: 'center',
//    },
//});
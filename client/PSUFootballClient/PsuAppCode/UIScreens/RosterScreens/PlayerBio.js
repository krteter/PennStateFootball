import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';


import TeamPlayer from "./../../Domain/TeamPlayer";
import TeamRosterDao from "../../DAO/TeamRosterDao";



//
//  Class for a UI to display a player's
//  biographical data.
//
export default class PlayerBio extends React.Component {



    render() {

        let player = new TeamPlayer('Arnold Palmer', '83', 'GF',
                                    'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg',
                                    'Senior', 'Latrobe, PA', '5-10/186', 'Wake Forest', 'SR', '4 Time Masters Champion');

        //TeamRosterDao.getSinglePlayer();


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
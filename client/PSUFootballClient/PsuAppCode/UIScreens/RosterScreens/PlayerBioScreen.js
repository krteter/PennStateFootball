import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, Alert} from 'react-native';

import TeamRosterDao from "../../DAO/TeamRosterDao";




//
//  Class for a UI to display a player's
//  biographical data & picture/headshot
//
export default class PlayerBio extends React.Component {


    constructor(props) {

        super(props);

        this.state = {
            requestedPlayerName: '',
            myPlayer: {}
        };

        this.getIndividualPlayerFunction = this.getIndividualPlayerFunction.bind(this);
    }


    componentWillMount() {

        // Set the Component's requestedPlayer
        //   -PlayerBio will take a respective requestedPlayer as input
        //    then look up the player's data from the database
        this.setState({
            requestedPlayerName: this.props.navigation.state.params.requestedPlayer
        });


        //  Get the requested player's data from the database
        let that = this;
        TeamRosterDao.getSinglePlayer(this.state.requestedPlayerName, that.getIndividualPlayerFunction);

        //console.debug('leaving........... PlayerBio.willMount()');

    }  // end componentWillMount()


    //  Function to pass to the database to be called with the
    //  respective player returned from the db 'get' player
    //  sql call
    getIndividualPlayerFunction(dbPulledPlayer) {      //  never gets called??   KS 3/23

        if (dbPulledPlayer !== undefined) {

            this.setState({
                myPlayer: dbPulledPlayer    // set the returned player to our local instance
            });

        } else {
            Alert.alert('Database Player Pull Failed!!');
        }
    }


    render() {

        return (
            <View style={styles.playercontainer}>

                <Image
                    style={styles.imagestyle}
                    source={{uri: this.state.myPlayer.imageUrl}}
                />
                <Text style={styles.nametext}>#{this.state.myPlayer.jerseyNum}   {this.state.requestedPlayerName} </Text>
                <Text style={styles.playertext}>  </Text>
                <Text style={styles.playertext}>Position: {this.state.myPlayer.position}</Text>
                <Text style={styles.playertext}>Class: {this.state.myPlayer.classyear}</Text>
                <Text style={styles.playertext}>Height/Weight: {this.state.myPlayer.heightWeight}</Text>
                <Text style={styles.playertext}>Hometown: {this.state.myPlayer.hometown}</Text>
                <Text style={styles.playertext}>Experience: {this.state.myPlayer.experience}</Text>
                <Text style={styles.playertext}>Major:
                    <Text style={styles.majortext}> {this.state.myPlayer.major}</Text>
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
        width: (105 * 1.25),
        height: (145 * 1.25),
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

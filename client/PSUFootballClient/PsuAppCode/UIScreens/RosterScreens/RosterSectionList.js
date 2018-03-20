import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text, Platform, Alert } from 'react-native';

import TeamRosterDao from "../../DAO/TeamRosterDao";
import {scrapeTeamRosterData} from "./../../DataScrapers/RosterScraper";



//
//  Class for a UI to display an alphabetical  list of all team
//  player's loaded from the team roster database table (Player_Table).
//
export default class RosterSectionList extends Component<{}> {

    constructor(props) {

        super(props);

        this.state = {
            teamplayers: {},
            names_a: ['Johnny Appleseed', 'Joe Arcangelo'] ,
            names_b: ['Damion Barber', 'Ryan Bates', 'Will Blair', 'Corey Bolds', 'Nick Bowers', 'Ellis Brooks', 'Cam Brown', 'DJ Brown', 'Journey Brown', 'Torrence Brown', 'Ryan Buchholz', 'Jabari Butler'] ,
            names_c: ['Mr. Clean', 'Joe Calcagno', 'Tariq Castro-Fields', 'Max Chizmar', 'Sean Clifford', 'Jake Cooper', 'Mike Curry'] ,
            names_d: [''] ,
            names_e: [''] ,
            names_f: [''] ,
            names_g: [''] ,
            names_h: [''] ,
            names_i: [] ,
            names_j: [] ,
            names_k: [] ,
            names_l: [] ,
            names_m: ['Phil Mickelson'] ,
            names_n: ['Danny Noonan'] ,
            names_o: [''] ,
            names_p: [''] ,
            names_q: [''] ,
            names_r: [''] ,
            names_s: ['Ken Smith', 'Judge Smails'] ,
            names_t: [''] ,
            names_u: [''] ,
            names_v: [''] ,
            names_w: [''] ,
            names_x: ['Tiger Woods'] ,
            names_y: [''] ,
            names_z: ['Marley Bob Ziggy']
        };
        this.addContentsToListArrays = this.addContentsToListArrays.bind(this);

    }  // end constructor



//    componentDidMount() {
//    }

    componentWillMount() {



        //let playerRosterSize = TeamRosterDao.getRosterSize();

        //  Add the players to our scroll list from our database
        //  table - Player_Table
        let that = this;
        TeamRosterDao.getPlayers( that.addContentsToListArrays );

    }  // end componentWillMount()



    //
    //  Method to add player names gathered from our
    //  database's Plater_Table to our UI list of roster
    //  players
    addContentsToListArrays(rows) {

        if (rows !== undefined) {
            this.setState({
                teamplayers: rows
            });

            this.state.teamplayers.forEach(player =>
                {
                    this.state.names_g.push(player.name);
                }
            );

        } else {
            this.state.names_j.push('Pushing Jimmy');
            this.state.names_j.push('Pushing Johnny');
        }

        this.state.names_j.push('Pushing Peter Paul');

    }  // end addContentsToListArrays()





    //  Function to pass to the database to be called with the
    //  respective player returned from the db 'get' player
    //  sql call.  A 'TeamPlayer' object is the argument
    getTeamPlayerResultsFunction(dbPulledPlayer) {

        if (dbPulledPlayer !== undefined) {
            //this.state.myPlayer = dbPulledPlayer;  // set the returned player to our local instance
            Alert.alert(dbPulledPlayer.name);
        } else {
            Alert.alert('Database Player Pull Failed!!');
        }
    }


    //  Function called when the respective list item is
    //  clicked on
    getSectionListItem = (requestedPlayer)=> {

        //  Get the requested player's data from the database
        let that = this;
        TeamRosterDao.getSinglePlayer(requestedPlayer, that.getTeamPlayerResultsFunction);

    }


    render() {



        return (

            //  Stole this from a web example... enhance this
            //  for our needs???
            <View style={{ marginTop : (Platform.OS) == 'ios' ? 20 : 0 }}>

                <SectionList

                    sections={[
                        { title: 'A', data: this.state.names_a },
                        { title: 'B', data: this.state.names_b },
                        { title: 'C', data: this.state.names_c },
                        { title: 'D', data: this.state.names_d },
                        { title: 'E', data: this.state.names_e },
                        { title: 'F', data: this.state.names_f },
                        { title: 'G', data: this.state.names_g },
                        { title: 'H', data: this.state.names_h },
                        { title: 'I', data: this.state.names_i },
                        { title: 'J', data: this.state.names_j },
                        { title: 'K', data: this.state.names_k },
                        { title: 'L', data: this.state.names_l },
                        { title: 'M', data: this.state.names_m },
                        { title: 'N', data: this.state.names_n },
                        { title: 'O', data: this.state.names_o },
                        { title: 'P', data: this.state.names_p },
                        { title: 'Q', data: this.state.names_q },
                        { title: 'R', data: this.state.names_r },
                        { title: 'S', data: this.state.names_s },
                        { title: 'T', data: this.state.names_t },
                        { title: 'U', data: this.state.names_u },
                        { title: 'V', data: this.state.names_v },
                        { title: 'W', data: this.state.names_w },
                        { title: 'X', data: this.state.names_x },
                        { title: 'Y', data: this.state.names_y },
                        { title: 'Z', data: this.state.names_z },
                    ]}


                    //renderSectionHeader={ ({section}) =>
                    //    <PlayerText /> }

                    renderSectionHeader={ ({section}) =>
                        <Text style={styles.SectionHeaderStyle}> { section.title }
                        </Text> }



                    renderItem={ ({item}) =>
                        <Text style={styles.SectionListItemStyle}
                              onPress={this.getSectionListItem.bind(this, item)}> { item }
                        </Text> }
                    keyExtractor={ (item, index) => index }
                />



            </View>

        );
    }
}  // end class RosterSectionList


const styles = StyleSheet.create({

    SectionHeaderStyle:{
        backgroundColor : '#0f2e59',
        fontSize : 16,
        padding: 0,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        borderRadius: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 25,
    },

    SectionListItemStyle:{
        fontSize : 12,
        padding: 5,
        color: '#000',
        backgroundColor : '#F5F5F5'
    }
});



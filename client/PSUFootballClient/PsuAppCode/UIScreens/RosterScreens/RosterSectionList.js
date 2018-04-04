import React from 'react';
import {Alert, Platform, SectionList, StyleSheet, Text, View} from 'react-native';
import TeamRosterDao from "../../DAO/TeamRosterDao";
import MenuFab from "../../CustomComponents/MenuFab";
import AbstractNavigableScreen from "../AbstractNavigableScreen";
import Expo from "expo";


//
//  Class for a UI to display an alphabetical  list of all team
//  player's loaded from the team roster database table (Player_Table).
//
export default class RosterSectionList extends AbstractNavigableScreen {


    constructor(props) {

        super(props);

        this.state = {
            teamplayers: {},
            selectedPlayer: '',
            sections: null
        };

        this.addContentsToListArrays = this.addContentsToListArrays.bind(this);
        this.getSinglePlayerResultsFunction = this.getSinglePlayerResultsFunction.bind(this);


    }  // end constructor


    componentDidMount() {

        //  Do the same to experiment if the rows wont come back
        //  empty here when this is called.....???????
        //  Add the players to our scroll list from our database
        //  table - Player_Table
        let that = this;
        //console.debug('RosterSectionList.componentDidMount()....    Getting all players...');
        TeamRosterDao.getAllPlayers(that.addContentsToListArrays);

    }

    //
    //  Method to add player names gathered from our
    //  database's Plater_Table to our UI list of roster
    //  players
    addContentsToListArrays(rows) {

        console.debug('RosterSectionList.addContentsToListArrays()....    ');
        //  I need to figure out why or how I can get this to
        //  have row not equal to undefined... always is... AHHHHHH!
        if (rows !== undefined) {       //  rows is always undefined!  KS  3/25
            console.debug('RosterSectionList.addContentsToListArrays()....    rows is defined');
            this.setState({
                teamplayers: rows
            });

            //  For now push all players into the "G" heading of the
            //  UI list - We can divide them up into their "letter" categories
            //  later after we are successfully pulling all of them out
            //  of the database.  For now just clump together in 'G'......
            let name_list = [];
            this.state.teamplayers.forEach(player => {
                    let temp_name = player.name;
                    //console.debug('RosterSectionList.addContentsToListArrays()....    temp_name is: ' + temp_name);
                    name_list.push(temp_name);
                }
            );

            let namesListByLetter = [];

            class nameListRow {
                constructor(_letter){
                    this.title = _letter;
                    this.data = [];
                }
            }

            name_list.forEach(name => {
                let spaceIndex = name.indexOf(" ");
                let lastFirstLetter = name.charAt(spaceIndex + 2);
                console.log(lastFirstLetter);
                let thisLetterRow = namesListByLetter.find(o => o.title === lastFirstLetter);
                if(thisLetterRow === undefined) {
                    let newRow = new nameListRow(lastFirstLetter);
                    namesListByLetter.push(newRow);
                    thisLetterRow = newRow;
                }
                thisLetterRow.data.push(name);

            });
            console.log(namesListByLetter);

            this.setState({
                sections: namesListByLetter
            });

        }

    }  // end addContentsToListArrays()


    //  Function to pass to the database to be called with the
    //  respective player returned from the db 'get' player
    //  sql call.  A 'TeamPlayer' object is the argument
    getSinglePlayerResultsFunction(dbPulledPlayer) {

        if (dbPulledPlayer !== undefined) {

            console.debug('RosterSectionList.getSinglePlayerResultsFunction()....    dbPulledPlayer is: ' + dbPulledPlayer.name);


            // set the returned player to our local state instance
            this.setState({
                selectedPlayer: dbPulledPlayer.name
            });
            
            //  Navigate to the PlayerBio UI with biography data
            //  being loaded into its fields.
            this.props.navigation.navigate('PlayerData2', {player: dbPulledPlayer});


        } else {
            Alert.alert('RosterSectionList: Pull player from Database Failed!!');
        }
    }  // end getSinglePlayerResultsFunction()


    //  Function called when the respective "Player" list item is
    //  clicked on
    playerSectionListItemChosen = (requestedPlayer) => {

        //  Get the requested player's data from the database
        let that = this;
        console.debug('RosterSectionList.playerSectionListItemChosen()....    requestedPlayer is: ' + requestedPlayer);
        //requestedPlayer = 'Nick Bowers';   //hard code for now.. to see if we can get it out of DBase

        //  We want to use the name to pull that player from our
        //  database Player_Table and then we inherently have all the
        //  biography data for him.  Then in the results function, we
        //  will want to navigate (and populate) the PlayerBio UI with
        //  the respective data.
        TeamRosterDao.getSinglePlayer(requestedPlayer, that.getSinglePlayerResultsFunction);

    } // end playerSectionListItemChosen()


    render() {
        if(this.state.sections === null) {
            return (<Expo.AppLoading />);
        }

        return (

            //  Stole this from a web example... enhance this
            //  for our needs???
            <View style={{marginTop: (Platform.OS) == 'ios' ? 20 : 0}}>

                <SectionList

                    sections = {this.state.sections}

                    renderSectionHeader={({section}) =>
                        <Text style={styles.SectionHeaderStyle}> {section.title}
                        </Text>}


                    renderItem={({item}) =>
                        <Text style={styles.SectionListItemStyle}
                              onPress={this.playerSectionListItemChosen.bind(this, item)}> {item}
                        </Text>}
                    keyExtractor={(item, index) => index}
                />

                <MenuFab navigate={this.navigate}/>
            </View>

        );
    }
}  // end class RosterSectionList


const styles = StyleSheet.create({

    SectionHeaderStyle: {
        backgroundColor: '#0f2e59',
        fontSize: 16,
        padding: 0,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        borderRadius: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 25,
    },

    SectionListItemStyle: {
        fontSize: 12,
        padding: 5,
        color: '#000',
        backgroundColor: '#F5F5F5'
    }
});



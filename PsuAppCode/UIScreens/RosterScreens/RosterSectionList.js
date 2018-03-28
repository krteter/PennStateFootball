import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text, Platform, Alert } from 'react-native';
import {Fab, Icon, Button} from 'native-base';
import TeamRosterDao from "../../DAO/TeamRosterDao";
import {scrapeTeamRosterData} from "./../../DataScrapers/RosterScraper";
import GameDayForecast from "../../Domain/GameDayForecast";



//
//  Class for a UI to display an alphabetical  list of all team
//  player's loaded from the team roster database table (Player_Table).
//
export default class RosterSectionList extends Component<{}> {


    constructor(props) {

        super(props);

        this.state = {
            teamplayers: {},
            selectedPlayer: '',
            active:false,

            names_a: [] ,
            names_b: [] ,
            names_c: [] ,
            names_d: [] ,
            names_e: [] ,
            names_f: [] ,
            names_g: [] ,
            names_h: [] ,
            names_i: [] ,
            names_j: [] ,
            names_k: [] ,
            names_l: [] ,
            names_m: [] ,
            names_n: [] ,
            names_o: [] ,
            names_p: [] ,
            names_q: [] ,
            names_r: [] ,
            names_s: [] ,
            names_t: [] ,
            names_u: [] ,
            names_v: [] ,
            names_w: [] ,
            names_x: [] ,
            names_y: [] ,
            names_z: [],
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
        TeamRosterDao.getAllPlayers( that.addContentsToListArrays );

    }


    componentWillMount() {

        //  Add the players to our scroll list from our database
        //  table - Player_Table
//        let that = this;
//        TeamRosterDao.initializeScrapedPlayers(that.addContentsToListArrays);
        let that = this;
        TeamRosterDao.getAllPlayers( that.addContentsToListArrays );

    }  // end componentWillMount()



    //
    //  Method to add player names gathered from our
    //  database's Plater_Table to our UI list of roster
    //  players
    addContentsToListArrays(rows) {

        //  I need to figure out why or how I can get this to
        //  have row not equal to undefined... always is... AHHHHHH!
        if (rows !== undefined) {       //  rows is always undefined!  KS  3/25

            this.setState({
                teamplayers: rows
            });

            //  For now push all players into the "G" heading of the
            //  UI list - We can divide them up into their "letter" categories
            //  later after we are successfully pulling all of them out
            //  of the database.  For now just clump together in 'G'......
            let name_list = [];
            this.state.teamplayers.forEach(player =>
                {
                    let temp_name = player.name;
                    name_list.push(temp_name);
                }
            );

            //  set state will all in the "G" section
            //  (this should render them all there)
            this.setState({
                names_g: name_list
            });

        } else {

            //  Our return is empty for getting all the players
            //  from the database... so just put a couple of made up
            //  names in the "J"s to show we are in this part of the
            //  conditional code
            let list = [];
            list.push('Pushing Jimmy');
            list.push('Pushing Johnny');

            this.setState({
                names_j: list
            });
        }

    }  // end addContentsToListArrays()





    //  Function to pass to the database to be called with the
    //  respective player returned from the db 'get' player
    //  sql call.  A 'TeamPlayer' object is the argument
    getSinglePlayerResultsFunction(dbPulledPlayer) {

        if (dbPulledPlayer !== undefined) {

            console.debug('RosterSectionList: selectedPlayer = ' + dbPulledPlayer.name);
            Alert.alert(dbPulledPlayer.name);

            // set the returned player to our local state instance
            this.setState({
                selectedPlayer: dbPulledPlayer.name
            });

            //  Navigate to the PlayerBio UI with biography data
            //  being loaded into its fields.
            //        navigate()/show()/instantiate() --> PlayerBio( {selectedPlayer} );


        } else {
            Alert.alert('RosterSectionList: Pull player from Database Failed!!');
        }
    }  // end getSinglePlayerResultsFunction()



    //  Function called when the respective "Player" list item is
    //  clicked on
    playerSectionListItemChosen = (requestedPlayer)=> {

        //  Get the requested player's data from the database
        let that = this;

        requestedPlayer = 'Nick Bowers';   //hard code for now.. to see if we can get it out of DBase

        //  We want to use the name to pull that player from our
        //  database Player_Table and then we inherently have all the
        //  biography data for him.  Then in the results function, we
        //  will want to navigate (and populate) the PlayerBio UI with
        //  the respective data.
        TeamRosterDao.getSinglePlayer(requestedPlayer, that.getSinglePlayerResultsFunction);

    } // end playerSectionListItemChosen()



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
                              onPress={this.playerSectionListItemChosen.bind(this, item)}> { item }
                        </Text> }
                    keyExtractor={ (item, index) => index }
                />
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

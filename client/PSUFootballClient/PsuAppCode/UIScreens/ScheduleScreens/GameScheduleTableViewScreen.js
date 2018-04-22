import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import DatabaseDAO from '../../DAO/DatabaseDAO';
import MenuFab from "../../CustomComponents/MenuFab";
import AbstractNavigableScreen from "../AbstractNavigableScreen";
import GameScheduleTable from "./GameScheduleTable";


export default class GameScheduleTableViewScreen extends AbstractNavigableScreen {

    constructor(props) {
        super(props);

        this.state = {

            tableGameData: [],
            tableIconCol: [],
            games: {}       //  rows of games from schedule DB

        }

        this.getGamesFunction = this.getGamesFunction.bind(this);

    }

    getGamesFunction(rows) {

        //  Add the games to our state
        if (rows !== undefined) {
            this.setState({
                games: rows
            });
        }
    }

    componentWillMount() {

        // Get the Game Schedule from the database
        let that = this;
        DatabaseDAO.getSchedule(that.getGamesFunction);
    }

    render() {



        return (
            <View style={styles.container}>

                <ScrollView vertical={true}>

                    <ImageBackground source={require('./../../../Images/FieldBackground.png')}
                                     resizeMode='cover'
                                     style={styles.backdrop}>

                        <Text style={styles.schedtitle}>2018 Game Schedule</Text>


                        <GameScheduleTable styles={styles} games={this.state.games}/>

                        <Text style={styles.header}> </Text>
                        <Text style={styles.header}> </Text>
                        <Text style={styles.header}> </Text>
                        <Text style={styles.header}> </Text>

                    </ImageBackground>
                </ScrollView>
                <MenuFab navigate={this.navigate}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        color: '#bbf7b4',
    },
    container: {
        flex: 1,
        padding: 2,
        paddingTop: 10,
        backgroundColor: '#0f0b40',
    },
    tableWrap: {
        width: 40,
        justifyContent: 'center',
    },
    schedtitle: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    wrapper: {
        flexDirection: 'row',
    },
    btn: {
        width: 35,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
    },
    imagestyle: {
        flex: 1,
        //margin: 3,
        height: 90,
        width: 90,
        justifyContent: 'center',
        backgroundColor: '#4cf76b',
    },
    rowstyle: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
        flexDirection: 'row',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 6,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    logocol: {
        flex: 1,
        //backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: null,
        alignItems: 'center',
    },
});


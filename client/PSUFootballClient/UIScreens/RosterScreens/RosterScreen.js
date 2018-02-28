import React from 'react';
import {StyleSheet, View} from 'react-native';
import TableView from "./PlayerTableView";


export default class RosterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jerseyNumber: '99',
            playerName: 'Ken Smith',
            position: 'QB/K',
            urlPlayerBio: '/sports/m-footbl/mtt/corey_bolds_1051040.html',
        };
    }




    render() {
        return (
            <View>
                <TableView />
            </View>
        );
    }




}  //  end RosterScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    }
});
import React from 'react';
import RosterDao from '../DAO/RosterDao';
import RosterRow from "./RosterRow";
import {Text, View} from "react-native";

export default class Roster extends React.Component {
    constructor() {
        super();
        this.state = {
            players: {}
        };
        this.setResultsFunction = this.setResultsFunction.bind(this);
    }

    setResultsFunction(rows) {
        if (rows !== undefined) {
            this.setState({
                players: rows
            });
        }
    }

    componentDidMount() {
        // make sure the db table exists if this is the first load
        // this table is an example, it should be changed to include production table columns
        let that = this;
        RosterDao.initPlayers(that.setResultsFunction);
    }

    componentWillMount() {
        let that = this;
        RosterDao.getPlayers(that.setResultsFunction);
    }

    render() {
        if (this.state.players === undefined || this.state.players.forEach === undefined || this.state.players.length === 0) {
            return <Text>No Players Found</Text>
        } else {

            let rosterTable = this.state.players.map((player) => {
                return (
                    <RosterRow
                        key={player.id}
                        name={player.name}
                        position={player.position}
                        description={player.description}
                    />
                )
            });
            return (
                <View>
                    <Text>RosterHere</Text>
                    {rosterTable}
                </View>
            )
        }
    }
}
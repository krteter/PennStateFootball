import React from 'react';
import TeamRosterDao from '../DAO/TeamRosterDao';
import TeamRosterRow from "./TeamRosterRow";
import {Text, View} from "react-native";



export default class TeamRoster extends React.Component {

    constructor() {

        super();
        this.state = {
            teamplayers: {}
        };
        this.setResultsFunction = this.setResultsFunction.bind(this);
    }


    setResultsFunction(rows) {

        if (rows !== undefined) {         //  rows keeps being undefined here! KS  3/23
            this.setState({
                teamplayers: rows
            });
        }
    }


    componentDidMount() {

        // make sure the db table exists if this is the first load
        // this table is an example, it should be changed to include production table columns
        let that = this;
        TeamRosterDao.initPlayers(that.setResultsFunction);  //  Dont want to use init here I want to
                                                               //  pull all of the players out of the database
                                                               //  that were already 'scraped' into it
   }


    componentWillMount() {

        let that = this;
        TeamRosterDao.getAllPlayers(that.setResultsFunction);

    }


    render() {

        if (this.state.teamplayers === undefined || this.state.teamplayers.forEach === undefined || this.state.teamplayers.length === 0) {
            return <Text>No Team Roster Players Found</Text>
        } else {

            let myrosterTable = this.state.teamplayers.map((teamplayer) => {
                return (
                    <TeamRosterRow
                        key={teamplayer.name}
                        name={teamplayer.name}
                        jerseyNum={teamplayer.jerseyNum}
                        position={teamplayer.position}
                        imageUrl={teamplayer.imageUrl}
                        classyear={teamplayer.classyear}
                        hometown={teamplayer.hometown}
                        heightWeight={teamplayer.heightWeight}
                        highschool={teamplayer.highschool}
                        experience={teamplayer.experience}
                        major={teamplayer.major}
                    />
                )
            });

            return (
                <View>
                    {myrosterTable}
                </View>
            )
        }
    }

}  // end class TeamRoster
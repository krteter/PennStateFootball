import React from 'react';
import GameScheduleDao from '../DAO/GameScheduleDao';
import GameScheduleRow from "./GameScheduleRow";
import {Text, View} from "react-native";

export default class GameSchedule extends React.Component {

  constructor() {
    super();
    this.state = {
      games: {}
    };
    this.setResultsFunction = this.setResultsFunction.bind(this);
  }

  setResultsFunction(rows) {
    if (rows !== undefined) {
      this.setState({
        games: rows
      });
    }
  }

  componentDidMount() {
    // Make sure the db table exists if this is the first load
    let that = this;
    GameScheduleDao.initGameScheduleDB(that.setResultsFunction);
  }

  componentWillMount() {
    let that = this;
    GameScheduleDao.getSchedule(that.setResultsFunction);
  }

  render() {
    if (this.state.games === undefined || this.state.games.forEach === undefined || this.state.games.length === 0) {
      return <Text>No Scheduled Games Found</Text>
    } else {
      let myGameScheduleTable = this.state.games.map((game) => {
        return (
          <GameScheduleRow
            id={game.id}
            key={game.id}
            gamedate={game.gamedate}
            homeaway={game.homeaway}
            opponent={game.opponent}
            href={game.href}
            imgsrc={game.imgsrc}
            result={game.result}
            score={game.score}
          />
        )
      });
      return (
        <View>
          {myGameScheduleTable}
        </View>
      )
    } // End if
  } // End render()
}  // End class GameSchedule

import React from 'react';
import GameScheduleDao from '../../DAO/GameScheduleDao';
import GameSchedule from '../../UIScreens/ScheduleScreens/GameSchedule';
import {Text, View} from "react-native";

export default class GameScheduleScreen extends React.Component {

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
          <GameSchedule
            key={game.id}
            id={game.id}
            opponent={game.opponent}
            href={game.href}
            imgsrc={game.imgsrc}
            gamedate={game.gamedate}
            homeaway={game.homeaway}
            result={game.result}
            score={game.score}
          />
        ) // End return()
      });
      return (
        <View>
          {myGameScheduleTable}
        </View>
      )
    } // End if
  } // End render()
}  // End class GameSchedule

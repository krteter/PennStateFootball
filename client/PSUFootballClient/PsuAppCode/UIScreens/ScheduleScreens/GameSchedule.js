import React from 'react';
import {Text, View} from 'react-native';

export default class GameSchedule extends React.Component{

  constructor() {
    super();
    this.state = {
      id: null,
      opponentid: '',
      opponent: '',
      href: '',
      imgsrc: '',
      gamedate: '',
      gamedatezulu: '',
      homeaway: '',
      result: '',
      score: ''
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.id,
      opponentid: this.props.opponentid,
      opponent: this.props.opponent,
      href: this.props.href,
      imgsrc: this.props.imgsrc,
      gamedate: this.props.gamedate,
      gamedatezulu: this.props.gamedatezulu,
      homeaway: this.props.homeaway,
      result: this.props.result,
      score: this.props.score
    })
  }

  render() {
    return (
      <View>
        <Text>TeamName: {this.state.opponent}</Text>
        <Text>GameDate: {this.state.gamedate}</Text>
        <Text>Home or Away? {this.state.homeaway}</Text>
        <Text>--  --  --  --  --</Text>
      </View>
    )
  }
}

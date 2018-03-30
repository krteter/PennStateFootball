import React from 'react';
import {Text, View} from 'react-native';

export default class GameScheduleRow extends React.Component{

  constructor() {
    super();
    this.state = {
      id: null,
      gamedate: '',
      homeaway: '',
      opponent: '',
      href: '',
      imgsrc: '',
      result: '',
      score: ''
    };
  }

  componentWillMount() {
    this.setState({
      OpponentId: this.props.id,
      GameDate: this.props.gamedate,
      HomeAway: this.props.homeaway
      Opponent: this.props.opponent,
      OpponentHref: this.props.href,
      OpponentImgSrc: this.props.imgsrc,
      Result: this.props.result,
      Score: this.props.score
    })
  }

  render() {
    return (
      <View>
        <Text>{this.state.id}</Text>
        <Text>{this.state.gamedate}</Text>
        <Text>{this.state.homeaway}</Text>
        <Text>{this.state.opponent}</Text>
        <Text>{this.state.href}</Text>
        <Text>{this.state.imgsrc}</Text>
        <Text>{this.state.result}</Text>
        <Text>{this.state.score}</Text>
        <Text>--  --  --  --  --</Text>
      </View>
    )
  }
}

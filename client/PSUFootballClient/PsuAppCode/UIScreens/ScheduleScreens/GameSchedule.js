import React from 'react';
import {Text, View} from 'react-native';

export default class GameSchedule extends React.Component{

  constructor() {
    super();
    this.state = {
      id: null,
      opponent: '',
      href: '',
      imgsrc: '',
      gamedate: '',
      homeaway: '',
      result: '',
      score: ''
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.id,
      opponent: this.props.opponent,
      href: this.props.href,
      imgsrc: this.props.imgsrc,
      gamedate: this.props.gamedate,
      homeaway: this.props.homeaway,
      result: this.props.result,
      score: this.props.score
    })
  }

  render() {
    return (
      <View>
        <Text>Id: {this.state.id}</Text>
        <Text>TeamName: {this.state.opponent}</Text>
        <Text>TeamUrl: {this.state.href}</Text>
        <Text>TeamImgSrc: {this.state.imgsrc}</Text>
        <Text>GameDate: {this.state.gamedate}</Text>
        <Text>Home or Away? {this.state.homeaway}</Text>
        <Text>GameResult: {this.state.result}</Text>
        <Text>GameScore: {this.state.score}</Text>
        <Text>--  --  --  --  --</Text>
      </View>
    )
  }
}

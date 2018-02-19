import React from 'react';
import { StyleSheet, View } from 'react-native';
import TwitterStream from "./TwitterClient/TwitterStream";

export default class App extends React.Component {
  render() {
    return (

        <TwitterStream/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

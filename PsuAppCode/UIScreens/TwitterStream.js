import React from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import {Fab, Icon, Button} from 'native-base';

export default class TwitterStream extends React.Component {

  constructor(props) {

      super(props);

      this.state = {
        active:false
      };

  }  // end constructor
    render() {
        let js = '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
        let source = js + '<a class="twitter-timeline" href="https://twitter.com/PennStateFball?ref_src=twsrc%5Etfw">Tweets by PennStateFball</a>';

        return (
            <View
                style={styles.container}
            >
                <WebView
                    style={styles.container}
                    source={{html: source}}
                    javaScriptEnabled={true}
                />
                <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={[styles.fabStyle, {backgroundColor: '#5067FF'}]}
                  position="bottomRight"
                  onPress={() => this.setState({ active: !this.state.active })}>
                  <Icon name="share" />
                  <Button style={{ backgroundColor: '#4248f4' }}>
                    <Icon
                      name="home"
                      onPress={() => this.props.navigation.navigate('Home')}
                    />
                  </Button>
                  <Button style={{ backgroundColor: '#f44242' }}>
                    <Icon name="american-football" />
                  </Button>
                  <Button style={{ backgroundColor: '#f4a941' }}>
                    <Icon
                      name="search"
                    />
                  </Button>
                  <Button style={{ backgroundColor: '#dcf441' }}>
                    <Icon
                      name="people"
                      onPress={() => this.props.navigation.navigate('AlphabetRosterList')}
                    />
                  </Button>
                  <Button style={{ backgroundColor: '#4ff441' }}>
                    <Icon
                      name="rainy"
                      onPress={() => this.props.navigation.navigate('GameDayWeather')}
                    />
                  </Button>
                  <Button style={{ backgroundColor: '#41f4eb' }}>
                    <Icon
                      name="calendar"
                      onPress={() => this.props.navigation.navigate('CalendarEvent')}
                    />
                  </Button>
                  <Button disabled style={{ backgroundColor: '#4155f4' }}>
                    <Icon
                      name="egg"
                      onPress={() => this.props.navigation.navigate('Twitter')}
                    />
                  </Button>
                </Fab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    }
});

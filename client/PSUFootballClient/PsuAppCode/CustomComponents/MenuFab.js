import React from 'react';
import {Button, Fab, Icon} from 'native-base';
import {StyleSheet} from "react-native";

export default class MenuFab extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        }
        this.navigate = this.navigate.bind(this);
    }

    navigate(location) {
        this.props.navigate(location);
    }

    render() {
        return (
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{}}
                style={[styles.fabStyle, {backgroundColor: '#5067FF'}]}
                position="bottomRight"
                onPress={() => this.setState({active: !this.state.active})}>
                <Icon name="share"/>
                <Button style={{backgroundColor: '#4248f4'}}>
                    <Icon
                        name="home"
                        onPress={() => this.navigate('Home')}
                    />
                </Button>
                <Button style={{backgroundColor: '#f44242'}}>
                    <Icon name="american-football"/>
                </Button>
                <Button style={{backgroundColor: '#f4a941'}}>
                    <Icon
                        name="search"
                    />
                </Button>
                <Button style={{backgroundColor: '#dcf441'}}>
                    <Icon
                        name="people"
                        onPress={() => this.navigate('AlphabetRosterList')}
                    />
                </Button>
                <Button style={{backgroundColor: '#4ff441'}}>
                    <Icon
                        name="rainy"
                        onPress={() => this.navigate('GameDayWeather')}
                    />
                </Button>
                <Button style={{backgroundColor: '#41f4eb'}}>
                    <Icon
                        name="calendar"
                        onPress={() => this.navigate('CalendarEvent')}
                    />
                </Button>
                <Button disabled style={{backgroundColor: '#4155f4'}}>
                    <Icon
                        name="egg"
                        onPress={() => this.navigate('Twitter')}
                    />
                </Button>
            </Fab>

        )
    }
}

var styles = StyleSheet.create({
    fabStyle: {
        flex: .23,
        flexDirection: 'row',
        backgroundColor: '#FF3366'
    }
});
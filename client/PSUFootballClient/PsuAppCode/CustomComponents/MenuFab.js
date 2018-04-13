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
                style={[styles.fabStyle, {backgroundColor: '#717171'}]}
                position="bottomRight"
                onPress={() => this.setState({active: !this.state.active})}>
                <Icon name="menu"/>
                <Button style={{backgroundColor: '#0f0b40'}}>
                    <Icon
                        name="home"
                        onPress={() => this.navigate('Home')}
                    />
                </Button>
                <Button style={{backgroundColor: '#0f0b40'}}>
                    <Icon
                        name="people"
                        onPress={() => this.navigate('AlphabetRosterList')}
                    />
                </Button>
                <Button style={{backgroundColor: '#0f0b40'}}>
                    <Icon
                        name="rainy"
                        onPress={() => this.navigate('GameDayWeather')}
                    />
                </Button>
                <Button style={{backgroundColor: '#0f0b40'}}>
                    <Icon
                        name="calendar"
                        onPress={() => this.navigate('GameSchedule')}
                    />
                </Button>
                <Button style={{backgroundColor: '#535353'}}>
                    <Icon
                        name="calendar"
                        onPress={() => this.navigate('GameScheduleTableView')}
                    />
                </Button>
                <Button disabled style={{backgroundColor: '#0f0b40'}}>
                    <Icon
                        name="logo-twitter"
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

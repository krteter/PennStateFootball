import React from 'react';
import { Icon, Button, Fab } from 'native-base';
import Expo from "expo";
import HomeScreen from "../UIScreens/HomeScreen";

export default class MenuFab extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            loading:true
        }
    }

    render() {
        // Checks to see if font loading is complete before render.
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return (
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={[HomeScreen.styles.fabStyle, {backgroundColor: '#5067FF'}]}
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

        )
    }


}
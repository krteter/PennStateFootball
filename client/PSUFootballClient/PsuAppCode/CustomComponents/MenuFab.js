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
        this.navigateToCalendar = this.navigateToCalendar.bind(this);
    }


    navigate(location) {
        this.props.navigate(location);


//AddCalendarEventScreen
//        onPress={() => this.props.navigation.navigate('CalendarEvent', {startDateString: '2018-05-06T18:00:00.000Z',
//                                                                        location: 'Beaver Stadium',
//                                                                        description: 'PSU Nittany Lions vs. VaTech Hokies',
//                                                                        notes: 'White-Out Game',
//                                                                        eventState: 'PA'} )}


//TicketSearchScreen
//        onPress={() => this.props.navigation.navigate('TicketSearch', {startDateString: '2018-09-29T12:00:00.000Z',
//                                                                       description: 'PSU Nittany Lions vs. OSU Buckeyes'} )}

    }

    //
    //  Method to add event to Calendar
    //  However this wont be here and will be located
    //  to the game schedule screen.
    navigateToCalendar() {


        //this.props.navigate('CalendarEvent');

        this.props.navigation.navigate('CalendarEvent', {startDateString: '2018-05-06T18:00:00.000Z',
                                                         location: 'Beaver Stadium',
                                                         description: 'PSU Nittany Lions vs. VaTech Hokies',
                                                         notes: 'White-Out Game',
                                                         eventState: 'PA'} )


    }  // end navigateToCalendar()



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
                {/*<Button style={{backgroundColor: '#f44242'}}>
                    <Icon name="american-football"/>
                </Button>*/}
                {/*<Button style={{backgroundColor: '#f4a941'}}>
                    <Icon
                        name="search"
                    />
                </Button> */}
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
                <Button style={{backgroundColor: '#7a0f69'}}>
                    <Icon
                      name="calendar"
                      onPress={() => this.navigate('GameSchedule')}
                    />
                </Button>
                <Button disabled style={{backgroundColor: '#26a6f4'}}>
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

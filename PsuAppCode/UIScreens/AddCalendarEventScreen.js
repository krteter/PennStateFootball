import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Fab, Icon, Button} from 'native-base';
import RNCalendarEvents from 'react-native-calendar-events';



//
//  Class for a UI to display adding an
//  event to our device's Calendar App
//
export default class AddCalendarEventScreen extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            active:false,
            buttonTitle: '+  Add Event',
            buttonDisabled: false,
            calendarAuth: '',
            eventStartDateString: '',   // Format:  2018-05-06T18:00:00.000Z
            eventStopDateString: '',    // Format:  2018-05-06T20:00:00.000Z  (greater than start time!!)
            location: '',
            notes: '',
            description: '',
        };

        this.addEventToMyCalendar = this.addEventToMyCalendar.bind(this);
    }


    //
    //  Method to add an event to the Android calendar
    //  - using 'react-native-calendar-events' package
    //
    addEventToMyCalendar() {

        //  Check if we are authorized to add
        //  an event to our Calendar App
        if (this.state.calendarAuth !== 'authorized') {

            Alert.alert('Not authorized to add event to Calendar');

        } else {

            //  Add the respective event to our device's
            //  Calendar App
            //      reference:   https://github.com/wmcmahan/react-native-calendar-events/blob/master/README.md#saveevent
            RNCalendarEvents.saveEvent(this.state.description, {

                startDate: this.state.eventStartDateString,
                endDate:   this.state.eventEndDateString,
                location: this.state.location,
                description: this.state.description,
                notes: this.state.notes,
            });

            // Set the Component's Button state to 'Done'
            this.setState({
                buttonTitle: "Done",
                buttonDisabled: true
            });

        }  // end if else

    }  // end addEventToMyCalendar()


//    componentDidMount () {
//    }


    componentWillMount () {

        // Set the Component's state
        this.setState({
            eventStartDateString: this.props.navigation.state.params.startDateString,
            eventEndDateString:   this.props.navigation.state.params.endDateString,
            location: this.props.navigation.state.params.location,
            description: this.props.navigation.state.params.description,
            notes: this.props.navigation.state.params.notes,
        });


            // Let's get access before doing anything
        RNCalendarEvents.authorizationStatus()
            .then(status => {

                // if the status was previous accepted, set the authorized status to state
                this.setState({
                    calendarAuth: status
                });

                if (status === 'undetermined') {

                    // if we made it this far, we need to ask the user for access
                    RNCalendarEvents.authorizeEventStore()
                        .then((out) => {

                            if (out === 'authorized') {

                                // set the new status to the auth state
                                this.setState({
                                    calendarAuth: out
                                });
                            }
                        })   // end then
                }  // end if status
            }) // end then

            .catch(error => console.warn('Auth Error: ', error));

    }   // end componentWillMount()


    render() {

        return (
            <View style={styles.container}>

                    <Text style={styles.header}> Add Event To Calendar </Text>
                    <View style={styles.addeventview}>
                        <Text style={styles.eventdescription}>{this.state.description}</Text>
                        <Text style={styles.eventdetails}>Location:  {this.state.location}</Text>
                        <Text style={styles.eventdetails}>Start:  {this.state.eventStartDateString}</Text>
                        <Text style={styles.eventdetails}>End:    {this.state.eventEndDateString}</Text>
                        <Text style={styles.eventdetails}>{this.state.notes}</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title={this.state.buttonTitle}
                                disabled={this.state.buttonDisabled}
                                onPress={() => this.addEventToMyCalendar()} />
                    </View>
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


}  // end AddCalendarEventScreen



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
    },
    header: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    eventdescription: {
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    eventdetails: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
    },
    addeventview: {
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        marginTop: 70,
        marginBottom: 70,
        marginVertical: 5,
        minWidth: 200,
        maxWidth: '50%',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: null,
        height: null,
    },
});

import React from 'react';
import {Alert, Button, StyleSheet, Text, View, ImageBackground} from 'react-native';
//import {Button} from 'native-base';
import RNCalendarEvents from 'react-native-calendar-events';
import AbstractNavigableScreen from "./AbstractNavigableScreen";
import MenuFab from "../CustomComponents/MenuFab";


//
//  Class for a UI to display adding an
//  event to our device's Calendar App
//
export default class AddCalendarEventScreen extends AbstractNavigableScreen {

    constructor(props) {

        super(props);

        this.state = {
            buttonTitle: 'Add Event',
            buttonDisabled: false,
            calendarAuth: 'authorized',
            // calendarAuth: '',
            eventStartDateString: '',   // Format:  2018-05-06T18:00:00.000Z
            duration:  3,               // Duration = 3 hrs (default it!)
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

        //let ken = 'authorized';


        //  Check if we are authorized to add
        //  an event to our Calendar App
        if (this.state.calendarAuth !== 'authorized') {
            Alert.alert('Not authorized to add event to Calendar');
        } else {

            //  Determine the end time from the start time
            //  (we wont assume rollover of time/day.  Since
            //  events wont start that late.  (we could make this
            //  better, but it will do for our purposes

            let eventStartString = this.state.eventStartDateString;
            let startTimeHour = eventStartString.substr(11,2);
            let endTimeHourInt = parseInt(startTimeHour) + this.state.duration;
            let endTimeHour = endTimeHourInt.toString();
            let beginning = eventStartString.substr(0,11);
            let ending = eventStartString.substr(13,eventStartString.length-1);
            let endDateString = beginning + endTimeHour + ending;


            console.debug('Event Start: ' + eventStartString);
            console.debug('Event End: ' + endDateString);
            console.debug('Location: ' + this.state.location);
            console.debug('Description: ' + this.state.description);
            console.debug('Notes: ' + this.state.notes);

            // let startDatetime = new Date(eventStartString);
            // let endDatetime = new Date(endDateString);

            // console.debug('Event Start: ' + startDatetime.toUTCString());
            // console.debug('Event End: ' + endDatetime.toUTCString());

            //  Add the respective event to our device's
            //  Calendar App
            //      reference:   https://github.com/wmcmahan/react-native-calendar-events/blob/master/README.md#saveevent
            // RNCalendarEvents.saveEvent(this.state.description, { startDate: eventStartString,
            //                                                      endDate:   endDateString,
            //                                                      location: this.state.location,
            //                                                      description: this.state.description,
            //                                                      notes: this.state.notes });


            // RNCalendarEvents.saveEvent('title test', { startDate: eventStartString.replace(/-/g,'').replace(/:/g,'').replace('.000',''),
            //                                            endDate: endDateString.replace(/-/g,'').replace(/:/g,'').replace('.000','') });

            // Set the Component's Button state to 'Done'
            this.setState({
                buttonTitle: "Done",
                buttonDisabled: true
            });

        }  // end if else

    }  // end addEventToMyCalendar()


//    componentDidMount () {
//    }


componentWillMount() {


  // Set the Component's state
  this.setState({
    eventStartDateString: this.props.navigation.state.params.startDateString,
    location: this.props.navigation.state.params.location,
    description: this.props.navigation.state.params.description,
    notes: this.props.navigation.state.params.notes
  });


  // this works for android simulator, but giving me
  //   problems on my OS phone


  // Let's get access before doing anything
  // console.debug(RNCalendarEvents.authorizeEventStore())
  // .then(status => {
  //
  //   // if the status was previous accepted, set the authorized status to state
  //   this.setState({
  //     calendarAuth: status
  //   });
  //
  //   if (status === 'undetermined') {
  //
  //     // if we made it this far, we need to ask the user for access
  //     RNCalendarEvents.authorizeEventStore()
  //     .then((out) => {
  //
  //       if (out === 'authorized') {
  //
  //         // set the new status to the auth state
  //         this.setState({
  //           calendarAuth: out
  //         });
  //       }
  //     })   // end then
  //   }  // end if status
  // }) // end then
  // .catch(error => console.warn('Auth Error: ', error));

}   // end componentWillMount()


    render() {

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../Images/FieldBackground.png')}
                                 resizeMode='cover'
                                 style={styles.backdrop}>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}>Add Event</Text>
                    <Text style={styles.header}>To Calendar</Text>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}> </Text>

                    <View style={styles.addeventview}>
                        <Text style={styles.eventdescription}>{this.state.description}</Text>
                        <Text style={styles.eventdetails}>Location:  {this.state.location}</Text>
                        <Text style={styles.eventdetails}>Start:  {this.state.eventStartDateString}</Text>
                        <Text style={styles.eventdetails}>Duration:   {this.state.duration} hrs</Text>
                        {/* <Text style={styles.eventdetails}>{this.state.notes}</Text> */}
                    </View>
                    <View style={styles.button}>
                        <Button title={this.state.buttonTitle}
                                disabled={this.state.buttonDisabled}
                                onPress={() => this.addEventToMyCalendar()} />
                    </View>
                    <MenuFab navigate={this.navigate}/>
                </ImageBackground>
            </View>
        );
    }


}  // end AddCalendarEventScreen



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#0f0b64',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
    },
    header: {
        alignSelf: 'center',
        //marginTop: 50,
        //marginBottom: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    eventdescription: {
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    eventdetails: {
        alignSelf: 'center',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#ffffff',
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
        width: '100%',
        height: null,
        alignItems: 'center',
    },
});

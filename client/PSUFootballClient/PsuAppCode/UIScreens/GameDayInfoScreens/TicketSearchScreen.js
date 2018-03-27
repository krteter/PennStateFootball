import React from 'react';
import {Alert, Button, Linking, StyleSheet, Text, View} from 'react-native';




//
//  Class for a UI to display adding an
//  event to our device's Calendar App
//
export default class TicketSearchScreen extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            buttonTitle: 'Search For Tickets',
            buttonDisabled: false,
            calendarAuth: '',
            eventStartDateString: '',   // Format:  2018-05-06T18:00:00.000Z
            eventStopDateString: '',    // Format:  2018-05-06T20:00:00.000Z  (greater than start time!!)
            location: '',
            notes: '',
            description: '',
            seatgeekClientId: 'abcdefghijklmnop',
        };

        this.searchForTickets = this.searchForTickets.bind(this);
    }


    //
    //  Method to add an event to the Android calendar
    //  - using 'react-native-calendar-events' package
    //
    searchForTickets() {


        // smitty
        let linkToTicketsWebsiteUrl = 'https://seatgeek.com/ohio-state-buckeyes-at-penn-state-nittany-lions-football-tickets/ncaa-football/2018-09-29-12-pm/4111014';
        Linking.canOpenURL(linkToTicketsWebsiteUrl).then(supported => {

            if (!supported) {
                console.log('Can\'t open website ticket URL: ' + linkToTicketsWebsiteUrl);
            } else {

                //  The Linking component allows a redirect with the
                //  respective URL into the device's default web browser
                return Linking.openURL(linkToTicketsWebsiteUrl);
            }

        }).catch(err =>
            console.error('An error occurred Linking to ', err)
        );

    }  // end searchForTickets()



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


    }   // end componentWillMount()


    render() {

        return (
            <View style={styles.container}>

                <Text style={styles.header}> Search For Game Tickets </Text>
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
                            onPress={() => this.searchForTickets()} />
                </View>

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
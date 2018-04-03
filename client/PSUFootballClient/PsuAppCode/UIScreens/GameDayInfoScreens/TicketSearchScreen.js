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
            eventStartDateString: '',   // Format:  2018-05-06T18:00:00.000Z
            eventEndDateString: '',     // Format:  2018-05-06T18:00:00.000Z
            location: '',
            description: '',
            notes: '',
            eventState: '',
            ticketWebsiteUrl: 'www.psu.edu',
            eventId: '123456',
        };


        this.getEventId = this.getEventId.bind(this);
        this.getTicketWebsiteUrl = this.getTicketWebsiteUrl.bind(this);
        this.searchForTickets = this.searchForTickets.bind(this);
    }


    //
    //  Method to get the SeatGeek ticket site given
    //  the respective Event Id.  We will use this
    //  Url to redirect the user to ticket sales.
    //
    getTicketWebsiteUrl() {

        let queryTicketsUrl = 'https://api.seatgeek.com/2/events/' + this.state.eventId;

        //  Fetch the tickets website URL from a returned JSON response
        fetch(queryTicketsUrl)
            .then(response => response.json())
            .then(jsonString => {

                //  set tickets website url
                this.setState({
                    ticketWebsiteUrl: jsonString.events[0].url,
                });

            }).catch(err =>
            console.error('An error occurred Linking to ', err)
        );

    }  // end getTicketWebsiteUrl()



    //
    //  Method to search for an Event Id via SeatGeek Ticket API
    //  from the respective date, event venue, and Nittany Lions
    //
    getEventId() {


        //  Parse the dateString for month, day, year
        //parse = parse.dateString;   TBD
        let month = '09';
        let startDay = '29';
        let year = '2018';
        let endDateInt = parseInt(startDay) + 1;
        let endDay = endDateInt.toString();

        let eventQueryUrl = 'https://api.seatgeek.com/2/events?client_id=MTEwMTQyODN8MTUyMjE5NjY2NC4xOQ' +
                            '&datetime_utc.gt=' + year + '-' + month + '-' + startDay +
                            '&datetime_utc.lt=' + year + '-' + month + '-' + endDay +
                            '&q=nittany+lions';


        //  Fetch the EventUrl from a returned JSON response
        fetch(eventQueryUrl)
            .then(response => response.json())
            .then(jsonString => {

                //  set eventId
                this.setState({
                    eventId: jsonString.events[0].id,
                    ticketWebsiteUrl: jsonString.events[0].url,
                });

            }).catch(err =>
            console.error('An error occurred Linking to ', err)
        );

    }  // end getEventId()


    //
    //  Method to Redirect and load the event ticket website in
    //  the device's web browser default app
    //
    searchForTickets(linkToTicketsWebsiteUrl) {

        //linkToTicketsWebsiteUrl = 'https://seatgeek.com/ohio-state-buckeyes-at-penn-state-nittany-lions-football-tickets/ncaa-football/2018-09-29-12-pm/4111014';

        // Set the Component's Button state to 'Done'
        this.setState({
            buttonTitle: "Done",
            buttonDisabled: true
        });

        //  Check if linking to web browser app is supported
        //  for this device/user
        Linking.canOpenURL(linkToTicketsWebsiteUrl).then(supported => {

            if (supported) {

                //  The Linking component allows a redirect with the
                //  respective URL into the device's default web browser
                return Linking.openURL(linkToTicketsWebsiteUrl);

            } else {
                Alert.alert('Error: Opening web browser from app is not supported')
            }

        }).catch(err =>
            Alert.alert('An error occurred opening browser at: ', err)
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
            eventState: this.props.navigation.state.params.eventState,
        });


        //  Fetch the respective Event Id for the desired event
        this.getEventId();

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
                            onPress={() => this.searchForTickets(this.state.ticketWebsiteUrl)} />
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
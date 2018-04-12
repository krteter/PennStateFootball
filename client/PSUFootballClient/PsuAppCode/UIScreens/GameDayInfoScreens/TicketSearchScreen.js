import React from 'react';
import {Alert, Button, Linking, StyleSheet, Text, View, ImageBackground} from 'react-native';

import AbstractNavigableScreen from "../AbstractNavigableScreen";
import MenuFab from "../../CustomComponents/MenuFab";



//
//  Class for a UI to display adding an
//  event to our device's Calendar App
//
export default class TicketSearchScreen extends AbstractNavigableScreen {

    constructor(props){

        super(props);

        this.state = {
            buttonTitle: 'Search',
            buttonDisabled: false,
            eventStartDateString: '',   // Format:  2018-05-06T18:00:00.000Z
            description: '',
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
        //  and add a day to create the enddate
        let dateString = this.state.eventStartDateString;
        let startString = dateString.substr(0,10);
        let startDay = startString.substr(8,2);
        let endDateInt = parseInt(startDay) + 1;
        let endDay = endDateInt.toString();
        let endYearMonth = startString.substr(0,8);
        let endString = endYearMonth.concat(endDay);



        let eventQueryUrl = 'https://api.seatgeek.com/2/events?client_id=MTEwMTQyODN8MTUyMjE5NjY2NC4xOQ' +
                            '&datetime_utc.gt=' + startString +
                            '&datetime_utc.lt=' + endString +
                            '&q=nittany+lions';


        //  Fetch the EventUrl from a returned JSON response
        fetch(eventQueryUrl)
            .then(response => response.json())
            .then(jsonString => {

                //  The JSON from the SeatGeek API will return the eventID for the
                //  event that day for the nittany lions and the ticket website URL
                //  will be listed for that event.
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

        //  Example of what url should look like:
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



    componentDidMount () {

        //  Fetch the respective Event Id for the desired event
        this.getEventId();
    }


    componentWillMount () {


        // Set the Component's state
        this.setState({
            eventStartDateString: this.props.navigation.state.params.startDateString,
            description: this.props.navigation.state.params.description,
        });


    }   // end componentWillMount()


    render() {

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../Images/FieldBackground.png')}
                                 resizeMode='cover'
                                 style={styles.backdrop}>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}> Search For </Text>
                    <Text style={styles.header}> Game Tickets </Text>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}> </Text>

                    <View style={styles.addeventview}>
                        <Text style={styles.eventdescription}>{this.state.description}</Text>
                        <Text style={styles.eventdetails}>Date:  {this.state.eventStartDateString}</Text>
                    </View>
                    <Text style={styles.header}> </Text>
                    <Text style={styles.header}> </Text>
                    <View>
                        <Button style={styles.button}
                                title={this.state.buttonTitle}
                                disabled={this.state.buttonDisabled}
                                onPress={() => this.searchForTickets(this.state.ticketWebsiteUrl)} />
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
        backgroundColor: '#0f0b40',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
    },
    header: {
        alignSelf: 'center',
        //marginTop: 50,
        //marginBottom: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    eventdescription: {
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    eventdetails: {
        alignSelf: 'center',
        fontSize: 14,
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
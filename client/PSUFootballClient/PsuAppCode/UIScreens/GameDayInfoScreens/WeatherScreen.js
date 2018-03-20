import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


//
//  Class that will return the animated radar gif
//  from weather service for State College, PA
//  (Penn State University)
export default class WeatherScreen extends React.Component {



    render() {

        let animatedRadarUrl = 'http://api.wunderground.com/api/0c830f11d869563e/animatedradar/q/PA/State_College.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';

        return (
            <View style={styles.weathercontainer}>
                <Text style={styles.citytext}>University Park, PA - Radar </Text>

                <Image source={{uri: animatedRadarUrl}}
                       style={{width: 300, height: 300}} />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    weathercontainer: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        height: '100%',
    },
    imagestyle: {
        marginTop: 40,
        marginBottom: 10,
        justifyContent: 'center',
        width: 400,
        height: 400,
    },
    citytext: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import GameDayForecast from "../../Domain/GameDayForecast";
import AbstractNavigableScreen from "../AbstractNavigableScreen";
import MenuFab from "../../CustomComponents/MenuFab";


//
//  Class that will return the animated radar gif
//  from weather service for State College, PA
//  (Penn State University)
//
export default class WeatherScreen extends AbstractNavigableScreen {


    constructor(props) {

        super(props);

        //  Create an array of hourly game day forecast
        const hourly_forecast = [];
        const numHours = 6;

        for (let i = 0; i < numHours; i++) {
            let gameday_forecast = new GameDayForecast();
            hourly_forecast.push({gameday_forecast});
        }


        //  State stuff to re-render
        this.state = {
            hourly_forecast,
        };

        this.getForecastData = this.getForecastData.bind(this);

    }  // end constructor


//    componentDidMount() {
//    }


    getForecastData(url) {


        fetch(url)
            .then(response => response.json())
            .then(jsonString => {

                //  Make copy of class to make modifications to it to be re-rendered
                //  Dont know if there is a more elegant way of updating each field
                //  of this class, but for now.. "getter done"!
                let newHourlyForecast = JSON.parse(JSON.stringify(this.state.hourly_forecast));   // make copy of class

                for (let i = 0; i < newHourlyForecast.length; i++) {

                    //  Update class contents
                    newHourlyForecast[i].weekday_name = jsonString.hourly_forecast[i].FCTTIME.weekday_name_abbrev;
                    newHourlyForecast[i].month_name_abr = jsonString.hourly_forecast[i].FCTTIME.mon_abbrev;
                    newHourlyForecast[i].mday = jsonString.hourly_forecast[i].FCTTIME.mday_padded;
                    newHourlyForecast[i].hour_time = jsonString.hourly_forecast[i].FCTTIME.civil;
                    newHourlyForecast[i].temp = jsonString.hourly_forecast[i].temp.english;
                    newHourlyForecast[i].icon_url = jsonString.hourly_forecast[i].icon_url;
                    newHourlyForecast[i].wind_speed = jsonString.hourly_forecast[i].wspd.english;
                    newHourlyForecast[i].wind_direction = jsonString.hourly_forecast[i].wdir.dir;
                    newHourlyForecast[i].forecast = jsonString.hourly_forecast[i].wx;
                }

                //  set the state and re-render/update
                //  w/new values
                this.setState({
                    hourly_forecast: newHourlyForecast,
                });

            });

    }  // end getForecastData()


    componentWillMount() {

        //  Get the 6 hour forecast
        let forecastUrl = 'http://api.wunderground.com/api/0c830f11d869563e/hourly/q/PA/State_College.json';

        let that = this;
        that.getForecastData(forecastUrl);
    }


    render() {

        //  So this weather map seems to load..then get cached in the Android simulator
        //  and doesnt change.  So for now... good.  Later look into why its cached.  -Ken  3/22/18

        //let animatedRadarUrl = 'http://api.wunderground.com/api/0c830f11d869563e/animatedradar/q/PA/State_College.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
        let animatedRadarUrl = 'http://api.wunderground.com/api/0c830f11d869563e/radar/image.gif?centerlat=40.8&centerlon=-77.86&radius=40&width=640&height=480&rainsnow=0&timelabel=1&noclutter=1&newmaps=1';

        return (
            <View>
                <ScrollView contentContainerStyle={styles.weathercontainer}>
                    <Text style={styles.citytext}>University Park, PA - Radar </Text>

                    <Image source={{uri: animatedRadarUrl}}
                           style={{width: 300, height: 300}}/>
                    <Text style={styles.weatherheader}>6 Hour Weather Forecast </Text>
                    <Text
                        style={styles.weatherdate}>  {this.state.hourly_forecast[0].hour_time}: {this.state.hourly_forecast[0].weekday_name} {this.state.hourly_forecast[0].month_name_abr}-{this.state.hourly_forecast[0].mday}</Text>
                    <Text style={styles.weathertext}>  {this.state.hourly_forecast[0].temp}/F
                        - {this.state.hourly_forecast[0].forecast}</Text>
                    <Text style={styles.weathertext}> Wind
                        - {this.state.hourly_forecast[0].wind_direction}-{this.state.hourly_forecast[0].wind_speed}mph</Text>
                    <Text style={styles.weathertext}>-- -- -- -- --</Text>

                    <Text
                        style={styles.weatherdate}>  {this.state.hourly_forecast[1].hour_time}: {this.state.hourly_forecast[1].weekday_name} {this.state.hourly_forecast[1].month_name_abr}-{this.state.hourly_forecast[1].mday}</Text>
                    <Text style={styles.weathertext}>  {this.state.hourly_forecast[1].temp}/F
                        - {this.state.hourly_forecast[1].forecast}</Text>
                    <Text style={styles.weathertext}> Wind
                        - {this.state.hourly_forecast[1].wind_direction}-{this.state.hourly_forecast[1].wind_speed}mph</Text>
                    <Text style={styles.weathertext}>-- -- -- -- --</Text>

                    <Text
                        style={styles.weatherdate}>  {this.state.hourly_forecast[2].hour_time}: {this.state.hourly_forecast[2].weekday_name} {this.state.hourly_forecast[2].month_name_abr}-{this.state.hourly_forecast[2].mday}</Text>
                    <Text style={styles.weathertext}>  {this.state.hourly_forecast[2].temp}/F
                        - {this.state.hourly_forecast[2].forecast}</Text>
                    <Text style={styles.weathertext}> Wind
                        - {this.state.hourly_forecast[2].wind_direction}-{this.state.hourly_forecast[2].wind_speed}mph</Text>
                    <Text style={styles.weathertext}>-- -- -- -- --</Text>

                    <Text
                        style={styles.weatherdate}>  {this.state.hourly_forecast[3].hour_time}: {this.state.hourly_forecast[3].weekday_name} {this.state.hourly_forecast[3].month_name_abr}-{this.state.hourly_forecast[3].mday}</Text>
                    <Text style={styles.weathertext}>  {this.state.hourly_forecast[3].temp}/F
                        - {this.state.hourly_forecast[3].forecast}</Text>
                    <Text style={styles.weathertext}> Wind
                        - {this.state.hourly_forecast[3].wind_direction}-{this.state.hourly_forecast[3].wind_speed}mph</Text>
                    <Text style={styles.weathertext}>-- -- -- -- --</Text>

                    <Text
                        style={styles.weatherdate}>  {this.state.hourly_forecast[4].hour_time}: {this.state.hourly_forecast[4].weekday_name} {this.state.hourly_forecast[4].month_name_abr}-{this.state.hourly_forecast[4].mday}</Text>
                    <Text style={styles.weathertext}>  {this.state.hourly_forecast[4].temp}/F
                        - {this.state.hourly_forecast[4].forecast}</Text>
                    <Text style={styles.weathertext}> Wind
                        - {this.state.hourly_forecast[4].wind_direction}-{this.state.hourly_forecast[4].wind_speed}mph</Text>
                    <Text style={styles.weathertext}>-- -- -- -- --</Text>

                    <Text
                        style={styles.weatherdate}>  {this.state.hourly_forecast[5].hour_time}: {this.state.hourly_forecast[5].weekday_name} {this.state.hourly_forecast[5].month_name_abr}-{this.state.hourly_forecast[5].mday}</Text>
                    <Text style={styles.weathertext}>  {this.state.hourly_forecast[5].temp}/F
                        - {this.state.hourly_forecast[5].forecast}</Text>
                    <Text style={styles.weathertext}> Wind
                        - {this.state.hourly_forecast[5].wind_direction}-{this.state.hourly_forecast[5].wind_speed}mph</Text>
                    <Text style={styles.weathertext}>-- -- -- -- --</Text>
                </ScrollView>
                <MenuFab navigate={this.navigate}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    weathercontainer: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        //height: '100%',
    },
    imagestyle: {
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    citytext: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    weatherheader: {
        marginTop: 40,
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'left',
    },
    weatherdate: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
    },
    weathertext: {
        color: '#000000',
        fontSize: 13,
        textAlign: 'left',
    },
});
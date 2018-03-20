import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';


//
//  Class that will return the animated radar gif
//  from weather service for State College, PA
//  (Penn State University)
export default class WeatherScreen extends React.Component {


    constructor(props) {

        super(props);

        this.state = {
            month_name_abr0: 'Dec',
            weekday_name_abbrev0: 'Tue',
            mday0: '12',
            hour_time0: '05:00 PM',
            temp_0: '67',  // F
            icon0_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed0: '11',     // mph
            wind_direction0: 'NNE',
            forecast_0: 'Snow Showers',

            month_name_abr1: 'Mth',
            weekday_name_abbrev1: 'MWF',
            mday1: '01',
            hour_time1: '11:11 PM',
            weekday_name1: 'Wrk',
            temp_1: '01',  // F
            icon1_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed1: '11',     // mph
            wind_direction1: 'NNN',
            forecast_1: 'Rainy Rain',

            month_name_abr2: 'Mth',
            weekday_name_abbrev2: 'MWF',
            mday2: '02',
            hour_time2: '22:22 PM',
            weekday_name2: 'Wrk',
            temp_2: '02',  // F
            icon2_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed2: '22',     // mph
            wind_direction2: 'NNN',
            forecast_2: 'Rainy Rain',

            month_name_abr3: 'Mth',
            weekday_name_abbrev3: 'MWF',
            mday3: '03',
            hour_time3: '33:33 PM',
            weekday_name3: 'Wrk',
            temp_3: '03',  // F
            icon3_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed3: '33',     // mph
            wind_direction3: 'NNN',
            forecast_3: 'Rainy Rain',

            month_name_abr4: 'Mth',
            weekday_name_abbrev4: 'MWF',
            mday4: '04',
            hour_time4: '44:44 PM',
            weekday_name4: 'Wrk',
            temp_4: '04',  // F
            icon4_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed4: '44',     // mph
            wind_direction4: 'NNN',
            forecast_4: 'Rainy Rain',

            month_name_abr5: 'Mth',
            weekday_name_abbrev5: 'MWF',
            mday5: '05',
            hour_time5: '55:55 PM',
            weekday_name5: 'Wrk',
            temp_5: '05',  // F
            icon5_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed5: '55',     // mph
            wind_direction5: 'NNN',
            forecast_5: 'Rainy Rain',

            month_name_abr6: 'Mth',
            weekday_name_abbrev6: 'MWF',
            mday6: '06',
            hour_time6: '66:66 PM',
            weekday_name6: 'Wrk',
            temp_6: '06',  // F
            icon6_url: 'http://icons.wxug.com/i/c/k/snow.gif',
            wind_speed6: '66',     // mph
            wind_direction6: 'NNN',
            forecast_6: 'Rainy Rain',

        };


    }  // end constructor



//    componentDidMount() {
//    }

    componentWillMount() {
    }


    render() {

        //let animatedRadarUrl = 'http://api.wunderground.com/api/0c830f11d869563e/animatedradar/q/PA/State_College.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
        let animatedRadarUrl = 'http://api.wunderground.com/api/0c830f11d869563e/radar/image.gif?centerlat=40.8&centerlon=-77.86&radius=50&width=640&height=480&rainsnow=1&timelabel=1&noclutter=1&newmaps=1';

        return (
            <ScrollView contentContainerStyle={styles.weathercontainer}>
                <Text style={styles.citytext}>University Park, PA - Radar </Text>

                <Image source={{uri: animatedRadarUrl}}
                       style={{width: 300, height: 300}} />
                <Text style={styles.weatherheader}>6 Hour Weather Forecast </Text>
                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev0} -- {this.state.month_name_abr0},{this.state.mday0}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time0}</Text>
                <Text  style={styles.weathertext}>  {this.state.temp_0}/F  -  {this.state.forecast_0}</Text>
                <Text  style={styles.weathertext}>  Wind  -  {this.state.wind_direction0}-{this.state.wind_speed0}mph</Text>


                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev1} -- {this.state.month_name_abr1},{this.state.mday1}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time1}</Text>
                <Text  style={styles.weathertext}>  {this.state.temp_1}/F  -  {this.state.forecast_1}</Text>
                <Text  style={styles.weathertext}>  Wind  -  {this.state.wind_direction1}-{this.state.wind_speed1}mph</Text>


                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev2} -- {this.state.month_name_abr2},{this.state.mday2}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time2}</Text>
                <Text  style={styles.weathertext}>    {this.state.temp_2}/F  -  {this.state.forecast_2}</Text>
                <Text  style={styles.weathertext}>    Wind  -  {this.state.wind_direction2}-{this.state.wind_speed2}mph</Text>


                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev3} -- {this.state.month_name_abr3},{this.state.mday3}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time3}</Text>
                <Text  style={styles.weathertext}>  {this.state.temp_3}/F  -  {this.state.forecast_3}</Text>
                <Text  style={styles.weathertext}>  Wind  -  {this.state.wind_direction3}-{this.state.wind_speed3}mph</Text>


                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev4} -- {this.state.month_name_abr4},{this.state.mday4}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time4}</Text>
                <Text  style={styles.weathertext}>  {this.state.temp_4}/F  -  {this.state.forecast_4}</Text>
                <Text  style={styles.weathertext}>  Wind  -  {this.state.wind_direction4}-{this.state.wind_speed4}mph</Text>


                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev5} -- {this.state.month_name_abr5},{this.state.mday5}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time5}</Text>
                <Text  style={styles.weathertext}>  {this.state.temp_5}/F  -  {this.state.forecast_5}</Text>
                <Text  style={styles.weathertext}>  Wind  -  {this.state.wind_direction0}-{this.state.wind_speed5}mph</Text>


                <Text style={styles.weatherdate}>  {this.state.weekday_name_abbrev6} -- {this.state.month_name_abr6},{this.state.mday6}</Text>
                <Text  style={styles.weathertext}>  {this.state.hour_time6}</Text>
                <Text  style={styles.weathertext}>  {this.state.temp_6}/F  -  {this.state.forecast_6}</Text>
                <Text  style={styles.weathertext}>  Wind  -  {this.state.wind_direction6}-{this.state.wind_speed6}mph</Text>

            </ScrollView>
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
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
	},
    weathertext: {
        color: '#000000',
        fontSize: 13,
        textAlign: 'left',
    },
});
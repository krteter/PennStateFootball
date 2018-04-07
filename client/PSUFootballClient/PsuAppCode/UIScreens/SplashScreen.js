import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

import HomeScreen from "./HomeScreen";



export default class SplashScreen extends React.Component {


    componentWillMount() {

//        if(//something we can check to show splash screen)
//            {

        //let that = this;
        //onPress={() => this.props.navigation.navigate('GameSchedule')}


        // Works
        //smitty   setTimeout(() => this.props.navigation.navigate('Twitter'), 3000);
        setTimeout(() => this.props.navigation.navigate('Home')

            , 2000);

        //setTimeout(() => this.props.navigator.navigate({ name: 'HomeScreen' }), 3000);

        //this.props.navigate()
/*
        setTimeout(function () {

            //this.props.navigator.navigate('Twitter');

            that.props.navigator.push({ name: 'HomeScreen' });
            }, 4000);
*/

        let ken = 99;

 //   }

    }  // end componentWillMount()


    render() {
        // getting width according to device screen size for fitting loading image on screen
        let width = Dimensions.get('window').width;

        return (
            <TouchableOpacity style={styles.indexContainer}>
                <Image
                    source={require('../../Images/PSU_splash.png')}
                    style={[
                        styles.base, {
                            resizeMode: 'cover'
                        }, {
                            alignSelf: 'center'
                        }, {
                            width: width
                        }, {
                            height: '100%'
                        }
                    ]} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    indexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcometxt: {
        textAlign: 'center',
        fontSize: 20,
        color: '#10598F'
    }
});
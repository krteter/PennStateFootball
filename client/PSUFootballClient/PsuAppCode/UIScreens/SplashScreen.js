import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

import HomeScreen from "./HomeScreen";



export default class SplashScreen extends React.Component {


    componentWillMount() {

        // This works from the top level... but it is a band aid for
        // a real "slashscreen"
        setTimeout(() => this.props.navigation.navigate('Home') , 4000);


    }  // end componentWillMount()


    render() {
        // getting width according to device screen size for fitting loading image on screen
        let width = Dimensions.get('window').width;

        return (
            <TouchableOpacity style={styles.indexContainer}
                              onPress={() => this.props.navigation.navigate('Home')}>
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
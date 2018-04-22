import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';


export default class SplashScreen extends React.Component {
    constructor() {
        super();
        this._navigateHome = this._navigateHome.bind(this);
    }

    componentWillMount() {

        // This works from the top level... but it is a band aid for
        // a real "slashscreen"
        setTimeout(() => this._navigateHome(), 4000);


    }  // end componentWillMount()

    // resetting the navigation stack instead of a direct navigation removes the back arrow
    // from the homescreen that allows navigation back to the splash screen
    _navigateHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})],
        });
        this.props.navigation.dispatch(resetAction);
    }


    render() {
        // getting width according to device screen size for fitting loading image on screen
        let width = Dimensions.get('window').width;

        return (
            <TouchableOpacity style={styles.indexContainer}
                              onPress={() => this._navigateHome()}>
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
                    ]}/>
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
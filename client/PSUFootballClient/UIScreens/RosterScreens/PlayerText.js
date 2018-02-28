import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';



export default class PlayerText extends Component {

    render() {
        return (

            <View style={styles.container}>

                    <Text style={styles.header}>
                        Player Text Main Menu
                    </Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({

    header: {
        backgroundColor : 'pink',
        fontSize : 16,
        padding: 0,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        borderRadius: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 25,
    },

});
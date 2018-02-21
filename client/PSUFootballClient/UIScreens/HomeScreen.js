import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.header}
                >
                    Main Menu
                </Text>
                <View style={styles.button}>
                    <Button
                        title="Twitter Feed"
                        onPress={() => this.props.navigation.navigate('Twitter')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Test Screen"
                        onPress={() => this.props.navigation.navigate('Test')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="API call"
                        onPress={() => this.props.navigation.navigate('APIcall')}
                    />
                </View>
            </View>
        );
    }
}

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
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 5,
        minWidth: 200,
        maxWidth: '95%',
    }
});
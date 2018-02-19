import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>Main Menu</Text>
                <Button
                    title="Twitter Feed"
                    onPress={() => this.props.navigation.navigate('Twitter')}
                    style = {styles.button}
                />
                <Button
                    title="Test Screen"
                    onPress={() => this.props.navigation.navigate('Test')}
                    style = {styles.button}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    }
});
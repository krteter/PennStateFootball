import React from 'react';
import {Text, View} from 'react-native';

export default class ExampleHTMLFetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchData: ''
        };
    }

    componentWillMount() {
        this.setState({
            fetchData: this.getHTMLDataFromURL()
        });
    }

    getHTMLDataFromURL() {
        return fetch('https://www.google.com/')
            .then(response => response.text())
            .then(text => {
                this.setState({
                    fetchData: text
                });
            });
    }

    render() {
        return (
            <View>
                <Text>data from URL: {this.state.fetchData.toString()}</Text>
            </View>
        );
    }
}
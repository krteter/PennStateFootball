import React from 'react';
import {Text, View} from 'react-native';

export default class RosterRow extends React.Component{
    constructor() {
        super();
        this.state = {
            name: '',
            position: '',
            description: ''
        };
    }

    componentWillMount() {
        this.setState({
            name: this.props.name,
            position: this.props.position,
            description: this.props.description
        })
    }

    render() {
        return (
            <View>
                <Text>{this.state.name}</Text>
                <Text>{this.state.position}</Text>
                <Text>{this.state.description}</Text>
            </View>
        )
    }
}
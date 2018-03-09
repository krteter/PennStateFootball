import React from 'react';
import {Text, View} from 'react-native';

export default class RosterRow extends React.Component{
    constructor() {
        super();
        this.state = {
            id: null,
            name: '',
            position: '',
            description: ''
        };
    }

    componentWillMount() {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            position: this.props.position,
            description: this.props.description
        })
    }

    render() {
        return (
            <View>
                <Text>{this.state.id}</Text>
                <Text>{this.state.name}</Text>
                <Text>{this.state.position}</Text>
                <Text>{this.state.description}</Text>
            </View>
        )
    }
}
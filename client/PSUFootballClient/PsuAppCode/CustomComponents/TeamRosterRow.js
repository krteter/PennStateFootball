import React from 'react';
import {Text, View} from 'react-native';



export default class TeamRosterRow extends React.Component{

    constructor() {
        super();
        this.state = {
            id: null,
            name: '',
            jerseyNum: '',
            position: '',
            bioUrl: '',
            imageUrl: '',
            classyear: '',
            hometown: '',
            heightWeight: '',
            highschool: '',
            experience: '',
            major: ''
        };
    }


    componentWillMount() {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            jerseyNum: this.props.jerseyNum,
            position: this.props.position,
            bioUrl: this.props.bioUrl,
            imageUrl: this.props.imageUrl,
            classyear: this.props.classyear,
            hometown: this.props.hometown,
            heightWeight: this.props.heightWeight,
            highschool: this.props.highschool,
            experience: this.props.experience,
            major: this.props.major
        })
    }


    render() {
        return (
            <View>
                <Text>{this.state.id}</Text>
                <Text>{this.state.name}</Text>
                <Text>{this.state.jerseyNum}</Text>
                <Text>{this.state.position}</Text>
                <Text>{this.state.bioUrl}</Text>
                <Text>{this.state.imageUrl}</Text>
                <Text>{this.state.classyear}</Text>
                <Text>{this.state.hometown}</Text>
                <Text>{this.state.heightWeight}</Text>
                <Text>{this.state.highschool}</Text>
                <Text>{this.state.experience}</Text>
                <Text>{this.state.major}</Text>
            </View>
        )
    }
}
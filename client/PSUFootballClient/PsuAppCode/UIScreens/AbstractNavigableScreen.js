import React from 'react';

export default class AbstractNavigableScreen extends React.Component {
    constructor(props){
        super(props);
        this.navigate = this.navigate.bind(this);
    }
    //allows the MenuFab to navigate
    navigate(location) {
        this.props.navigation.navigate(location);
    }
}
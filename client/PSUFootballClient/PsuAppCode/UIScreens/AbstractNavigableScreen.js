import React from 'react';
import {NavigationActions} from "react-navigation";

export default class AbstractNavigableScreen extends React.Component {
    constructor(props){
        super(props);
        this.navigate = this.navigate.bind(this);
    }
    //allows the MenuFab to navigate
    navigate(location) {
        // hack - this is to keep from getting a back button while on the home screen
        if(location === 'Home') {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Home'})],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            this.props.navigation.navigate(location);
        }
    }
}
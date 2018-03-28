import React from 'react';
import timer from 'react-native-timer';
import {Button, Text, View} from "react-native";
import styles from './../../App.js'

export default class TimerExampleScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            displayButton: false,
        }
    }

    componentWillMount() {
        this.scheduleBlink();
    }

    componentWillUnmount() {
        timer.clearTimeout(this);
    }

    //recursive calling of this method in the internal setState allows the timer to repeat
    scheduleBlink() {
        timer.setTimeout(
            this, //tie the timer to this component
            'blinkMsg',  //name it this
            () => this.setState(
                {displayButton: true}, //set the state to this
                () => this.scheduleBlink() //do this when complete
            ),
            4000 //do the previous after this time (ms)
        );
    }


    render() {
        return (
            <View style={styles.button}>
                <Text>You pressed the disappearing button {this.state.counter} time(s).</Text>

                {this.state.displayButton ? (
                    <Button
                        title="PRESS ME"
                        onPress={
                            () => {
                                let count = this.state.counter + 1;
                                this.setState({
                                    displayButton: false,
                                    counter: count,
                                });
                                this.scheduleBlink();
                            }
                        }
                    />
                ) : (
                    null
                )}
            </View>
        )
    }
}

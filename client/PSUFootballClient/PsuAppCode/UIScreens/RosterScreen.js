import React from 'react';
import {StyleSheet, Text, WebView, View} from 'react-native';


export default class RosterScreen extends React.Component {
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

        let myUrl = 'http://www.gopsusports.com/sports/m-footbl/mtt/psu-m-footbl-mtt.html';

        return fetch(myUrl)
            .then(response => response.text())
            .then(text => {
                this.setState({
                    fetchData: text
                });
            });
    }

 //   render() {
 //       return (
 //           <View>
 //               <Text>data from URL: {this.state.fetchData.toString()}</Text>
 //           </View>
 //       );
 //   }


    render() {
        return (
            <View
                style={styles.container}
            >
                <WebView
                    style={styles.container}
                    source={{html: this.state.fetchData.toString()}}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }


}  //  end RosterScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    }
});
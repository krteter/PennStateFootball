import React from 'react';
import { WebView, View, StyleSheet } from 'react-native';

export default class TwitterStream extends React.Component {
    render() {
        let js = '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
        let source = js + '<a class="twitter-timeline" href="https://twitter.com/PennStateFball?ref_src=twsrc%5Etfw">Tweets by PennStateFball</a>';

        return (
            <View
                style={styles.container}
            >
                <WebView
                    style={styles.container}
                    source={{html: source}}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    }
});
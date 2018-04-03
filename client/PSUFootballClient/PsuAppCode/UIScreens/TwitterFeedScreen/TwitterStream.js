import React from 'react';
import {StyleSheet, WebView} from 'react-native';

/**
 * This is the class that only fetches the actual Twitter Stream
 * This is embeddable (such as on the home page)
 */

export default class TwitterStream extends React.Component {
    render() {
        let js = '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
        let source = js + '<a class="twitter-timeline" href="https://twitter.com/PennStateFball?ref_src=twsrc%5Etfw">Tweets by PennStateFball</a>';

        return (
            <WebView
                style={styles.container}
                source={{html: source}}
                javaScriptEnabled={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
import React from 'react';
import { WebView, Text } from 'react-native';

export default class TwitterStream extends React.Component {
    render() {
        let js = '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
        let source = js + '<a class="twitter-timeline" href="https://twitter.com/PennStateFball?ref_src=twsrc%5Etfw">Tweets by PennStateFball</a>';

        return (
            <WebView
                source={{html: source}}
                javaScriptEnabled={true}
            />
        );
    }
}
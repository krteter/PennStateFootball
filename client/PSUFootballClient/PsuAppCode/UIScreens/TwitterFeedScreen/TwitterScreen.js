import React from "react";
import AbstractNavigableScreen from "../AbstractNavigableScreen";
import TwitterStream from "./TwitterStream";
import MenuFab from "../../CustomComponents/MenuFab";
import {StyleSheet, View} from "react-native";

/**
 * This is the class that contains the twitter stream (fetched from @TwitterStream component and the menu fab
 * use this when Full Screen is needed
 */

export default class TwitterScreen extends AbstractNavigableScreen {
    render() {
        return (
            <View style={styles.container}>
                <TwitterStream/>
                <MenuFab navigate={this.navigate} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

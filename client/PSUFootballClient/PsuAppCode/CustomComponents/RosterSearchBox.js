import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Icon} from "native-base";
import DatabaseDAO from "../DAO/DatabaseDAO";

export default class RosterSearchBox extends React.Component {
    constructor(props) {
        super(props);
        let players = [];
        this.state = {
            players: players,
            query: ''
        };
        this.setPlayersNamesList = this.setPlayersNamesList.bind(this);
        this.navigateToPlayerBio = this.navigateToPlayerBio.bind(this);
    }

    // componentWillReceiveProps(newProps) {
    //     let names = [];
    //     newProps.players.map(p => {
    //         names.push({
    //             name: p.name,
    //             position: p.position,
    //             jerseyNum: p.jerseyNum
    //         })
    //     });
    //     this.setState({
    //         names: names,
    //         players: newProps.players
    //     });
    // }

    componentWillMount() {
        if (this.state.names === undefined) {
            let that = this;
            DatabaseDAO.getAllPlayers(that.setPlayersNamesList);
        }
    }

    setPlayersNamesList(players) {
        if (players !== undefined) {
            this.setState({players: players});
        }
    }

    findPlayer(query) {
        if (query === '') {
            return [];
        }
        const {players} = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return players.filter(p => p.name.search(regex) >= 0 || p.position.search(regex) >= 0 || p.jerseyNum.search(regex) >= 0);
    }

    render() {
        if (this.state.players === null || this.state.players === undefined || this.state.players.length === 0) {
            return (
                <Text>Loading Players...</Text>
            );
        }
        const {query} = this.state;
        const players = this.findPlayer(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <View>
                <Icon
                    name={'search'}
                    style={styles.searchIcon}
                />
                <Autocomplete
                    style={styles.searchBox}
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={players.length === 1 && comp(query, players[0].name) ? [] : players}
                    defaultValue={query}
                    onChangeText={text => this.setState({query: text})}
                    placeholder="Search for a PSU Player"
                    renderItem={({name, position, jerseyNum}) => (
                        <TouchableWithoutFeedback onPress={() => {
                            this.navigateToPlayerBio(name);
                            Keyboard.dismiss();
                        }
                        }>
                            <View>
                                <Text style={styles.itemText}>
                                    {name} {position} {jerseyNum}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
                {this.state.query !== '' && (
                    <Icon
                    name={'md-trash'}
                    style={styles.cancelIcon}
                    onPress={() => this.setState({query: ''})}
                    />
                )}
            </View>
        );
    }

    navigateToPlayerBio(playerName) {
        console.log(playerName);
        let player = this.state.players.find(p => p.name === playerName);
        console.log(player);
        this.props.navigateWithProps('PlayerData', {player: player});
    }
}

const styles = StyleSheet.create({
    cancelIcon: {
        position: 'absolute',
        width: 20,
        top: 10,
        right: 10,
        zIndex: 10001
    },
    searchBox: {
        backgroundColor: '#F5FCFF',
        padding: 7,
        paddingLeft: 35,
        borderWidth: 2,
        borderColor: '#636363',
    },
    container: {
        backgroundColor: '#F5FCFF',
        marginRight: 10,
        paddingTop: 25,
        paddingBottom: 15
    },
    autocompleteContainer: {
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10000,
    },
    itemText: {
        fontSize: 18,
        margin: 2,
        paddingTop: 2,
        paddingBottom: 2,
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10001
    }
});
import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import TeamRosterDao from "../DAO/TeamRosterDao";

export default class RosterSearchBox extends React.Component {
    constructor(props) {
        super(props);
        let names = [];
        this.state = {
            players: this.props.players,
            names: names,
            query: ''
        };
        this.setPlayersNamesList = this.setPlayersNamesList.bind(this);
        this.navigateToPlayerBio = this.navigateToPlayerBio.bind(this);
    }

    componentWillReceiveProps(newProps) {
        let names = [];
        newProps.players.map(p => {
            names.push({
                name: p.name,
                position: p.position
            })
        });
        this.setState({
            names: names,
            players: newProps.players
        });
    }

    componentWillMount() {
        if (this.state.names === undefined) {
            let that = this;
            TeamRosterDao.getPlayersNames(that.setPlayersNamesList);
        }
    }

    setPlayersNamesList(names) {
        if (names !== undefined) {
            console.log(names);
            this.setState({names: names});
        }
    }

    findPlayer(query) {
       if (query === '') {
            return [];
        }
        const { names } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return names.filter(film => film.name.search(regex) >= 0);
    }

    render() {
        if (this.state.names === null || this.state.names === undefined) {
            return (
                <Text>Loading Players...</Text>
            );
        }
        const { query } = this.state;
        const players = this.findPlayer(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        let that = this;
        return (
            <View style={styles.container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={players.length === 1 && comp(query, players[0].name) ? [] : players}
                    defaultValue={query}
                    onChangeText={text => this.setState({query: text})}
                    placeholder="Enter Name of a PSU Player"
                    renderItem={({name, position}) => (
                        <TouchableOpacity onPress={() => this.navigateToPlayerBio(name)}>
                            <Text>
                                {name} {position}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    navigateToPlayerBio(playerName) {
        console.log(playerName);
        let player = this.state.players.find(p => p.name === playerName);
        console.log(JSON.stringify(player));
        this.props.navigate('PlayerData', {player: player});
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100
    },
    itemText: {
        fontSize: 15,
        margin: 2
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
    }
});
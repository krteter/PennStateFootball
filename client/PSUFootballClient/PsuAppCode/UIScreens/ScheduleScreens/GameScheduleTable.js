import React, {Component} from 'react';
import {Col, Rows, Table, TableWrapper} from 'react-native-table-component';
import {Image, Text, TouchableOpacity, View} from 'react-native';


export default class GameScheduleTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableGameData: [],
            tableIconCol: [],
            games: props.games       //  rows of games from schedule DB
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            games: props.games,
        })
    }


    render() {


        const cLogoImage = (value) => (
            <Image
                style={this.props.styles.imagestyle}
                source={{uri: value}} key={value}
            />
        );


        const calendarButton = (startdate, opponent, location) => (
            // <TouchableOpacity onPress={() => this._alertIndex(value)}>
            //     <View style={this.props.styles.btn}>
            //         <Text style={this.props.styles.btnText}>Cal</Text>
            //     </View>
            // </TouchableOpacity>

            // let gameLocation = 'test';

            <TouchableOpacity onPress={() => this.props.navigation.navigate('CalendarEvent', {
                startDateString: startdate,
                location: location,
                description: 'PSU Nittany Lions vs. ' + opponent,
                notes: 'PSU Nittany Lions vs. ' + opponent
            })}>
                <View style={this.props.styles.btn}>
                    <Text style={this.props.styles.btnText}>Cal</Text>
                </View>
            </TouchableOpacity>
        );

        const ticketButton = (value, opponent) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TicketSearch', {
                startDateString: value,
                description: 'PSU Nittany Lions vs. ' + opponent
            })}>
                <View style={this.props.styles.btn}>
                    <Text style={this.props.styles.btnText}>Tix</Text>
                </View>
            </TouchableOpacity>
        );


//  Now loop thru the games and get the data to  be displayed on the TableView
//  and put them in our table arrays to be displayed
        for (let i = 0; i < this.state.games.length; i++) {

            //  game data text
            //    - default the time since TBD
            let gameData = [];
            gameData.push(this.state.games[i].gamedate + '\n' + 'TBD');
            gameData.push(this.state.games[i].opponent);
            gameData.push(this.state.games[i].homeaway);

            /////////////////////////////////////////////
            // gameData.push(calendarButton(i));
            let gameLocation = '';
            if (this.state.games[i].homeaway === 'Home') {
                gameLocation = '@Beaver Stadium'
            } else if (this.state.games[i].homeaway === 'Away') {
                gameLocation = '@' + this.state.games[i].opponent
            }

            /////////////////////////////////////////////

            gameData.push(calendarButton(this.state.games[i].gamedatezulu, this.state.games[i].opponent, gameLocation));
            gameData.push(ticketButton(this.state.games[i].gamedatezulu, this.state.games[i].opponent));
            this.state.tableGameData.push(gameData);

            //  Add our image icon source for display in schedule
            let oppTeamIcon = [];
            oppTeamIcon = [cLogoImage(this.state.games[i].imgsrc)];
            this.state.tableIconCol.push(oppTeamIcon);
        }

        return (
            <Table borderStyle={{borderColor: 'transparent'}} style={{flexDirection: 'row'}}>
                {/* Left TableWrapper */}
                <TableWrapper style={this.props.styles.tableWrap}>
                    <TableWrapper style={{flexDirection: 'row'}}>
                        <Col data={this.state.tableIconCol} style={this.props.styles.logocol}
                             heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                             textStyle={this.props.styles.titleText}/>
                    </TableWrapper>
                </TableWrapper>

                {/* Right Table */}
                <Table style={{flex: 1}}>
                    <Rows data={this.state.tableGameData}
                          widthArr={[80, 85, 55, 55, 55]}
                          heightArr={[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                          textStyle={this.props.styles.rowstyle}/>
                </Table>

            </Table>
        )
    }
}

import React from 'react';
import GameScheduleDao from '../../DAO/TeamRosterDao';
import GameSchedule from '../../UIScreens/ScheduleScreens/GameSchedule';
//import {Text, View, ScrollView, StyleSheet} from "react-native";
import {StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image, ImageBackground, Button} from "react-native"
import {Table, TableWrapper, Row, Rows, Col, Cell} from 'react-native-table-component';

export default class GameScheduleScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      games: {},
      ////////////////
      tableHead: ['Date', 'Opponent', 'Cal', 'Tix'],
      // tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableData: []
      ////////////////
    };
    this.setResultsFunction = this.setResultsFunction.bind(this);
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  setResultsFunction(rows) {
    if (rows !== undefined) {
      this.setState({
        games: rows
      });
    }
  }

  componentDidMount() {
    // Make sure the db table exists if this is the first load
    let that = this;
    //GameScheduleDao.initGameScheduleDB(that.setResultsFunction);
  }

  componentWillMount() {
    let that = this;
    GameScheduleDao.getSchedule(that.setResultsFunction);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    ////////////////////////////
    let r = [];
    for (let i = 0; i < this.state.games.length; i++) {
      r = [this.state.games[i].gamedate, this.state.games[i].opponent + ' (' + this.state.games[i].homeaway + ')', '', ''];
      this.state.tableData.push(r);
    }
    ////////////////////////////

    if (this.state.games === undefined || this.state.games.forEach === undefined || this.state.games.length === 0) {
      return <Text>No Scheduled Games Found!</Text>
    } else {
      // let myGameScheduleTable = this.state.games.map((game) => {
      //   return (
      //     <GameSchedule
      //       key={game.id}
      //       opponent={game.opponent}
      //       gamedate={game.gamedate}
      //       homeaway={game.homeaway}
      //     />
      //   ) // End return()
      // });

      return (
        <View style={styles.container}>
          <ScrollView>
            {/* {myGameScheduleTable} */}
            <Table>
              <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.wrapper}>
                {/* <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/> */}
                <Rows data={state.tableData} flexArr={[1, 2, 1, 1]} style={styles.row} textStyle={styles.text}/>
              </TableWrapper>
            </Table>

            {/* <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table> */}



          </ScrollView>
        </View>
      )
    } // End if
  } // End render()
}  // End class GameSchedule

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   head: {  height: 40,  backgroundColor: '#f1f8ff'  },
//   wrapper: { flexDirection: 'row' },
//   title: { flex: 1, backgroundColor: '#f6f8fa' },
//   row: {  height: 28  },
//   text: { textAlign: 'left' }
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    head: {
        height: 40,
        backgroundColor: '#808B97',
    },
    header: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#20159c',
    },
    text: {
        //margin: 6,
        color: '#000000',
        textAlign: 'center',
        fontSize: 10,
    },
    wrapper: {
        flexDirection: 'row',
    },
    btn: {
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
    },
    imagestyle: {
        flex: 1,
        //margin: 3,
        height: (50),
        width: 50,
        backgroundColor: '#bbf7b4',
    },
    rowstyle: {
        justifyContent: 'center',
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#FFF1C1',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: null,
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 5,
        minWidth: 200,
        maxWidth: '95%',
    },
});

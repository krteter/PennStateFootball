import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';




export default class TableView extends Component {

    render() {

        const tableHead = ['Number', 'Player', 'Position'];
        const tableTitle = ['Player1', 'Player2', 'Player3', 'Player4'];
        const tableData = [
            [11 ,'Ken Smith', 'QB/RB'],
            [22, 'John Cantos', 'K/TE'],
            [33 ,'Richard Mozeleski', 'P/OL'],
            [44, 'Kevin Teter', 'DE/NG'],
        ];
        const widthArr = [60, 120, 80];

        return (
            <View>
                <Table style={styles.table}>
                    {/* Left Wrapper */}
                    <TableWrapper style={{width: 80}}>
                        <Cell data="Head" style={styles.head} textStyle={styles.headText}/>
                        {
                            tableTitle.map((title, i) => (
                                <Cell key={i} data={title} height={28} style={i%2 && {backgroundColor: '#FFFFFF'}} textStyle={styles.titleText}/>
                            ))
                        }
                    </TableWrapper>

                    {/* Right scrollview Wrapper */}
                    <ScrollView horizontal={true}>
                        {/* If parent element is not table element, you should add the type of borderstyle. */}
                        <TableWrapper borderStyle={{borderWidth: 1, borderColor: 'black',}}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr}/>
                            {
                                tableData.map((data, i) => (
                                    <Row key={i} data={data} style={[styles.list, i%2 && {backgroundColor: '#FFFFFF'}]} widthArr={widthArr} textStyle={styles.listText}/>
                                ))
                            }
                        </TableWrapper>
                    </ScrollView>
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    table: {
        width: 342,
        flexDirection: 'row'
    },
    head: {
        backgroundColor: '#0f2e59',
        height: 50
    },
    headText: {
        color: 'silver',
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'
    },
    titleText: {
        marginLeft: 3,
        fontFamily: 'sans-serif-condensed'
    },
    list: {
        height: 28,
        backgroundColor: '#f0f0f0'
    },
    listText: {
        textAlign: 'right',
        marginRight: 3,
        fontFamily: 'sans-serif-condensed',
        color: 'blue'
    }

})
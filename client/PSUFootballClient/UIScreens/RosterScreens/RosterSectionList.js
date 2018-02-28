import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text, Platform, Alert } from 'react-native';
import PlayerText from "./PlayerText";



//import {Upload} from "./../WorkerInterfaces/RosterDataWorker";
//import {AlertMe} from "./../WorkerInterfaces/RosterDataWorker";




export default class RosterSectionList extends Component<{}> {

    constructor(props) {
        super(props);
    }

    //componentWillMount() {
//
       // AlertMe('sSmittyAlert');
        //Upload();
//
    //}

    //addContentsToListArrays() {
    //
    //    import names_a.push('Ken');
    //    this.names_a.push('Kenny');
    //    this.names_a.push('Smitty');
    //}


    GetSectionListItem = (item)=> {
        Alert.alert(item)
    }


    render() {



        var appleVar = 'Mark Allen';

        let names_a = [appleVar, 'Joe Arcangelo'] ;
        var names_b = ['Damion Barber', 'Ryan Bates', 'Will Blair', 'Corey Bolds', 'Nick Bowers', 'Ellis Brooks',
                       'Cam Brown', 'DJ Brown', 'Journey Brown', 'Torrence Brown', 'Ryan Buchholz', 'Jabari Butler'] ;
        var names_c = ['Joe Calcagno', 'Tariq Castro-Fields', 'Max Chizmar', 'Sean Clifford', 'Jake Cooper', 'Mike Curry'] ;
        var names_d = [''] ;
        var names_e = [''] ;
        var names_f = [''] ;
        var names_g = [''] ;
        var names_h = [''] ;
        var names_i = [] ;
        var names_j = [] ;
        var names_k = [] ;
        var names_l = [] ;
        var names_m = [''] ;
        var names_n = ['Danny Noonan'] ;
        var names_o = [''] ;
        var names_p = [''] ;
        var names_q = [''] ;
        var names_r = [''] ;
        var names_s = ['Ken Smith', 'Judge Smails'] ;
        var names_t = [''] ;
        var names_u = [''] ;
        var names_v = [''] ;
        var names_w = [''] ;
        var names_x = [''] ;
        var names_y = [''] ;
        var names_z = ['Rastaman Ziggy'] ;




        return (


            <View style={{ marginTop : (Platform.OS) == 'ios' ? 20 : 0 }}>

                <SectionList

                    sections={[
                        { title: 'A', data: names_a },
                        { title: 'B', data: names_b },
                        { title: 'C', data: names_c },
                        { title: 'D', data: names_d },
                        { title: 'E', data: names_e },
                        { title: 'F', data: names_f },
                        { title: 'G', data: names_g },
                        { title: 'H', data: names_h },
                        { title: 'I', data: names_i },
                        { title: 'J', data: names_j },
                        { title: 'K', data: names_k },
                        { title: 'L', data: names_l },
                        { title: 'M', data: names_m },
                        { title: 'N', data: names_n },
                        { title: 'O', data: names_o },
                        { title: 'P', data: names_p },
                        { title: 'Q', data: names_q },
                        { title: 'R', data: names_r },
                        { title: 'S', data: names_s },
                        { title: 'T', data: names_t },
                        { title: 'U', data: names_u },
                        { title: 'V', data: names_v },
                        { title: 'W', data: names_w },
                        { title: 'X', data: names_x },
                        { title: 'Y', data: names_y },
                        { title: 'Z', data: names_z },
                    ]}


                    //renderSectionHeader={ ({section}) =>
                    //    <PlayerText /> }

                    renderSectionHeader={ ({section}) =>
                        <Text style={styles.SectionHeaderStyle}> { section.title }
                        </Text> }



                    renderItem={ ({item}) =>
                        <Text style={styles.SectionListItemStyle}
                              onPress={this.GetSectionListItem.bind(this, item)}> { item }
                        </Text> }
                    keyExtractor={ (item, index) => index }
                />

                <PlayerText/>

            </View>

        );
    }
}


const styles = StyleSheet.create({

    SectionHeaderStyle:{
        backgroundColor : '#0f2e59',
        fontSize : 16,
        padding: 0,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        borderRadius: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 25,
    },

    SectionListItemStyle:{
        fontSize : 12,
        padding: 5,
        color: '#000',
        backgroundColor : '#F5F5F5'
    }
});



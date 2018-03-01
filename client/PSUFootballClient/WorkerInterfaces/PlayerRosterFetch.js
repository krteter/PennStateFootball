import {Alert} from "react-native";
import {DOMParser} from 'react-native-html-parser';



//
//  Return the text of the page fetched
//  from the respective URL
//
function getHTMLDataFromURL(urlOfData) {

    return fetch(urlOfData)
        .then(response => response.text());    // get the response and extract the body text

}





export const FetchRoster = ()=> {

    //  Get the text of the roster team URL page
    let rosterUrl = 'http://www.gopsusports.com/sports/m-footbl/mtt/psu-m-footbl-mtt.html';
    let rosterText = getHTMLDataFromURL(rosterUrl);

    console.log(rosterText);


    // returns a HTMLDocument, which also is a Document.
    const parser = new DOMParser();
    var doc = parser.parseFromString(rosterText, "application/html");


    console.log(doc.getElementsByTagName('player-row'));

    //console.log(doc.getElementById('player-row'));


    //var table = doc.getElementById("sortable_roster");
    //var playerTable = document.getElementById("sortable_roster");




}  // end FetchRoster()

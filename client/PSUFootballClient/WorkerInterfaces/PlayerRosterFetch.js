import {Alert} from "react-native";
import {DOMParser} from 'react-native-html-parser';



//
//  Return the HTML text of the page fetched
//  from the respective URL
//
function getHTMLDataFromURL(urlOfData) {

    return fetch(urlOfData)
        .then(response => response.text());    // get the response and extract the body text

}




//
//  Fetch the PSU roster HTML markup data from the roster website
//  then traverse thru it to scrape the player data from it.  The
//  website holds the data in a HTML tagged Table.
//
export const FetchRoster = ()=> {


    //  Get the text of the roster team URL page
    let rosterUrl = 'http://www.gopsusports.com/sports/m-footbl/mtt/psu-m-footbl-mtt.html';
    let rosterText = getHTMLDataFromURL(rosterUrl);


    // create a HTMLDocument, which also is a Document.
    const parser = new DOMParser();
    var doc = parser.parseFromString(rosterText.toString(), "application/html");

    //  Get the table tag <table> by its ID
    var table = doc.getElementsByTagName("sortable_roster");

    //  Get the table body tag <tbody>

    //  Get the player table row tag <tr>



    //console.log(rosterText);
    //alert(table);
//    console.log(doc.getElementsByTagName('player-row'));
    //console.log(doc.getElementById('player-row'));



}  // end FetchRoster()

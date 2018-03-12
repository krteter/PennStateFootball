import {Alert} from "react-native";
import {DOMParser} from 'react-native-html-parser';



//
//  Return the HTML text of the page fetched
//  from the respective URL
//
function getHTMLDataFromURL(urlOfData) {


    // get the response and extract the body text
    fetch(urlOfData)
        .then(function(response) {
            return response.text();
        })
        .then(function(theText) {

            //  This happens asynchronously when the page is returned in the
            //  response.  The fetch doesn't block waiting for the response.
            //  The response returns html text with carriage returns and line
            //  feeds.  Remove them for easier processing.
            var newNoSpaces = theText.replace(/\n|\r\n|\r/g, '');   // remove carriage returns


            //  Cut out roster data html data part out of
            //  the whole html page
            var rosterWrapStartIndex = newNoSpaces.indexOf("table id=sortable_roster");
            var rosterWrapEndIndex = newNoSpaces.indexOf("--roster-wrap--");
            var rosterText = newNoSpaces.slice(rosterWrapStartIndex, rosterWrapEndIndex);
            rosterWrapEndIndex = rosterText.indexOf("/tr></table");
            rosterText = rosterText.slice(0, rosterWrapEndIndex);


            var parsedText = rosterText;
            var keepParsingFlag = true;

            //  Loop thru the html roster data to pull out
            //  the respective fields needed for the players
            //  on the roster.
            while (keepParsingFlag) {


                //  Get the next respective row of player data
                var playerRowBegin = parsedText.indexOf("player-row");
                if (playerRowBegin !== -1) {

                    parsedText = parsedText.slice(playerRowBegin, parsedText.length);

                    //  Get the player's roster number
                    var dataOffset = 9;
                    var rosterNumberBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(rosterNumberBegin, parsedText.length);
                    var rosterNumberEnd = parsedText.indexOf("<");
                    var rosterNumber = parsedText.slice(0, rosterNumberEnd);

                    //  Get the Url of the player's bio data
                    dataOffset = 8;
                    var bioUrlBegin = parsedText.indexOf("a href=") + dataOffset;
                    parsedText = parsedText.slice(bioUrlBegin, parsedText.length);
                    var bioUrlEnd = parsedText.indexOf(">");
                    var bioUrl = parsedText.slice(0, bioUrlEnd - 1);

                    //  Get the player's name
                    dataOffset = 9;
                    var playerNameBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(playerNameBegin, parsedText.length);
                    var playerNameEnd = parsedText.indexOf("<");
                    var playerName = parsedText.slice(0, playerNameEnd);

                    //  Get the player's position
                    dataOffset = 9;
                    var playerPositionBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(playerPositionBegin, parsedText.length);
                    var playerPositionEnd = parsedText.indexOf("<");
                    var playerPosition = parsedText.slice(0, playerPositionEnd);

                    console.log(rosterNumber + "  " + playerName + "  " + playerPosition + "  " + bioUrl);

                } else {
                    keepParsingFlag = false;
                }

            }  // end while keepParsingFlag

            var smitty = 999;

        });


}  // end getHTMLDataFromURL()


//
//  Fetch the PSU roster HTML markup data from the roster website
//  then traverse thru it to scrape the player data from it.  The
//  website holds the data in a HTML tagged Table.
//
export const FetchRoster = ()=> {


    //  Get the text of the roster team URL page
    let rosterUrl = 'http://www.gopsusports.com/sports/m-footbl/mtt/psu-m-footbl-mtt.html';

    getHTMLDataFromURL(rosterUrl);




}  // end FetchRoster()

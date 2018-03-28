import {getPlayerBioDataFromURL} from "./PlayerBioScraper";
import TeamRosterDao from "../DAO/TeamRosterDao";



//
//  Fetch the PSU roster HTML markup data from the roster website
//  then traverse thru it to scrape the player data from it.  The
//  website holds the data in a HTML tagged Table.
//
export const scrapeTeamRosterData = () => {



    //  Get the text of the roster team URL page,
    //  scrape for player roster, add info to our
    //  database
    let rosterUrl = 'http://www.gopsusports.com/sports/m-footbl/mtt/psu-m-footbl-mtt.html';


    //  Fetch the HTTP response and extract the URL's body text
    fetch(rosterUrl)
        .then(function(response) {
            return response.text();
        })
        .then(function(returnedHtmlText) {

            //  This happens asynchronously when the page is returned in the
            //  response.  The fetch doesn't block waiting for the response.
            //  The response returns html text with carriage returns and line
            //  feeds.  Remove them for easier processing.
            let noCretText = returnedHtmlText.replace(/\n|\r\n|\r/g, '');   // remove carriage returns


            //  Cut out roster data html data part out of the whole html page
            //  returned for easier scraping from the html tags.  'rosterText' will
            //  hold this subsection of html data
            let rosterWrapStartIndex = noCretText.indexOf("table id=sortable_roster");
            let rosterWrapEndIndex = noCretText.indexOf("--roster-wrap--");
            let rosterText = noCretText.slice(rosterWrapStartIndex, rosterWrapEndIndex);
            rosterWrapEndIndex = rosterText.indexOf("/tr></table");
            rosterText = rosterText.slice(0, rosterWrapEndIndex);


            //  Loop thru the html roster data to pull out  the respective fields
            //  needed for the players on the roster.
            let parsedText = rosterText;
            let keepParsingFlag = true;
            while (keepParsingFlag) {


                //  Get the next respective row of player data
                let playerRowBegin = parsedText.indexOf("player-row");
                if (playerRowBegin !== -1) {

                    parsedText = parsedText.slice(playerRowBegin, parsedText.length);

                    //  Get the player's roster number
                    //   (note all offsets following are determined by inspection of the data
                    //    to then write this parsing code) (used Firefox web browser and its
                    //    Inspector (->F12) to determine these)
                    let dataOffset = 9;
                    let rosterNumberBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(rosterNumberBegin, parsedText.length);
                    let rosterNumberEnd = parsedText.indexOf("<");
                    let rosterNumber = parsedText.slice(0, rosterNumberEnd);

                    //  Get the Url of the player's bio data.  We will need
                    //  this to scrape this respective player's bio information
                    //  later from this Url
                    dataOffset = 8;
                    let bioUrlBegin = parsedText.indexOf("a href=") + dataOffset;
                    parsedText = parsedText.slice(bioUrlBegin, parsedText.length);
                    let bioUrlEnd = parsedText.indexOf(">");
                    let bioUrl = parsedText.slice(0, bioUrlEnd - 1);

                    //  Get the player's name
                    //    ( We can use this for debug, etc.  We will rescrape this from
                    //     the biography Url page with the other player info.  These
                    //     Urls are being hit asynchronously so, ensuring the name
                    //     and the other bio data synching up will be easier to
                    //     just grab it later)
                    dataOffset = 9;
                    let playerNameBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(playerNameBegin, parsedText.length);
                    let playerNameEnd = parsedText.indexOf("<");
                    let playerName = parsedText.slice(0, playerNameEnd);


                    //console.log(playerName + "  " + rosterNumber + "  " + bioUrl);


                    //  Build the player's bio Url to then scrape all
                    //  the data.
                    let psuBaseUrl = 'http://www.gopsusports.com';
                    let playerBioUrl = psuBaseUrl + bioUrl;

                    //  Fetch the Url, scrape for data, then put
                    //  in our Team database of players
                    getPlayerBioDataFromURL(playerBioUrl);

                } else {
                    keepParsingFlag = false;
                }

            }  // end while keepParsingFlag


        });


}  // end scrapeTeamRosterData()


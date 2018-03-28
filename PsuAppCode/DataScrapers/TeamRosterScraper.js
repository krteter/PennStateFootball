

//
//  Get the PSU roster HTML markup data from the roster website
//  then traverse thru it to scrape the player data from it.
//
//      OBSOLETE -  This works, but will not be used for our completed
//                  app.  This was an intermediate learning step to get
//                  scraped roster data.  But bio data is needed also,
//                  so other methods will be  used.  LEAVING around for
//                  use as a possible example.
//
////      OBSOLETE
export const scrapeRosterData = ()=> {


    //  Get the text of the roster team URL page,
    //  scrape for player roster, add info to our
    //  database
    let rosterUrl = 'http://www.gopsusports.com/sports/m-footbl/mtt/psu-m-footbl-mtt.html';
    getRosterDataFromURL(rosterUrl);

    //  Other things while doing this
    //  needed here??


}  // end scrapeRosterData()




//
//  Fetch the PSU roster HTML markup data from the roster website
//  then traverse thru it to scrape the player data from it.  The
//  website holds the data in a HTML tagged Table.
//
////      OBSOLETE
function getRosterDataFromURL(urlOfData) {


    //  Fetch the HTTP response and extract the URL's body text
    fetch(urlOfData)
        .then(function(response) {
            return response.text();
        })
        .then(function(theText) {

            //  This happens asynchronously when the page is returned in the
            //  response.  The fetch doesn't block waiting for the response.
            //  The response returns html text with carriage returns and line
            //  feeds.  Remove them for easier processing.
            let newNoSpaces = theText.replace(/\n|\r\n|\r/g, '');   // remove carriage returns


            //  Cut out roster data html data part out of the whole html page
            // returned for easier scraping from the html tags.
            let rosterWrapStartIndex = newNoSpaces.indexOf("table id=sortable_roster");
            let rosterWrapEndIndex = newNoSpaces.indexOf("--roster-wrap--");
            let rosterText = newNoSpaces.slice(rosterWrapStartIndex, rosterWrapEndIndex);
            rosterWrapEndIndex = rosterText.indexOf("/tr></table");
            rosterText = rosterText.slice(0, rosterWrapEndIndex);


            //  Loop thru the html roster data to pull out
            //  the respective fields needed for the players
            //  on the roster.
            let parsedText = rosterText;
            let keepParsingFlag = true;
            while (keepParsingFlag) {


                //  Get the next respective row of player data
                let playerRowBegin = parsedText.indexOf("player-row");
                if (playerRowBegin !== -1) {

                    parsedText = parsedText.slice(playerRowBegin, parsedText.length);

                    //  Get the player's roster number
                    let dataOffset = 9;
                    let rosterNumberBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(rosterNumberBegin, parsedText.length);
                    let rosterNumberEnd = parsedText.indexOf("<");
                    let rosterNumber = parsedText.slice(0, rosterNumberEnd);

                    //  Get the Url of the player's bio data.  We will need
                    //  this to scrape this respective player's bio information
                    //  later
                    dataOffset = 8;
                    let bioUrlBegin = parsedText.indexOf("a href=") + dataOffset;
                    parsedText = parsedText.slice(bioUrlBegin, parsedText.length);
                    let bioUrlEnd = parsedText.indexOf(">");
                    let bioUrl = parsedText.slice(0, bioUrlEnd - 1);

                    //  Get the player's name
                    dataOffset = 9;
                    let playerNameBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(playerNameBegin, parsedText.length);
                    let playerNameEnd = parsedText.indexOf("<");
                    let playerName = parsedText.slice(0, playerNameEnd);

                    //  Get the player's position
                    dataOffset = 9;
                    let playerPositionBegin = parsedText.indexOf("#000000") + dataOffset;
                    parsedText = parsedText.slice(playerPositionBegin, parsedText.length);
                    let playerPositionEnd = parsedText.indexOf("<");
                    let playerPosition = parsedText.slice(0, playerPositionEnd);

                    console.log(rosterNumber + "  " + playerName + "  " + playerPosition + "  " + bioUrl);

                    //  Add the player's info to the database
                    //  myDatabase.addPlayer(data.... );

                } else {
                    keepParsingFlag = false;
                }

            }  // end while keepParsingFlag

            //  Use for debug breakpoint
            //let temp = 999;

        });


}  // end getRosterDataFromURL()


import DatabaseDAO from "../DAO/DatabaseDAO";


//
//  Fetch the player's bio HTML markup data from the player website
//  then traverse thru it to scrape the player bio data in it.  The
//  website holds the data in a HTML tagged Table.
//
export const getPlayerBioDataFromURL = (urlOfBioData) => {


    //  Fetch the HTTP response and extract the URL's body text
    fetch(urlOfBioData)
        .then(function(response) {
            return response.text();
        })
        .then(function(returnedHtmlText) {

            //  This happens asynchronously when the page is returned in the
            //  response.  The fetch doesn't block waiting for the response.
            //  The response returns html text with carriage returns and line
            //  feeds.  Remove them for easier processing.
            let htmlText = returnedHtmlText.replace(/\n|\r\n|\r/g, '');   // remove carriage returns



            //  Get the player's Jersey Number & Name
            //   (note all offsets following are determined by inspection of the data
            //    to then write this parsing code) (used Firefox web browser and its
            //    Inspector (->F12) to determine these)
            let dataOffset = 3;
            let playerNum = "-99";
            let playerName = "unknown";

            //  First index to a known point where the data resides in the
            //  html - (visual inspection determined this id tag to look for)
            //  Then get the start and end of the data based on surrounding
            //  html tags.
            let playerNumBegin = htmlText.indexOf("biotable-number");
            if (playerNumBegin !== -1) {
                htmlText = htmlText.slice(playerNumBegin + dataOffset, htmlText.length);
                let start = htmlText.indexOf(">");
                let playerNumEnd = htmlText.indexOf("</div");
                playerNum = htmlText.slice(start+1, playerNumEnd);

                //  Do the same here but for the players name
                //  its next in line in the html text.
                let playerNameBegin = playerNumEnd + 6;
                htmlText = htmlText.slice(playerNameBegin, htmlText.length);
                let playerNameEnd = htmlText.indexOf("</div");
                playerName = htmlText.slice(0, playerNameEnd);
            }


            //  Get the player's Image Url
            dataOffset = 26;
            let playerImageUrl = "n/a";
            let playerImageUrlBegin = htmlText.indexOf("biotable-photo");
            if (playerImageUrlBegin !== -1) {
                htmlText = htmlText.slice(playerImageUrlBegin + dataOffset, htmlText.length);
                let playerImageUrlEnd = htmlText.indexOf("width=");
                playerImageUrl = htmlText.slice(0, playerImageUrlEnd-2);
            }


            //  Get the player's Class
            dataOffset = 14;
            let playerClassYear = "n/a";
            let playerClassYearBegin = htmlText.indexOf("Class:");
            if (playerClassYearBegin !== -1) {
                htmlText = htmlText.slice(playerClassYearBegin + dataOffset, htmlText.length);
                let playerClassYearEnd = htmlText.indexOf("</font");
                playerClassYear = htmlText.slice(0, playerClassYearEnd);
            }


            //  Get the player's Hometown
            dataOffset = 17;
            let playerHometown = "n/a";
            let playerHomeBegin = htmlText.indexOf("Hometown:");
            if (playerHomeBegin !== -1) {
                htmlText = htmlText.slice(playerHomeBegin + dataOffset, htmlText.length);
                let playerHomeEnd = htmlText.indexOf("</font");
                playerHometown = htmlText.slice(0, playerHomeEnd);
            }


            //  Get the player's High School
            dataOffset = 20;
            let playerHighSchool = "n/a";
            let playerHsBegin = htmlText.indexOf("High School:");
            if (playerHsBegin !== -1) {
                htmlText = htmlText.slice(playerHsBegin + dataOffset, htmlText.length);
                let playerHsEnd = htmlText.indexOf("</font");
                playerHighSchool = htmlText.slice(0, playerHsEnd);
            }


            //  Get the player's Height Weight
            dataOffset = 15;
            let playerHeightWeight = "n/a";
            let playerHwBegin = htmlText.indexOf("Weight:");
            if (playerHwBegin !== -1) {
                htmlText = htmlText.slice(playerHwBegin + dataOffset, htmlText.length);
                let playerHwEnd = htmlText.indexOf("</font");
                playerHeightWeight = htmlText.slice(0, playerHwEnd);
            }



            //  Get the player's Postion
            dataOffset = 17;
            let playerPosition = "n/a";
            let playerPosBegin = htmlText.indexOf("Position:");
            if (playerPosBegin !== -1) {
                htmlText = htmlText.slice(playerPosBegin + dataOffset, htmlText.length);
                let playerPosEnd = htmlText.indexOf("</font");
                playerPosition = htmlText.slice(0, playerPosEnd);
            }


            //  Get the player's Experience
            dataOffset = 19;
            let playerExperience = "n/a";
            let playerExpBegin = htmlText.indexOf("Experience:");
            if (playerExpBegin !== -1) {
                htmlText = htmlText.slice(playerExpBegin + dataOffset, htmlText.length);
                let playerExpEnd = htmlText.indexOf("</font");
                playerExperience = htmlText.slice(0, playerExpEnd);
            }


            //  Get the player's Major
            dataOffset = 14;
            let playerMajor = "n/a";
            let playerMajorBegin = htmlText.indexOf("Major:");
            if (playerMajorBegin !== -1) {
                htmlText = htmlText.slice(playerMajorBegin + dataOffset, htmlText.length);
                let playerMajorEnd = htmlText.indexOf("</font");
                playerMajor = htmlText.slice(0, playerMajorEnd);
            }


            //  Add the player's bio info to the database
            //  myDatabase.addPlayerBioData(data.... );
            //  Create our Team Roster database to hold our players
            //  and their respective information.
            //console.log('Adding a player....');
            DatabaseDAO.addSinglePlayer(playerName, playerNum, playerPosition, playerImageUrl,
                                          playerClassYear, playerHometown, playerHeightWeight,
                                          playerHighSchool, playerExperience, playerMajor);


            //console.log( add to DB:  playerName + " " + playerNum + " " + playerPosition  + "...." );

        });


}  // end getPlayerBioDataFromURL()


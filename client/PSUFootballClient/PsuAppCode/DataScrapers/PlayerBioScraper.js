

//
//  Pull all of the player's bio data for each
//  respective player on the roster.
//
export const scrapePlayerBioData = ()=> {

    let psuBaseUrl = 'http://www.gopsusports.com';


    //  Loop thru our database and get each player's
    //  respective Url for their bio data.  Then scrape
    //  it for the respective player's data
    let rosterSize = 1;
    for (let i = 0; i < rosterSize; i++) {

        //  Get the player from the database
        //  let playerUrl = myDatabase.getPlayerUrl();
        let playerUrl = '/sports/m-footbl/mtt/mark_allen_905734.html';
        let playerBioUrl = psuBaseUrl + playerUrl;

        //  Fetch and scrape for data
        getPlayerBioDataFromURL(playerBioUrl);

        //  Other things while doing this
        //  needed here??


    }  // end for



}  // end scrapeRosterTeamData()





//
//  Fetch the player's bio HTML markup data from the player website
//  then traverse thru it to scrape the player bio data in it.  The
//  website holds the data in a HTML tagged Table.
//
function getPlayerBioDataFromURL(urlOfData) {


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
            let playerInfoText = theText.replace(/\n|\r\n|\r/g, '');   // remove carriage returns


            //  Get the player's Class
            let dataOffset = 14;
            let playerClassBegin = playerInfoText.indexOf("Class:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerClassBegin, playerInfoText.length);
            let playerClassEnd = playerInfoText.indexOf("</font");
            let playerClass = playerInfoText.slice(0, playerClassEnd);


            //  Get the player's Hometown
            dataOffset = 17;
            let playerHomeBegin = playerInfoText.indexOf("Hometown:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerHomeBegin, playerInfoText.length);
            let playerHomeEnd = playerInfoText.indexOf("</font");
            let playerHometown = playerInfoText.slice(0, playerHomeEnd);


            //  Get the player's High School
            dataOffset = 20;
            let playerHsBegin = playerInfoText.indexOf("High School:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerHsBegin, playerInfoText.length);
            let playerHsEnd = playerInfoText.indexOf("</font");
            let playerHighSchool = playerInfoText.slice(0, playerHsEnd);


            //  Get the player's Height Weight
            dataOffset = 15;
            let playerHwBegin = playerInfoText.indexOf("Weight:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerHwBegin, playerInfoText.length);
            let playerHwEnd = playerInfoText.indexOf("</font");
            let playerHeightWeight = playerInfoText.slice(0, playerHwEnd);


            //  Get the player's Experience
            dataOffset = 19;
            let playerExpBegin = playerInfoText.indexOf("Experience:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerExpBegin, playerInfoText.length);
            let playerExpEnd = playerInfoText.indexOf("</font");
            let playerExperience = playerInfoText.slice(0, playerExpEnd);


            //  Get the player's H.S. Coach
            dataOffset = 19;
            let playerHsCoachBegin = playerInfoText.indexOf("H.S. Coach:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerHsCoachBegin, playerInfoText.length);
            let playerHsCoachEnd = playerInfoText.indexOf("</font");
            let playerHsCoach = playerInfoText.slice(0, playerHsCoachEnd);


            //  Get the player's Major
            dataOffset = 14;
            let playerMajorBegin = playerInfoText.indexOf("Major:") + dataOffset;
            playerInfoText = playerInfoText.slice(playerMajorBegin, playerInfoText.length);
            let playerMajorEnd = playerInfoText.indexOf("</font");
            let playerMajor = playerInfoText.slice(0, playerMajorEnd);


            console.log(playerClass + "  " + playerHometown + "  " + playerHighSchool + "  " + playerHeightWeight + "  " + playerExperience + "  " + playerHsCoach + "  " + playerMajor);

            //  Add the player's bio info to the database
            //  myDatabase.addPlayerBioData(data.... );

            //  Use for debug breakpoint
            //let temp = 999;

        });


}  // end getPlayerBioDataFromURL()


import DatabaseDAO from "../DAO/DatabaseDAO";


//
//  Fetch the player's bio HTML markup data from the player website
//  then traverse thru it to scrape the player bio data in it.  The
//  website holds the data in a HTML tagged Table.
//
export const getPlayerBioDataFromURL = (urlOfBioData) => {


    //  Fetch the HTTP response and extract the URL's body text
//            DatabaseDAO.addSinglePlayer(playerName, playerNum, playerPosition, playerImageUrl,
//                                          playerClassYear, playerHometown, playerHeightWeight,
//                                          playerHighSchool, playerExperience, playerMajor);




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
                //console.log(playerNum);




                


                //  Do the same here but for the players name
                //  its next in line in the html text.
                let playerNameBegin = playerNumEnd + 6;
                htmlText = htmlText.slice(playerNameBegin, htmlText.length);
                let playerNameEnd = htmlText.indexOf("</div");
                playerName = htmlText.slice(0, playerNameEnd);
//                console.log(playerName);

            }


            //  Get the player's Image Url
            dataOffset = 26;
            let playerImageUrl = "n/a";
            let playerImageUrlBegin = htmlText.indexOf("biotable-photo");
            if (playerImageUrlBegin !== -1) {
                htmlText = htmlText.slice(playerImageUrlBegin + dataOffset, htmlText.length);
                let playerImageUrlEnd = htmlText.indexOf("width=");
                playerImageUrl = htmlText.slice(0, playerImageUrlEnd-2);
                //console.log(playerImageUrl);

            }


            //  Get the player's Class
            dataOffset = 14;
            let playerClassYear = "n/a";
            let playerClassYearBegin = htmlText.indexOf("Class:");
            if (playerClassYearBegin !== -1) {
                htmlText = htmlText.slice(playerClassYearBegin + dataOffset, htmlText.length);
                let playerClassYearEnd = htmlText.indexOf("</font");
                playerClassYear = htmlText.slice(0, playerClassYearEnd);
                //console.log(playerClassYear);

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

//            let playerStatsTable = htmlText.indexOf("total-stats-comp");
//            console.debug('Player Stats: ' + playerStatsTable);
//            if (playerStatsTable !== -1) {
//                htmlText = htmlText.slice((playerStatsTable - 9), htmlText.length);
//                let end = htmlText.indexOf("PARSER CONTENT MARKER END");
//                console.debug(end);
//                htmlText = htmlText.slice(0, end);
//                console.debug('Player Stats Table: ' + htmlText);
//                //let start = htmlText.indexOf(">");
//                //let playerNumEnd = htmlText.indexOf("</div");
//                //playerNum = htmlText.slice(start+1, playerNumEnd);
//
//                //  Do the same here but for the players name
//                //  its next in line in the html text.
//                //let playerNameBegin = playerNumEnd + 6;
//                //htmlText = htmlText.slice(playerNameBegin, htmlText.length);
//                //let playerNameEnd = htmlText.indexOf("</div");
//                //playerName = htmlText.slice(0, playerNameEnd);
//            }


            //  Add the player's bio info to the database
            //  myDatabase.addPlayerBioData(data.... );
            //  Create our Team Roster database to hold our players
            //  and their respective information.
            //console.log('Adding a player....');
//            DatabaseDAO.addSinglePlayer(playerName, playerNum, playerPosition, playerImageUrl,
//                                          playerClassYear, playerHometown, playerHeightWeight,
//                                          playerHighSchool, playerExperience, playerMajor);


            //console.log( add to DB:  playerName + " " + playerNum + " " + playerPosition  + "...." );

        });
        
    let playerNumArray = [
        8,41,52,47,92,90,83
        ,6,24,13,32,19,20,97
        ,94,5,50,14,98,80,41
        ,33,39,95,45,40,7,25,44,71
        ,51,93,30,74,19,99,1,53
        ,37,12,83,18,2,75,96,76,84,36,42
        ,49,68,82,97,85,40,72
        ,89,3,66,14,62,9,9,48,73,23
        ,35,21,11,16,10,58,29,24
        ,4,55,82,79,15,64,34,2,91,26
        ,81,46,17,20,69,3,18,98
        ,96,51,38,31,80,54,77,7
    ]
    
    let playerNameArray = [
,"Mark  Allen"
,"Damion  Barber"
,"Joe  Arcangelo"
,"Will  Blair"
,"Corey  Bolds"
,"Ryan  Bates"
,"Nick  Bowers"
,"Ellis  Brooks"
,"DJ  Brown"
,"Journey  Brown"
,"Cam  Brown"
,"Ryan  Buchholz"
,"Torrence  Brown"
,"Jabari  Butler"
,"Joe  Calcagno"
,"Tariq  Castro-Fields"
,"Max  Chizmar"
,"Sean  Clifford"
,"Jake  Cooper"
,"Mike  Curry"
,"Danny  Dalton"
,"Dae'Lun  Darien"
,"Frank  Di Leo"
,"Donnell  Dix"
,"Joe  DuMond"
,"Nick  Eury"
,"Brelin  Faison-Walden"
,"Brailyn  Franklin"
,"Koa  Farmer"
,"Will  Fries"
,"Alex  Gellerstedt"
,"Blake  Gillikin"
,"Steven  Gonzalez"
,"Kevin  Givens"
,"Trent  Gordon"
,"Yetur  Gross-Matos"
,"KJ  Hamler"
,"Fred  Hansard"
,"Drew  Hartlaub"
,"Mac  Hippenhammer"
,"Alex  Hoenstine"
,"Jonathan  Holland"
,"Des  Holmes"
,"Isaiah  Humphries"
,"Immanuel  Iyke"
,"Donovan  Johnson"
,"Sterling  Jenkins"
,"Jan  Johnson"
,"Juwan  Johnson"
,"Ellison  Jordan"
,"Daniel  Joseph"
,"Hunter  Kelly"
,"Carson  Landis"
,"Zack  Kuntz"
,"Jesse  Luketa"
,"Isaac  Lutz"
,"Robbie  Martin"
,"Colton  Maxwell"
,"Connor  McGovern"
,"Zech  McPhearson"
,"Trace  McSorley"
,"Michal  Menet"
,"Jarvis  Miller"
,"Shareef  Miller"
,"Mike  Miranda"
,"Justin  Neff"
,"Ayron  Monroe"
,"Amani  Oruwariye"
,"Micah  Parsons"
,"John  Petrishen"
,"Brandon  Polk"
,"Evan  Presta"
,"John  Reid"
,"Miles  Sanders"
,"Nick  Scott"
,"Antonio  Shelton"
,"Tyler  Shoop"
,"Charlie  Shuman"
,"Shane  Simmons"
,"Michael  Shuster"
,"Zach  Simpson"
,"Tommy  Stevens"
,"Chris  Stoll"
,"Jonathan  Sutherland"
,"Cam  Sullivan-Brown"
,"Nick  Tarburton"
,"Garrett  Taylor"
,"C.J.  Thorpe"
,"Johnathan  Thomas"
,"DeAndre  Thompkins"
,"Shaka  Toney"
,"Dan  Vasey"
,"Kyle  Vasey"
,"Lamont  Wade"
,"Jason  Vranic"
,"Justin  Weller"
,"Christopher  Welde"
,"Robert  Windsor"
,"Chasz  Wright"
,"Jake  Zembiec"    
    ]
    
    let playerImageUrlArray = [
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12799453.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748184.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565705.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565730.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941845.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565750.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748268.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565752.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748254.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748288.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565753.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565774.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547407.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748315.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748277.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105427.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748299.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565875.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565892.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941846.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565893.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565951.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565941.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565945.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547448.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565970.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748280.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565974.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570238.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105450.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570257.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570266.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105451.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748300.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547449.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748301.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748284.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748302.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941893.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12759215.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748281.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105435.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570577.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570576.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748282.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570581.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570592.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570608.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570614.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570607.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105452.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941916.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105453.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571282.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571306.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748303.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105439.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571337.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571374.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571387.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571412.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571442.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547430.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571456.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748313.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105444.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571464.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571522.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571579.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941928.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12003401.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571608.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571634.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571635.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571636.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572160.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572143.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572145.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572169.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572176.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748285.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748304.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748307.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105445.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105446.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572177.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572189.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748308.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572191.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572201.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941948.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105456.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547431.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572211.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941922.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572212.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572235.jpeg"
,"http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572222.jpeg"

    ]
    
    let playerClassYearArray = [
,"Graduate Student"
,"Sophomore"
,"Senior"
,"Sophomore"
,"Senior"
,"Junior"
,"Senior"
,"Junior"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Senior"
,"Senior"
,"Senior"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Senior"
,"Senior"
,"Junior"
,"Junior"
,"Senior"
,"Senior"
,"Junior"
,"Junior"
,"Sophomore"
,"Graduate Student"
,"Junior"
,"Sophomore"
,"Junior"
,"Junior"
,"Freshman"
,"Senior"
,"Senior"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Sophomore"
,"Senior"
,"Sophomore"
,"Freshman"
,"Senior"
,"Senior"
,"Sophomore"
,"Senior"
,"Senior"
,"Junior"
,"Junior"
,"Junior"
,"Freshman"
,"Sophomore"
,"Freshman"
,"Junior"
,"Sophomore"
,"Junior"
,"Junior"
,"Junior"
,"Senior"
,"Junior"
,"Senior"
,"Sophomore"
,"Senior"
,"Senior"
,"Sophomore"
,"Graduate Student"
,"Freshman"
,"Senior"
,"Senior"
,"Sophomore"
,"Senior"
,"Junior"
,"Senior"
,"Junior"
,"Senior"
,"Senior"
,"Junior"
,"Junior"
,"Senior"
,"Sophomore"
,"Senior"
,"Sophomore"
,"Sophomore"
,"Freshman"
,"Senior"
,"Graduate Student"
,"Graduate Student"
,"Sophomore"
,"Junior"
,"Senior"
,"Sophomore"
,"Senior"
,"Sophomore"
,"Senior"
,"Sophomore"
,"Senior"
,"Senior"
,"Junior"    
    
    ]












    console.log("playerNameArray.length: " + playerNameArray.length);
    for (i = 0; i < playerNameArray.length; i++) {
        console.log('Adding a player....');
        DatabaseDAO.addSinglePlayer(playerNameArray[i], playerNumArray[i], '1', playerImageUrlArray[i],
                                      playerClassYearArray[i], 'Havertown', "5/6 180",
                                      "Haverford", "Freshman", "Political Science");
        console.log( "Add to DB: " + playerNameArray[i] + " " + playerNumArray[i] + " " + [i]  + "...." );
    }



}  // end getPlayerBioDataFromURL()


import {SQLite} from "expo";
import {AsyncStorage} from 'react-native';
import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";
import {scrapeGameScheduleData} from "./../DataScrapers/GameScheduleScraper";
import DatabaseDAO from "./DatabaseDAO";

//Define the database
let psuFootballApp_db = SQLite.openDatabase('PsuFootballApp.db');
//Ensure asynchronous database functions occur synchronously

export default class OfflineDatabaseDAO {

     static populateOfflineDatabase() {

        let playerNumArray = [,'8', '41', '90', '52', '47', '92', '83', '13',
        '6', '24', '32', '19', '97', '20', '94', '5', '50', '14', '33', '98',
        '80', '41', '39', '95', '45', '40', '25', '7', '44', '71', '51', '93',
        '30', '74', '19', '99', '1', '53', '37', '12', '83', '18', '75', '2',
        '96', '76', '3', '36', '84', '42', '49', '68', '82', '97', '40', '85',
        '72', '89', '66', '14', '9', '62', '9', '48', '73', '23', '35', '21',
        '11', '16', '10', '58', '29', '24', '4', '55', '82', '79', '15', '34',
        '64', '2', '91', '81', '26', '46', '17', '20', '3', '69', '18', '98',
        '96', '51', '38', '31', '80', '54', '77', '7']

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
        for (i = 1; i < playerNameArray.length; i++) {
            console.log('Adding a player....' + 'at array point: ' + i);
            DatabaseDAO.addSinglePlayer(playerNameArray[i], playerNumArray[i], '1', playerImageUrlArray[i],
                                          playerClassYearArray[i], 'Havertown', "5/6 180",
                                          "Haverford", "Freshman", "Political Science");
            console.log( "Add to DB: " + playerNameArray[i] + " " + playerNumArray[i] + " " + [i]  + "...." );
        }

    }
}

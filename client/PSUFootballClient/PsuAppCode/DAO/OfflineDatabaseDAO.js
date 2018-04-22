import {SQLite} from "expo";
import {AsyncStorage} from 'react-native';
import {scrapeTeamRosterData} from "./../DataScrapers/RosterScraper";
import {scrapeGameScheduleData} from "./../DataScrapers/GameScheduleScraper";
import DatabaseDAO from "./DatabaseDAO";


let psuFootballApp_db = SQLite.openDatabase('PsuFootballApp.db');


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

        let playerNameArray = [,'Mark  Allen', 'Joe  Arcangelo', 'Damion  Barber', 'Ryan  Bates', 'Will  Blair',
        'Corey  Bolds', 'Nick  Bowers', 'Ellis  Brooks', 'Cam  Brown', 'DJ  Brown', 'Journey  Brown', 'Torrence  Brown',
        'Ryan  Buchholz', 'Jabari  Butler', 'Joe  Calcagno', 'Tariq  Castro-Fields', 'Max  Chizmar', 'Sean  Clifford',
        'Jake  Cooper', 'Mike  Curry', 'Danny  Dalton', "Dae'Lun  Darien", 'Frank  Di Leo', 'Donnell  Dix', 'Joe  DuMond',
        'Nick  Eury', 'Brelin  Faison-Walden', 'Koa  Farmer', 'Brailyn  Franklin', 'Will  Fries', 'Alex  Gellerstedt', 'Blake  Gillikin',
        'Kevin  Givens', 'Steven  Gonzalez', 'Trent  Gordon', 'Yetur  Gross-Matos', 'KJ  Hamler', 'Fred  Hansard', 'Drew  Hartlaub',
        'Mac  Hippenhammer', 'Alex  Hoenstine', 'Jonathan  Holland', 'Des  Holmes', 'Isaiah  Humphries', 'Immanuel  Iyke', 'Sterling  Jenkins',
        'Donovan  Johnson', 'Jan  Johnson', 'Juwan  Johnson', 'Ellison  Jordan', 'Daniel  Joseph', 'Hunter  Kelly', 'Zack  Kuntz', 'Carson  Landis',
        'Jesse  Luketa', 'Isaac  Lutz', 'Robbie  Martin', 'Colton  Maxwell', 'Connor  McGovern', 'Zech  McPhearson', 'Trace  McSorley', 'Michal  Menet',
        'Jarvis  Miller', 'Shareef  Miller', 'Mike  Miranda', 'Ayron  Monroe', 'Justin  Neff', 'Amani  Oruwariye', 'Micah  Parsons', 'John  Petrishen',
        'Brandon  Polk', 'Evan  Presta', 'John  Reid', 'Miles  Sanders', 'Nick  Scott', 'Antonio  Shelton', 'Tyler  Shoop', 'Charlie  Shuman', 'Michael  Shuster',
        'Shane  Simmons', 'Zach  Simpson', 'Tommy  Stevens', 'Chris  Stoll', 'Cam  Sullivan-Brown', 'Jonathan  Sutherland', 'Nick  Tarburton', 'Garrett  Taylor',
        'Johnathan  Thomas', 'DeAndre  Thompkins', 'C.J.  Thorpe', 'Shaka  Toney', 'Dan  Vasey', 'Kyle  Vasey', 'Jason  Vranic', 'Lamont  Wade', 'Christopher  Welde',
        'Justin  Weller', 'Robert  Windsor', 'Chasz  Wright', 'Jake  Zembiec']

        let playerImageUrlArray = [,'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565686.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12799453.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941845.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565730.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565705.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748184.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565750.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748268.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565752.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748254.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748288.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565753.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565774.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547407.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748315.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748277.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105427.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748299.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565875.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941846.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565892.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565893.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565951.jpeg', 'http://grfx.cstv.com/schools/psu/graphics/mtt-logo.gif',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565941.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565945.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547448.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565970.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748280.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12565974.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570238.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105450.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570257.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570266.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105451.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748300.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547449.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748301.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748284.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748302.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941893.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12759215.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748281.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105435.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570576.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570577.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748282.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570581.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570592.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570608.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570614.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12570607.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105452.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941916.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105453.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571282.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748303.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571306.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105439.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571337.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571374.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571387.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571412.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571442.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547430.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571456.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748313.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571464.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105444.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571522.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571579.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941928.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571608.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12003401.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571634.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571635.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12571636.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572160.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572143.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572145.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572169.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572176.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748285.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748304.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748307.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105445.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105446.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572177.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572189.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12748308.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572191.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941948.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572201.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/13105456.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12547431.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572211.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12941922.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572212.jpeg',
        'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572235.jpeg', 'http://grfx.cstv.com/photos/schools/psu/sports/m-footbl/auto_headshot/12572222.jpeg']

        let playerClassYearArray = [,'Graduate Student', 'Senior', 'Sophomore', 'Senior', 'Junior', 'Sophomore', 'Senior', 'Sophomore', 'Junior', 'Sophomore',
        'Sophomore', 'Senior', 'Senior', 'Senior', 'Sophomore', 'Sophomore', 'Sophomore', 'Sophomore', 'Senior', 'Senior', 'Junior', 'Junior', 'Senior', 'Senior',
        'Junior', 'Junior', 'Sophomore', 'Graduate Student', 'Sophomore', 'Junior', 'Junior', 'Junior', 'Senior', 'Senior', 'Freshman', 'Sophomore', 'Sophomore',
        'Sophomore', 'Sophomore', 'Sophomore', 'Sophomore', 'Senior', 'Sophomore', 'Freshman', 'Senior', 'Senior', 'Sophomore', 'Senior', 'Senior', 'Junior', 'Junior',
        'Junior', 'Freshman', 'Sophomore', 'Freshman', 'Junior', 'Sophomore', 'Junior', 'Junior', 'Junior', 'Senior', 'Junior', 'Senior', 'Senior', 'Sophomore', 'Senior',
        'Sophomore', 'Graduate Student', 'Freshman', 'Senior', 'Senior', 'Sophomore', 'Senior', 'Junior', 'Senior', 'Junior', 'Senior', 'Senior', 'Junior', 'Junior',
        'Senior', 'Senior', 'Sophomore', 'Sophomore', 'Sophomore', 'Freshman', 'Senior', 'Graduate Student', 'Graduate Student', 'Sophomore', 'Junior', 'Sophomore',
        'Senior', 'Senior', 'Sophomore', 'Senior', 'Sophomore', 'Senior', 'Senior', 'Junior']

        let playerHometownArray = [,'Hyattsville, Md.', 'Clarks Summit, Pa.', 'Harrisburg', 'Warrington, Pa.', 'Lancaster, Pa.', 'Paterson, N.J.', 'Kittanning, Pa.', 'Mechanicsville, Va.',
        'Burtonsville, Md.', 'College Park, Ga.', 'Meadville, Pa.', 'Tuscaloosa, Ala.', 'Malvern, Pa.', 'Potomac, Md.', 'Elmhurst, Ill.', 'Upper Marlboro, Md.', 'Mars, Pa.', 'Cincinnati, Ohio',
        'Doylestown, Pa.', 'Phillipsburg, N.J.', 'Marshfield, Mass.', 'Baltimore, Md.', 'Elmhurst, Ill.', 'Salisbury, Md.', 'Philadelphia, Pa.', 'Shavertown, Pa.', 'Greensboro, N.C.',
        'Lake View Terrace, Calif.', 'Arlington, Texas', 'Cranford, N.J.', 'Dublin, Ohio', 'Smyrna, Ga.', 'Altoona, Pa.', 'Union City, N.J.', 'Spring, Texas', 'Spotsylvania, Va.',
        'Pontiac, Mich.', 'Burlington, N.J.', 'Hanover, Pa.', 'Fort Wayne, Ind.', 'East Freedom, Pa.', 'Brandywine, Md.', 'Norristown, Pa.', 'Rowlett, Texas', 'Hackettstown, N.J.',
        'Pittsburgh, Pa.', 'Detroit, Mich.', 'Mohnton, Pa.', 'Glassboro, N.J.', 'Upper Marlboro, Md.', 'Brampton, Ontario, Canada', 'Langhorne, Pa.', 'Camp Hill, Pa.', 'Macungie, Pa.',
        'Ottawa, Ontario', 'Reading, Pa.', 'Sparta, N.J.', 'Northampton, Pa.', 'Larksville, Pa.', 'Columbia, Md.', 'Ashburn, Va.', 'Birdsboro, Pa.', 'Suffield, Conn.', 'Philadelphia, Pa.',
        'Stow, Ohio', 'Largo, Md.', 'Mill Hall, Pa.', 'Tampa, Fla.', 'Harrisburg, Pa.', 'Lower Burrell, Pa.', 'Ashburn, Va.', 'Erie, Pa.', 'Mount Laurel, N.J.', 'Pittsburgh, Pa.', 'Fairfax, Va.',
        'Westerville, Ohio', 'Nashville, Tenn.', 'Pittsford, N.Y.', 'Camp Hill, Pa.', 'Laurel, Md.', 'Hollidaysburg, Pa.', 'Indianapolis, Ind.', 'Westerville, Ohio', 'Bowie, Md.',
        'Ottawa, Ontario, Canada', 'Green Lane, Pa.', 'Richmond, Va.', 'Peabody, Mass.', 'Hubert, N.C.', 'Glenshaw, Pa.', 'Philadelphia, Pa.', 'Lackawaxen, Pa.', 'Lackawaxen, Pa.',
        'Wheatfield, N.Y.', 'Clairton, Pa.', 'Newtown, Pa.', 'Sinking Spring, Pa.', 'Fond Du Lac, Wis.', 'Woodbridge, Va.', 'Rochester, N.Y.']

        let playerHighSchoolArray = [,'DeMatha Catholic', 'Abington Heights', 'Harrisburg, Pa.', 'Archbishop Wood', 'Hempfield', 'Paramus Catholic', 'Kittanning Senior', 'Benedictine College Prep',
        'Bullis School', 'Creekside', 'Meadville', 'Tuscaloosa Academy', 'Great Valley', 'Bishop Gorman (Nev.)', 'Fenwick', 'Riverdale Baptist School', 'Mars Area', 'Saint Xavier', 'Archbishop Wood',
        'Phillipsburg', 'Marshfield', 'Dunbar', 'Saint Ignatius College Prep', 'Wicomico', "St. Joseph's Prep", 'Lake-Lehman', 'Grimsley', 'Notre Dame', 'Battlefield (Va.)', 'Cranford', 'Dublin Coffman',
        'The Westminster Schools', 'Altoona Area', 'Union City', 'Manvel', 'Chancellor', 'IMG Academy (Fla.)', 'The Hun School', 'South Western', 'R. Nelson Snider', 'Central',
        'The Bullis School', "Cardinal O'Hara", 'Sachse', 'Parsippany Hills', 'Baldwin', 'Cass Tech', 'Governor Mifflin', 'Glassboro', 'Gilman School', 'Lake Forest Academy (Ill.)', 'Neshaminy',
         'Camp Hill', 'Emmaus', 'Mercyhurst Prep (Pa.)', 'Berks Catholic', 'Saint Joseph Regional', 'Northampton', 'Lake-Lehman', 'Riverdale Baptist School', 'Briar Woods', 'Exeter Township Senior',
         'Windsor Locks/Suffield/East Granby', 'George Washington', 'Stow-Munroe', 'Saint Johns College H.S.', 'Central Mountain', 'Gaither', 'Harrisburg', 'Pittsburgh Central Catholic', 'Briar Woods',
         'Cathedral Prep', "St. Joseph's Prep", 'Woodland Hills', 'Fairfax', 'Westerville-North', 'Father Ryan', 'Pittsford Sutherland', 'Camp Hill', 'DeMatha', 'Hollidaysburg Area', 'Decatur Central',
         'St. Francis DeSales', 'Saint Vincent Pallotti', 'Episcopal (Va.)', 'Pennridge', "Saint Christopher's", "St. John's Prep", 'Swansboro', 'Central Catholic', 'Imhotep Charter', 'Wallenpaupack',
         'Wallenpaupack', 'Niagara-Wheatfield', 'Clairton', 'Council Rock North', 'Wilson', 'Fond Du Lac', 'Milford Academy', 'Aquinas Institute']

         let playerHeightWeightArray = [,'5-6 / 187', '6-4 / 253', '6-3 / 278', '6-4 / 305', '5-11 / 216', '6-3 / 289', '6-4 / 265', '6-1 / 234', '6-5 / 222', '5-10 / 181',
         '5-11 / 197', '6-3 / 257', '6-6 / 264', '5-11 / 182', '6-0 / 239', '6-0 / 186', '6-2 / 207', '6-2 / 211', '6-1 / 235', '6-0 / 215', '6-4 / 245', '6-4 / 212', '5-9 / 223',
         '5-10 / 225', '5-11 / 243', '5-9 / 211', '6-1 / 212', '6-1 / 236', '6-2 / 204', '6-6 / 305', '6-6 / 301', '6-2 / 192', '6-1 / 275', '6-4 / 336', '5-11 / 181', '6-5 / 257',
         '5-9 / 172', '6-3 / 315', '5-11 / 177', '5-11 / 170', '6-1 / 181', '6-4 / 247', '6-5 / 306', '6-0 / 191', '6-2 / 280', '6-8 / 343', '5-9 / 185', '6-2 / 236', '6-4 / 229',
         '6-0 / 295', '6-3 / 248', '6-2 / 299', '6-7 / 232', '6-2 / 196', '6-3 / 239', '5-11 / 185', '6-4 / 273', '6-0 / 189', '6-5 / 320', '5-11 / 182', '6-0 / 198', '6-4 / 301',
         '6-2 / 215', '6-5 / 256', '6-3 / 302', '5-11 / 202', '6-1 / 194', '6-1 / 204', '6-3 / 241', '6-0 / 204', '5-9 / 171', '6-3 / 272', '5-10 / 189', '5-11 / 211', '5-11 / 202',
         '6-2 / 295', '5-11 / 181', '6-8 / 319', '6-2 / 208', '6-3 / 246', '6-3 / 294', '6-5 / 232', '6-2 / 244', '6-0 / 185', '5-11 / 198', '6-3 / 243', '6-0 / 200', '5-11 / 215',
         '5-11 / 191', '6-3 / 322', '6-3 / 224', '6-4 / 237', '6-2 / 230', '6-0 / 226', '5-9 / 196', '5-7 / 171', '6-0 / 190', '6-4 / 281', '6-7 / 346', '6-3 / 215']

         let playerPositionArray = [,'RB', 'TE/H', 'DT', 'OL', 'LB', 'DT', 'TE/H', 'LB', 'LB', 'CB', 'RB', 'DE', 'DE', 'CB', 'SN', 'CB', 'LB', 'QB', 'LB', 'SN', 'TE/H', 'LB', 'LB', 'DE',
         'DE', 'RB', 'LB', 'LB', 'LB', 'OL', 'OL', 'P/K', 'DT', 'OL', 'CB', 'DE', 'WR', 'DT', 'S', 'WR', 'WR', 'TE/H', 'OL', 'S', 'DT', 'OL', 'CB', 'LB', 'WR', 'DT', 'DE', 'OL/DL', 'TE/H',
         'K/P', 'LB', 'WR', 'OL', 'WR', 'OL', 'CB', 'QB', 'OL', 'LB', 'DE', 'OL', 'S', 'S', 'CB', 'LB', 'S', 'WR', 'DT', 'CB', 'RB', 'S', 'DT', 'WR', 'OL', 'QB', 'DE', 'OL', 'QB', 'SN', 'WR',
         'S', 'DE', 'S', 'RB', 'WR', 'OL', 'DE', 'DL/LS', 'SN', 'LB', 'S', 'RB', 'WR', 'DT', 'OL', 'QB']

         let playerExperienceArray = [,'SR', 'JR', 'FR', 'JR', 'SO', 'FR', 'JR', 'FR', 'JR', 'FR', 'FR', 'SR', 'JR', 'JR', 'FR', 'SO', 'FR', 'FR', 'SR', 'JR', 'SO', 'SO', 'JR', 'SR', 'SO',
         'SO', 'FR', 'SR', 'FR', 'SO', 'SO', 'JR', 'JR', 'JR', 'FR', 'SO', 'FR', 'FR', 'FR', 'FR', 'FR', 'JR', 'FR', 'FR', 'JR', 'JR', 'FR', 'JR', 'JR', 'SO', 'SO', 'SO', 'FR', 'FR', 'FR',
         'SO', 'FR', 'SO', 'JR', 'SO', 'SR', 'SO', 'JR', 'JR', 'FR', 'JR', 'FR', 'SR', 'FR', 'JR', 'JR', 'FR', 'JR', 'JR', 'SR', 'SO', 'JR', 'SR', 'SO', 'SO', 'JR', 'JR', 'FR', 'FR', 'FR',
         'FR', 'JR', 'SR', 'SR', 'FR', 'SO', 'FR', 'SR', 'SR', 'SO', 'JR', 'FR', 'JR', 'SR', 'SO']

         let playerMajorArray = [,"Management and Organizational Leadership (Master's)", 'Economics', 'Division of Undergraduate Studies', 'Labor & Employment Relations', 
         'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Labor & Employment Relations', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Recreation, Parks & Tourism Management', 
         'Media Studies', 'Telecommunications', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Telecommunications', 'N/A', 'Communications', 'Division of Undergraduate Studies', 
         'Business Administration', 'N/A', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Criminology & Sociology', 'Division of Undergraduate Studies', 
         'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Kinesiology', 'Criminology', 'History', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 
         'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Labor & Employment Relations', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'N/A', 'English', 'Division of Undergraduate Studies', 'Psychology', 'Telecommunications', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 
         'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Agribusiness Management', 
         'Division of Undergraduate Studies', 'Accounting', 'Division of Undergraduate Studies', 'Criminology', 'Rehabilitation & Human Services', 'Division of Undergraduate Studies', 
         'Information Sciences & Technology', 'Division of Undergraduate Studies', 'Telecommunications', 'Division of Undergraduate Studies', 'Communications Arts & Sciences', 'Criminology', 'Division of Undergraduate Studies', 
         'Data Sciences', 'Division of Undergraduate Studies', 'Psychology', 'Communications', 'Recreation, Parks & Tourism Management', 'Kinesiology', 'Business Administration', 
         'Division of Undergraduate Studies', 'Economics', 'Telecommunications', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Division of Undergraduate Studies', 'Advertising & Public Relations', 'Sociology', 'Psychology', 'Division of Undergraduate Studies', 
         'Division of Undergraduate Studies', 'N/A', 'Rehabilitation & Human Services', 'Kinesiology', 'Division of Undergraduate Studies', 'Mechanical Engineering', 'Division of Undergraduate Studies', 'Telecommunications', 
         'Telecommunications', 'Division of Undergraduate Studies']

         let playerRecruitingArray = [,'https://247sports.com/PlayerSport/Mark-Allen-at-DeMatha-Catholic-44677/Embed', 'https://247sports.com/PlayerSport/Joe-Arcangelo-at-Abington-Heights-109671/Embed',
         'https://247sports.com/PlayerSport/Damion-Barber-at-Harrisburg-145429/Embed', 'https://247sports.com/PlayerSport/Ryan-Bates-at-Archbishop-Wood-57900/Embed',
         './../WebContent/PlayerStats/MarkAllen.html', 'https://247sports.com/PlayerSport/Corey-Bolds-at-Paramus-Catholic-146598/Embed',
         'https://247sports.com/PlayerSport/Nick-Bowers-at-Kittanning-72172/Embed', 'https://247sports.com/PlayerSport/Ellis-Brooks-at-Benedictine-145809/Embed',
         'https://247sports.com/PlayerSport/Cameron-Brown-at-Paint-Branch-150490/Embed', 'https://247sports.com/PlayerSport/DJ-Brown-at-Creekside-151153/Embed',
         'https://247sports.com/PlayerSport/Journey-Brown-at-Meadville-Area-187318/Embed', 'https://247sports.com/PlayerSport/Torrence-Brown-at-Tuscaloosa-Academy-51069/Embed',
         'https://247sports.com/PlayerSport/Ryan-Buchholz-at-Great-Valley-66001/Embed', 'https://247sports.com/PlayerSport/Jabari-Butler-at-Penn-State-199095/Embed',
         'https://247sports.com/PlayerSport/Joe-Calcagno-at-Fenwick-190896/Embed', 'https://247sports.com/PlayerSport/Tariq-Castro-Fields-at-Riverdale-Baptist-158245/Embed',
         'https://247sports.com/PlayerSport/Max-Chizmar-at-Mars-Area-158223/Embedd', 'https://247sports.com/PlayerSport/Sean-Clifford-at-St-Xavier-143375/Embed',
         'https://247sports.com/PlayerSport/Jake-Cooper-at-Archbishop-Wood-52924/Embed', './../WebContent/PlayerStats/MarkAllen.html',
         'https://247sports.com/PlayerSport/Danny-Dalton-at-Marshfield-146463/Embed', 'https://247sports.com/PlayerSport/Daelun-Darien-at-Dunbar-150119/Embed',
         'https://247sports.com/PlayerSport/Frank-Di-Leo-at-St-Ignatius-College-Prep-201785/Embed', './../WebContent/PlayerStats/MarkAllen.html',
         './../WebContent/PlayerStats/MarkAllen.html', './../WebContent/PlayerStats/MarkAllen.html',
         'https://247sports.com/PlayerSport/Brelin-Faison-Walden-at-Grimsley-148907/Embed', 'https://247sports.com/PlayerSport/Koa-Farmer-at-Notre-Dame-48807/Embed',
         'https://247sports.com/PlayerSport/Brailyn-Franklin-at-Battlefield-181230/Embed', 'https://247sports.com/PlayerSport/Will-Fries-at-Cranford-Sr-144717/Embed',
         'https://247sports.com/PlayerSport/Alex-Gellerstedt-at-Dublin-Coffman-147248/Embed', 'https://247sports.com/PlayerSport/Blake-Gillikin-at-Westminster-School-151215/Embed',
         'https://247sports.com/PlayerSport/Kevin-Givens-at-Altoona-47210/Embed', 'https://247sports.com/PlayerSport/Steven-Gonzalez-at-Union-City-54719/Embed',
         'https://247sports.com/PlayerSport/Trent-Gordon-at-Manvel-146532/Embed', 'https://247sports.com/PlayerSport/Yetur-Gross-Matos-at-Chancellor-128776/Embed',
         'https://247sports.com/PlayerSport/Yetur-Gross-Matos-at-Chancellor-128776/Embed', 'https://247sports.com/PlayerSport/KJ-Hamler-at-IMG-Academy-133643/Embed',
         'https://247sports.com/PlayerSport/Fred-Hansard-at-Hun-School--144701/Embed', 'https://247sports.com/PlayerSport/Drew-Hartlaub-at-South-Western-135011/Embed',
         'https://247sports.com/PlayerSport/Mac-Hippenhammer-at-R-Nelson-Snider-149656/Embed', 'https://247sports.com/PlayerSport/Alex-Hoenstine-at-Central-187669/Embed',
         'https://247sports.com/PlayerSport/Jonathan-Holland-at-The-Bullis-School-70520/Embed', 'https://247sports.com/PlayerSport/Desmond-Holmes-at-Cardinal-OHara-153433/Embed',
         'https://247sports.com/PlayerSport/Isaiah-Humphries-at-Sachse-158318/Embed', './../WebContent/PlayerStats/MarkAllen.html',
         'https://247sports.com/PlayerSport/Sterling-Jenkins-at-Baldwin-61916/Embed', 'https://247sports.com/PlayerSport/Donovan-Johnson-at-Cass-Technical-134765/Embed',
         'https://247sports.com/PlayerSport/Jan-Johnson-at-Governor-Mifflin-54735/Embed', 'https://247sports.com/PlayerSport/Juwan-Johnson-at-Glassboro-61971/Embed',
         'https://247sports.com/PlayerSport/Ellison-Jordan-at-Gilman-51120/Embed', 'https://247sports.com/PlayerSport/Daniel-Joseph-at-Lake-Forest-Academy-145316/Embed',
         'https://247sports.com/PlayerSport/Hunter-Kelly-at-Neshaminy-176458/Embed', 'https://247sports.com/PlayerSport/Zack-Kuntz-at-Camp-Hill-148555/Embed',
         './../WebContent/PlayerStats/MarkAllen.html', 'https://247sports.com/PlayerSport/Jesse-Luketa-at-Mercyhurst-Preparatory-School-160808/Embed',
         'https://247sports.com/PlayerSport/Isaac-Lutz-at-Berks-Catholic-145842/Embed', 'https://247sports.com/PlayerSport/Robert-Martin-at-St-Joseph-Regional--152427/Embed',
         'https://247sports.com/PlayerSport/Connor-McGovern-at-Lake-Lehman-144718/Embed', 'https://247sports.com/PlayerSport/Zechariah-McPhearson-at-Riverdale-Baptist-148218/Embed',
         'https://247sports.com/PlayerSport/Trace-McSorley-at-Briar-Woods-44495/Embed', 'https://247sports.com/PlayerSport/Michal-Menet-at-Exeter-Township-64019/Embed',
         'https://247sports.com/PlayerSport/Jarvis-Miller-at-Suffield-83643/Embed', 'https://247sports.com/PlayerSport/Shareef-Miller-at-George-Washington-144587/Embed',
         'https://247sports.com/PlayerSport/Michael-Miranda-at-Stow-Munroe-Falls-158099/Embed', 'https://247sports.com/PlayerSport/Ayron-Monroe-at-St-Johns-College-HS-70414/Embed',
         'https://247sports.com/PlayerSport/Justin-Neff-at-Central-Mountain-187338/Embed', 'https://247sports.com/PlayerSport/Amani-Oruwariye-at-Gaither-58873/Embed',
         'https://247sports.com/PlayerSport/Micah-Parsons-at-Harrisburg-201091/Embed', 'https://247sports.com/PlayerSport/John-Petrishen-at-Central-Catholic-72862/Embed',
         'https://247sports.com/PlayerSport/Brandon-Polk-at-Briar-Woods-59446/Embed', './../WebContent/PlayerStats/MarkAllen.html',
         'https://247sports.com/PlayerSport/John-Reid-at-St-Josephs-41896/Embed', 'https://247sports.com/PlayerSport/Miles-Sanders-at-Woodland-Hills-53802/Embed',
         'https://247sports.com/PlayerSport/Nick-Scott-at-Fairfax-49178/Embed', 'https://247sports.com/PlayerSport/Antonio-Shelton-at-Westerville-North-148344/Embed',
         'https://247sports.com/PlayerSport/Tyler-Shoop-at-Father-Ryan-114137/Embed', 'https://247sports.com/PlayerSport/Charlie-Shuman-at-Pittsford-Sutherland-59917/Embed',
         'https://247sports.com/PlayerSport/Michael-Shuster-at-Camp-Hill-63214/Embed', 'https://247sports.com/PlayerSport/Shane-Simmons-at-DeMatha-Catholic-44539/Embed',
         'https://247sports.com/PlayerSport/Zach-Simpson-at-Hollidaysburg-Area-200362/Embed', 'https://247sports.com/PlayerSport/Tommy-Stevens-at-Decatur-Central-68628/Embed',
         'https://247sports.com/PlayerSport/Chris-Stoll-at-St-Francis-De-Sales-196468/Embed', 'https://247sports.com/PlayerSport/Cameron-Sullivan-Brown-at-St-Vincent-Pallotti-151627/Embed',
         'https://247sports.com/PlayerSport/Jonathan-Sutherland-at-Episcopal-147301/Embed', 'https://247sports.com/PlayerSport/Nick-Tarburton-at-Pennridge-187714/Embed',
         'https://247sports.com/PlayerSport/Garrett-Taylor-at-St-Christophers-School-51715/Embed', 'https://247sports.com/PlayerSport/Johnathan-Thomas-at-St-Johns-Prep-55182/Embed',
         'https://247sports.com/PlayerSport/DeAndre-Thompkins-at-Swansboro-49592/Embed', 'https://247sports.com/PlayerSport/CJ-Thorpe-at-Central-Catholic-145597/Embed',
         'https://247sports.com/PlayerSport/Shaka-Toney-at-Imhotep-Institute-70632/Embed', './../WebContent/PlayerStats/MarkAllen.html',
         'https://247sports.com/PlayerSport/Kyle-Vasey-at-Wallenpaupack-Area-109677/Embed', 'https://247sports.com/PlayerSport/Jason-Vranic-at-Erie-CC-171070/Embed',
         'https://247sports.com/PlayerSport/Lamont-Wade-at-Clairton-117321/Embed', './../WebContent/PlayerStats/MarkAllen.html',
         'https://247sports.com/PlayerSport/Justin-Weller-at-Nazareth-Academy-71153/Embed', 'https://247sports.com/PlayerSport/Robert-Windsor-at-Fond-Du-Lac-144616/Embed',
         'https://247sports.com/PlayerSport/Chasz-Wright-at-Milford-Academy-66900/Embed', 'https://247sports.com/PlayerSport/Jake-Zembiec-at-Aquinas-Institute-55606/Embed']

        console.log("playerNameArray.length: " + playerNameArray.length);
        for (i = 1; i < playerNameArray.length; i++) {
            console.log('Adding a player....' + 'at array point: ' + i);
            DatabaseDAO.addSinglePlayer(playerNameArray[i], playerNumArray[i], playerPositionArray[i], playerImageUrlArray[i],
                                          playerClassYearArray[i], playerHometownArray[i], playerHeightWeightArray[i],
                                          playerHighSchoolArray[i], playerExperienceArray[i], playerMajorArray[i], playerRecruitingArray[i]);
            console.log( "Add to DB: " + playerNameArray[i] + " " + playerNumArray[i] + " " + [i]  + "...." );
        }

    }
}

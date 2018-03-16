
//
//  This class will hold a players roster and biographical
//  data that will be pulled from an external website
//
export default class TeamPlayer {

    constructor(name, jerseyNum, position, bioUrl, imageUrl, year, hometown, heightWeight, highschool, experience, major) {

        this.name = name;
        this.position = jerseyNum;
        this.description = position;
        this.position = bioUrl;
        this.description = imageUrl;
        this.position = year;
        this.description = hometown;
        this.position = heightWeight;
        this.description = highschool;
        this.position = experience;
        this.description = major;
    }

}  // end class TeamPlayer
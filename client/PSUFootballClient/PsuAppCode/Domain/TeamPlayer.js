
//
//  This class will hold a players roster and biographical
//  data that will be pulled from an external website
//
export default class TeamPlayer {

    constructor(name, jerseyNum, position, imageUrl, classyear, hometown, heightWeight, highschool, experience, major, recruitURL, statsURL) {

        this.name = name;
        this.jerseyNum = jerseyNum;
        this.position = position;
        this.imageUrl = imageUrl;
        this.classyear = classyear;
        this.hometown = hometown;
        this.heightWeight = heightWeight;
        this.highschool = highschool;
        this.experience = experience;
        this.major = major;
        this.recruitURL = recruitURL;
        this.statsURL = statsURL;
    }

}  // end class TeamPlayer
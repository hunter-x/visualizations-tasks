/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: Adding lat lon to "valid voting result per vc" file
Project: Go to vote
 */
var fs = require('fs');
const VOTING_RESULT = require('./valid voting result per vc.json');
const LAT_LON_VC = require('./registrationAndVc.json') ;
var log_file = fs.createWriteStream(__dirname + '/Final1-votingresult+latlon-vc.json', { flags: 'w' });
//first we loop through the array of 2018 and
for (let i = 0; i < VOTING_RESULT.length; i++) {
    const votingResult = VOTING_RESULT[i];

    console.log(i);
    for (let j = 0; j < LAT_LON_VC.length; j++) {
        const latLonFile = LAT_LON_VC[j];
        //var gov_id2 = element2.gov_id, mun_id2 = element2.mun_id, id2 = element2.id;
        //console.log(votingResult.vc_isie , latLonFile.vc_name);
        if (votingResult.vc_name == latLonFile.vc_name) {
            //RECONSTRUCT lat  lon name_ar  form the source file to our sample
            votingResult.lat = latLonFile.lat
            votingResult.lon = latLonFile.lon
            votingResult.number_of_registered = latLonFile.number_of_registered
         //console.log('match');
        }
        //
    }

}
log_file.write(JSON.stringify(VOTING_RESULT))
//console.log(JSON.stringify(arraySourceNoOverlap).length);
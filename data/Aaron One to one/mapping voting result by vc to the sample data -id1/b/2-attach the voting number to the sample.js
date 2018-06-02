/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: Adding lat lon to "valid voting result per vc" file
Project: Go to vote
 */
var fs = require('fs');
const SAMPLE = require('./SAMPLE ASSIGNED FULL31-03.json');
const VOTINGRESULT = require('./votingresult+latlon-vc-from-the process A.json') ;
var log_file = fs.createWriteStream(__dirname + '/Final2-sample+validVotes.json', { flags: 'w' });
//first we loop through the array of 2018 and
for (let i = 0; i < SAMPLE.length; i++) {
    const sample = SAMPLE[i];

    console.log(i);
    for (let j = 0; j < VOTINGRESULT.length; j++) {
        const votingResult = VOTINGRESULT[j];
        //var gov_id2 = element2.gov_id, mun_id2 = element2.mun_id, id2 = element2.id;
        //console.log(votingResult.vc_isie , latLonFile.vc_name);

        //if ((votingResult.vc_name) ==(sample.center_name_ar)) {
        if ((votingResult.vc_name) ==(sample.center_name_ar))  {
            //RECONSTRUCT lat  lon name_ar  form the source file to our sample
            sample.valid_votes = votingResult.valid_votes;
        }else if(((votingResult.lat) ==(sample.fullLat))&&((votingResult.lon)==(sample.fullLon))){
            sample.valid_votes = votingResult.valid_votes;
        }
        //
    }

}
log_file.write(JSON.stringify(SAMPLE))
//console.log(JSON.stringify(arraySourceNoOverlap).length);
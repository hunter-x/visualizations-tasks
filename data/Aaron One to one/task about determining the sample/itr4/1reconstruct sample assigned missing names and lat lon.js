/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to add more properties to the PC : whether urban or rural
Project: Go to vote
 */
var fs = require('fs');
const ALL_PC = require('./all_PC.json')
const SAMPLE = require('./SAMPLE ASSIGNED (03.29.18).json')
var log_file = fs.createWriteStream(__dirname + '/SAMPLE ASSIGNED FULL.json', { flags: 'w' });
//console.log(delegationData );
//first we loop through the array of 2018 and
for (let i = 0; i < SAMPLE.length; i++) {
    const elementSample = SAMPLE[i];
    var gov_id = elementSample.gov_id, mun_id = elementSample.mun_id, id = elementSample.id;
    //we check to which shape the element belongs
    console.log(i);
    for (let j = 0; j < ALL_PC.length; j++) {
        const element2 = ALL_PC[j];
        var gov_id2 = element2.gov_id, mun_id2 = element2.mun_id, id2 = element2.id;

        if ((gov_id == gov_id2) && (mun_id == mun_id2) && (id == id2)) {
            //RECONSTRUCT lat  lon name_ar  form the source file to our sample
            elementSample.fullLat = element2.lat
            elementSample.fullLon = element2.lon
            elementSample.center_name_ar = element2.center_name_ar
            elementSample.mun_name_ar = element2.mun_name_ar
            elementSample.gov_name_ar = element2.gov_name_ar
            //Reconstruct the RADIUS from the mun registration values that we have in our sample
            let sampleRadius = [450, 500, 550, 600, 800, 1000]
            if ((elementSample.registeredvoters_mun18 >= 1000) ) {
                elementSample.radius = sampleRadius[0]
            } else if ((elementSample.registeredvoters_mun18 >= 800 && elementSample.registeredvoters_mun18 < 1000) ) {
                elementSample.radius = sampleRadius[1]
            } else if ((elementSample.registeredvoters_mun18 >= 600 && elementSample.registeredvoters_mun18 < 800) ) {
                elementSample.radius = sampleRadius[2]
            } else if ((elementSample.registeredvoters_mun18 >= 400 && elementSample.registeredvoters_mun18 < 600) ) {
                elementSample.radius = sampleRadius[3]
            } else if ((elementSample.registeredvoters_mun18 >= 300 && elementSample.registeredvoters_mun18 < 400) ) {
                elementSample.radius = sampleRadius[4]
            } else if ((elementSample.registeredvoters_mun18 >= 200 && elementSample.registeredvoters_mun18 < 300) ) {
                elementSample.radius = sampleRadius[5]
            } else {
                radius = 0
                colorFill = 'black',
                    weight = 0
            }


            break;
        } else {
            elementSample.urbanPer = 'null'
            elementSample.ruralPer = 'null'
        }
        //
    }

}
log_file.write(JSON.stringify(SAMPLE))
//console.log(JSON.stringify(arraySourceNoOverlap).length);
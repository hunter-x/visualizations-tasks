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
    const element = SAMPLE[i];
    var gov_id = element.gov_id, mun_id = element.mun_id, id = element.id;
    //we check to which shape the element belongs
    console.log(i);
    for (let j = 0; j < ALL_PC.length; j++) {
        const element2 = ALL_PC[j];
        var gov_id2 = element2.gov_id, mun_id2 = element2.mun_id, id2 = element2.id;

        if ((gov_id==gov_id2)&&(mun_id==mun_id2)&&(id==id2)) {
            //if the PC inside the shape we add the props of the shape to the PC
            element.fullLat=element2.lat
            element.fullLon=element2.lon
            element.center_name_ar =element2.center_name_ar
            element.mun_name_ar=element2.mun_name_ar
            element.gov_name_ar=element2.gov_name_ar
            
            break;
        }else{
            element.urbanPer='null'
            element.ruralPer='null'
        }
        //
    }

}
log_file.write(JSON.stringify(SAMPLE))
//console.log(JSON.stringify(arraySourceNoOverlap).length);
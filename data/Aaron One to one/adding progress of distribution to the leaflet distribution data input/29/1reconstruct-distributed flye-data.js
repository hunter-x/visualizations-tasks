/* 
Date :28-04-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to track the distribution of the leaflet 
Project: Go to vote
 */
var fs = require('fs');
var stringSimilarity = require('string-similarity');

const ALL_DATA = require('../leaflet-data-input.json')
const DATA26 = require('./Distribution statistics on 04.29.2018')
var log_file = fs.createWriteStream(__dirname + '/result29.json', { flags: 'w' });
let result=[];
//console.log(delegationData );
//first we loop through the array of 2018 and
for (let i = 0; i < DATA26.length; i++) {
    const element = DATA26[i];
    let ecole_name = element.name.replace(/\s/g,'') ;//delete all space from thestring
    let obj = ALL_DATA.find(o => stringSimilarity.compareTwoStrings((o.center_name_ar).replace(/\s/g,''), ecole_name)==1)
    if (obj != undefined) {
        obj.retour = element.retour
        obj.refus = element.refus
    result.push(obj)
    }else{
        console.log(element.name);
    }
    

}
log_file.write(JSON.stringify(result))
//console.log(JSON.stringify(arraySourceNoOverlap).length);
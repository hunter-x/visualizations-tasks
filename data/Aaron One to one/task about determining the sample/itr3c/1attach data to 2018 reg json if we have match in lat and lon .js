/* 
Date :13-03-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to add 2014 parliamentary & presidential data into a specefic 2018 VC w 
Project: Go to vote
 */
var fs = require('fs');
//var arraySource = require('./data200-3000 vc 2018+par14+pres14_mun_en.json')
var arraySource = require('./result_final.json')
//var arrayPar = require('./d-parliamantary 2014 per vc.json')
var arrayPres = require('./d-presidential 2014 per vc.json')
var log_file = fs.createWriteStream(__dirname + '/result_final.json', {flags : 'w'});
//console.log(arraySource);
        //we loop through the array of 2018 data
        var latSrc,longSrc
        arraySource.map((element,i)=>{
            //we get the lat and long
            latSrc = element.lat; longSrc = element.lon
            
            //we loop through the array of Parliamentary
            /* for (let j = 0; j < arrayPar.length; j++) {
                let elementPar = arrayPar[j];
                //and we check every lat and long with what we saved from the source
                if (((elementPar.latitude).slice(0, 7)==latSrc.slice(0, 7)) && ((elementPar.longitude).slice(0, 7)==longSrc.slice(0, 7)) ) {
                    // if we have a match we get the other fields and add them to the Source and then get out of the loop
                    arraySource[i].registeredVoters_par14 = elementPar.registeredVoters;
                    arraySource[i].signingVoters_par14= elementPar.signingVoters;
                    arraySource[i].center_name = elementPar.center_name;
                    break;
                }
            } */

            //we loop through the array of Pres
            for (let j = 0; j < arrayPres.length; j++) {
                let elementPres = arrayPres[j];
                //and we check every lat and long with what we saved from the source
                if (((elementPres.latitude).slice(0, 7)==latSrc.slice(0, 7)) && ((elementPres.longitude).slice(0, 7)==longSrc.slice(0, 7)) ) {
                    // if we have a match we get the other fields and add them to the Source and then get out of the loop
                    arraySource[i].registeredVoters_pres14 = elementPres.registeredVoters;
                    arraySource[i].signingVoters_pres14= elementPres.signingVoters;
                    break;
                }
            }
    })
console.log(arraySource);

log_file.write(JSON.stringify(arraySource))

/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to delete overlaping radius of the voting centers
Project: Go to vote
 */
var fs = require('fs');
var arraySource = require('./data200-3000 vc 2018+par14+pres14.json')
var arraySource2 = require('./data200-3000 vc 2018+par14+pres14.json')
var log_file = fs.createWriteStream(__dirname + '/data200-3000-noOverlap vc 2018+par14+pres14.json', { flags: 'w' });
//first we loop through the array of 2018 and
var toDeleteArr = [];
for (let i = 0; i < arraySource.length; i++) {
    const element = arraySource[i];
    //we take the first point's lat and long and also define it's radius1
    var lat1 = element.lat, lon1 = element.lon, registered18 = element.registeredVoters_mun18, radius, sampleRadius = [400, 450, 500, 550, 600, 650];
    // define it's radius1
    radius = setRadius(registered18, sampleRadius)
    //console.log(radius);log_file.write(JSON.stringify(radius)+' '+registered18+"\n")
   // we delete the element from the 
   //console.log(typeof(arraySource2));
   //rraySource2=arraySource;
     arraySource2.splice(i, 1);
        console.log(arraySource2.length);
     //we check the distance between the chosen point and all the other points
    for (let j = 0; j < arraySource2.length; j++) {
        //console.log(j);
        //we loop through the points of source array again except the chosen point in the exterior loop
        //if (j != i) {
            const element2 = arraySource[j];
            // we get the lat2 and lon2 of the point and also define it's radius2
            var lat2 = element2.lat, lon2 = element2.lon, registered_2_18 = element2.registeredVoters_mun18, radius2, distanceBtweenPoints;
            radius2 = setRadius(registered_2_18, sampleRadius)
            //we measure the distance between the two points
            distanceBtweenPoints = getDistance(lat1, lon1, lat2, lon2)
            //and then see if the distance is smaller than the radius of point 1 + radius of point 2
            if (distanceBtweenPoints <= (radius + radius2)) {
                // if true we push the coord of point 1 and point 2 into delete array
                toDeleteArr.push(element2.id, element.id)
            }
        //}
    }

}

//log_file.write(JSON.stringify(uniq(toDeleteArr)))
toDeleteArr = uniq(toDeleteArr)
//get the final datasource doc without overlaping
var arraySourceNoOverlap = [];

//we loop through the elements of the source data
for (let i = 0; i < arraySource.length; i++) {
    const element = arraySource[i];
    //if the element from Src data dosen't exists in the array to delete we add the data to the final array
    if (toDeleteArr.indexOf(element.id) == -1) {
        arraySourceNoOverlap.push(element)
    }

}
log_file.write(JSON.stringify(arraySourceNoOverlap))
console.log(JSON.stringify(arraySourceNoOverlap).length);


/* get unique values from array */
function uniq(a) {
    return Array.from(new Set(a));
}
/* Seeting the Radius function */
function setRadius(registered18, sampleRadius) {
    if (registered18 >= 1000) {
        return sampleRadius[0]
    } else if (registered18 >= 800 && registered18 < 1000) {
        return sampleRadius[1]
    } else if (registered18 >= 700 && registered18 < 800) {
        return sampleRadius[2]
    } else if (registered18 >= 600 && registered18 < 700) {
        return sampleRadius[3]
    } else if (registered18 >= 500 && registered18 < 600) {
        return sampleRadius[4]
    } else if (registered18 >= 0 && registered18 < 500) {
        return sampleRadius[5]
    } else {
        return 0
    }
}

/*distance between two Points Haversine formula -https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3 */
function rad(x) {
    return x * Math.PI / 180;
};

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

/* console.log(arraySource);

log_file.write(JSON.stringify(arraySource)) */

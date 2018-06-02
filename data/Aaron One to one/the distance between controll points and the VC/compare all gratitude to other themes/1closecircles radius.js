/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to delete overlaping radius of the voting centers
Project: Go to vote
 */
var fs = require('fs');
var arraySource = require('./alltbd.json')
var arraySource2 = require('./AllSaufTBD.json')

var log_file = fs.createWriteStream(__dirname + '/res_1_the_closest_points_to_AllSaufTBD_from_alltbd.json', { flags: 'w' });
//first we loop through the array of Control VC
var result = [];data={}
for (let i = 0; i < arraySource.length; i++) {
    const element = arraySource[i];
    //we take the first point's lat and long  
    var lat1 = element.lat, lon1 = element.lon,radius=element.radius;

     //we check the distance between the chosen point and all the other points
     
    var closestPoint=9999999; // we define a closestpoint to the Control point
     for (let j = 0; j < arraySource2.length-1; j++) {// this is the data of the leaflet not the controll one
        //console.log(j);
        //we loop through the points of source array again except the chosen point in the exterior loop
        //if (j != i) {
            const element2 = arraySource2[j];
            // we get the lat2 and lon2 of the point and also define it's radius2
            if (element2!==undefined) {
                
           
            var lat2 = element2.lat, lon2 = element2.lon, radius2=element2.radius,distanceBtweenPoints ;

            //we measure the distance between the two points
            distanceBtweenPoints = getDistance(lat1, lon1, lat2, lon2)
            if (distanceBtweenPoints==0) {
                console.log(distanceBtweenPoints,lat1, lon1, lat2, lon2);

            }
            //and then see if the distance is smaller than the closest point
            if (distanceBtweenPoints < closestPoint) {
                data = {};
                //the closest point take the value of distance between the two points
                closestPoint=distanceBtweenPoints;
                data.closestPoint=closestPoint;
                data.idOtherThanGrat=element2.id;
                data.idGrat=element.id;
                // if true we push the coord of point 1 and point 2 into delete array
            }
        }
    }
    result.push(data)


}


log_file.write(JSON.stringify(result))
console.log(JSON.stringify(result).length);


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

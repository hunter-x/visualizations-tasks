/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to delete overlaping radius of the voting centers
Project: Go to vote
 */
var fs = require('fs');
var arraySource = require('./the_closest_points_to_control.json')

var log_file = fs.createWriteStream(__dirname + '/number of distance vc minus 1km.json', { flags: 'w' });

//first we loop through the array of closestPoint
var data={},result=[];
for (let i = 0; i < arraySource.length; i++) {
    const element = arraySource[i];
    data={}
    data.idLeaflet=element.idLeaflet;
    data.idControl=element.idControl;
    data.realClosestPoint=element.closestPoint;

    //we take the first distance and see if it's     
    var distanceChart,sampleRadius = [1000, 3000, 5000];
    distanceChart = setDistance(element.closestPoint, sampleRadius)
     //we stock the result in an oobject
     data.closestPoint=distanceChart;


     
   
    result.push(data)


}
//stu^pido u could've done this from the beginning
let dataResult={},resJ=[],type1=0,type2=0,type3=0,type4=0
for (let j = 0; j < result.length; j++) {
    dataResult={}
    const element2 = result[j];
    if (element2.closestPoint==2) {
        type1++;
        dataResult.type='p5';
        dataResult.idControl=element2.idControl;
        dataResult.idLeaflet=element2.idLeaflet;
        dataResult.distance=element2.realClosestPoint;

    }else if(element2.closestPoint==1){
        type2++;
        dataResult.type='p3_5';
        dataResult.idControl=element2.idControl;
        dataResult.idLeaflet=element2.idLeaflet;
        dataResult.distance=element2.realClosestPoint;


    }else if(element2.closestPoint==0){
        type3++;
        dataResult.type='p1_3';
        dataResult.idControl=element2.idControl;
        dataResult.idLeaflet=element2.idLeaflet;
        dataResult.distance=element2.realClosestPoint;


    }else if(element2.closestPoint==-1){
        type4++;
                dataResult.type='p1';
        dataResult.idControl=element2.idControl;
        dataResult.idLeaflet=element2.idLeaflet;
        dataResult.distance=element2.realClosestPoint;
    } 
    resJ.push(dataResult)
}


/* log_file.write(JSON.stringify(type1,type2,type3,type4,dataResult))
console.log(JSON.stringify(result).length); */
log_file.write(JSON.stringify(resJ));
console.log(type1,'p5');
console.log(type2,'p3_5');
console.log(type3,'p1_3');
console.log(type4,'p1');



/* get unique values from array */
function uniq(a) {
    return Array.from(new Set(a));
}
/* Seting the distance function */
//[1000, 3000, 5000]
function setDistance(distanceMesured, sampleRadius) {
    if (distanceMesured >= sampleRadius[2]) {
        return 2
    } else if (distanceMesured >= sampleRadius[1] && distanceMesured < sampleRadius[2]) {
        return 1
    } else if (distanceMesured >= sampleRadius[0] && distanceMesured < sampleRadius[1]) {
        return 0
    } else {
        return -1
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

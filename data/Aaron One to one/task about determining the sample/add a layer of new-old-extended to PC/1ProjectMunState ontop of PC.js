/* 
Date :14-03-18
Developer :Abderrahmen Gharsallah
Task: from Aaron abramov to add more properties to the PC : whether urban or rural
Project: Go to vote
 */
var fs = require('fs');
var arraySource = require('./PC data200-3000- vc 2018+par14+pres+rural+unemployment.json')
var delegationData = require('./AllShapescorrectedMun number.json')
var log_file = fs.createWriteStream(__dirname + '/PC data200-3000- vc 2018+par14+pres+rural+unemployment+state.json', { flags: 'w' });
//console.log(delegationData );
//first we loop through the array of 2018 and
for (let i = 0; i < arraySource.length; i++) {
    const element = arraySource[i];
    var lat = element.lat, lon = element.lon;
    //we check to which shape the element belongs
    console.log(i);
    for (let j = 0; j < delegationData.length; j++) {
        const element2 = delegationData[j];
        var polygon = element2.geometry.coordinates[0][0];
        var point = [lat, lon]
        //console.log(typeof(point));
        /* if (inside(point, polygon)) {
            console.log('true');
        } */
        if (inside([lon, lat], polygon)) {
            //console.log('true************************************');
            //if the PC inside the shape we add the props of the shape to the PC
            var state = element2.properties.state
            element.state=state
            break;
        }else{
            element.state=null
        }
        //

    }

}
log_file.write(JSON.stringify(arraySource))
//console.log(JSON.stringify(arraySourceNoOverlap).length);

/* Determine if a point is in a polygon */
function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
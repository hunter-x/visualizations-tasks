var json2xls = require('../lib/json2xls');
var data = require('./Final2-sample+validVotes.json');
var fs = require('fs');

var xls = json2xls(data,{});


fs.writeFileSync('Final2-sample+validVotes.xlsx',xls, 'binary');
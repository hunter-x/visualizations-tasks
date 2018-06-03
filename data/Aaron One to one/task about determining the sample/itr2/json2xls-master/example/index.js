var json2xls = require('../lib/json2xls');
var data = require('./2-FINAL validVotes-blank-registration-per mun.json');
var fs = require('fs');

var xls = json2xls(data,{});


fs.writeFileSync('2-FINAL validVotes-blank-registration-per mun.xlsx',xls, 'binary');
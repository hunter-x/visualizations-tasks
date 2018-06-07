var json2xls = require('../lib/json2xls');
var data = require('./1-Final Afek election results.json');
var fs = require('fs');

var xls = json2xls(data,{});


fs.writeFileSync('1-Final Afek election results.xlsx',xls, 'binary');
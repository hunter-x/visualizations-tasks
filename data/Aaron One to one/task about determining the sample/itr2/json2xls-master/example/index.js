var json2xls = require('../lib/json2xls');
var data = require('./2-linked_2073mun_to_gov.json');
var fs = require('fs');

var xls = json2xls(data,{});


fs.writeFileSync('2-linked_2073mun_to_gov.xlsx',xls, 'binary');
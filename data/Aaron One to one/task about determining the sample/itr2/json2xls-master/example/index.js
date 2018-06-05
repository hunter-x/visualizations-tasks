var json2xls = require('../lib/json2xls');
var data = require('./clean_deputy_list_rich.json');
var fs = require('fs');

var xls = json2xls(data,{});


fs.writeFileSync('clean_deputy_list_rich.xlsx',xls, 'binary');
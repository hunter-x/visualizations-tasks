var json2xls = require('../lib/json2xls');
var data = require('../spec/PC data200-3000- vc 2018+par14+pres+rural+unemployment+state.json');
var fs = require('fs');

var xls = json2xls(data,{});


fs.writeFileSync('final.xlsx',xls, 'binary');
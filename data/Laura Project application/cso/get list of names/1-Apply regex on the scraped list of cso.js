var fs = require('fs');
var module = require('./0-reg result p3.js')
//console.log(module[0][0].content);
var res = [], obj = {};
var log_file = fs.createWriteStream(__dirname + '/_resP3.txt', { flags: 'w' });

for (let i = 0; i < module.length; i++) {
    var array = module[i]
    for (let j = 0; j < array.length; j++) {
        const element = array[j].content;
        
        if (j == 1) {
            obj.name = element
        } else if (j == 2) {
            obj.type = element
        } else if (j == 3) {
            obj.governorate = element
        } else if (j == 4) {
            obj.phone = element
            res.push(obj);
            obj = {}
        }
    }

}
log_file.write(JSON.stringify(res) + "\n")




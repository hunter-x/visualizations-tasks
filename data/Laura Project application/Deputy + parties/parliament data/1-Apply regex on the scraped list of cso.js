var fs = require('fs');
var module = require('./0-deputy-list-ar.js');
//console.log(module[0][0].content);
var res = [], obj = {};
var log_file = fs.createWriteStream(__dirname + '/_cleaned_deputy_list_ar.txt', { flags: 'w' });
for (let i = 0; i < module.length; i++) {
    var array = module[i];
    for (let j = 0; j < array.length; j++) {
        const element = array[j].content;
        if (j == 1) {
            obj.link = element;
        } 
        if (j == 2) {
            obj.name = element;
        } else if (j == 3) {
            obj.block = element;
        }else if (j == 4) {
            obj.party = element;
        } else if (j == 5) {
            obj.governorate = element;
        }else if (j == 6) {
            obj.gender = element;
        }else if (j == 7) {
            obj.age = element;
        }else if (j == 8) {
            obj.profession = element;
            res.push(obj);
            obj = {};
        }
    }

}
log_file.write(JSON.stringify(res) + "\n")




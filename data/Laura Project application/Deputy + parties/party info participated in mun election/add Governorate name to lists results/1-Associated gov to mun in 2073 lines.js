const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
var log_file = fs.createWriteStream(__dirname + '/linked_2073mun_to_gov.json', { flags: 'w' });

var datagov_mun,partyRes;
var res=[];
let inputFile1='./Governorates_associated to municipality.csv';
let inputFile2='./parties_result.csv';

var parser = parse({delimiter: ';'}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // do something with the line
    datagov_mun=data
    var parser2 = parse({delimiter: ';'}, function (err, data2) {
        async.eachSeries(data, function (line, callback) {
          // do something with the line
          partyRes=data2
          for (let i = 1; i < partyRes.length; i++) {
              const mun_ar_1 = partyRes[i][1];
              for (let j = 0; j < datagov_mun.length; j++) {
                const mun_ar = datagov_mun[j][0];                  
                const gov_en = datagov_mun[j][1];                  
                const gov_ar = datagov_mun[j][2]; 
                if (mun_ar==mun_ar_1) {
                    var obj={};
                    obj.mun_ar=mun_ar_1;
                    obj.gov_en=gov_en;
                    obj.gov_ar=gov_ar;
                    res.push(obj);
                    break;
                }                 
            }
          }
          //console.log(res);
          log_file.write(JSON.stringify(res) + "\n")

        })
      });
      fs.createReadStream(inputFile2).pipe(parser2);

  })
});
fs.createReadStream(inputFile1).pipe(parser);




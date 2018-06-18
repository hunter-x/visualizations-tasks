/* 
Date :18-06-18
Developer :Abderrahmen Gharsallah
Task: Prepare the data for the highchart stacked bar
Project: pp proposal - tunisie election
 */
var fs = require('fs');
var _= require ('lodash') ;
const ALL_RES = require('./0all parties res.json');
const GOV_LIST=["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Le Kef","Mahdia","Manouba","Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]
const PARTY_LIST= ["Afek Tounes","Ajyal","AL IRADA","Beni Watani","Courant Démocrate","El Binaa Al Watani","Ennahdha","La Rencontre Démocratique","L'Initiative","Machrouu Tounes","Mouvement De La Lutte Patriotique","Mouvement Démocrate","Mouvement Démocrate socialiste","Mouvement Du Peuple","Nidaa Tounes","Parti De L'Avenir","Parti Des Verts Pour Le Progrès","Parti Destourien Libre Pdl","Parti Socialiste","Sawt Ettounsi","Tounes Awalan","Union Populaire Républicaine"]
var log_file = fs.createWriteStream(__dirname + '/DATA ARRAY FOR THE STACKED BAR PER GOV.json', { flags: 'w' });
//console.log(delegationData );
//first we loop through the array of results
let RES_per_GOV=[],final_data=[];let array=[]
for (let i = 0; i < GOV_LIST.length; i++) {
    let gov_name = GOV_LIST[i];
    //we get the results of a governorate
    for (let j = 0; j < ALL_RES.length; j++) {
        if (ALL_RES[j].gov_en==gov_name) {
            RES_per_GOV.push(ALL_RES[j])
        }
    }
    //res_per_gov contains the results of a gov
    //now we create for each party the number oof seats it gets
    let seats_number = null;

    for (let k = 0; k < PARTY_LIST.length; k++) {
        let party_name=PARTY_LIST[k]
        //we get all the seats number of the list from the RES array
        //search for the party name in the RES_per_GOV
        let res=_.filter(RES_per_GOV, { 'nom_liste_fr': party_name })
        console.log(res);
        for (let l = 0; l < res.length; l++) {
            seats_number+=parseInt(res[l].sieges_obtenus);            
        }
        //console.log(seats_number);
        array[k]=seats_number;
        
        seats_number=null;
    }
    final_data.push(array);
    array=[]
    //prepare for a newe governorate
    RES_per_GOV=[]

}
//transpose of final data
let newwRes =_.zip(...final_data)
//creat the poobj for the seriees
let obj = {}, res=[]
for (let i = 0; i < PARTY_LIST.length; i++) {
    obj.name=PARTY_LIST[i];
    obj.type='column';
    obj.yAxis=1;
    obj.data=newwRes[i]
    res.push(obj);
    obj={}
}

log_file.write(JSON.stringify(res))

//console.log(JSON.stringify(arraySourceNoOverlap).length);
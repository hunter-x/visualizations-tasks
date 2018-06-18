import React, { Component } from 'react';
import HighchartInit from '../../shared/HighchartInit';
var _ = require('lodash');

//import counterpart from 'counterpart' ;
export default class ResultOverviewSunburst extends Component {
  constructor(props) {
    super(props);
    this.state = { option: {}, load: false }
  }
  componentDidMount() {

    let RES = this.props.partyResultsOfMun, categories = [];
    const PARTY_LIST = ["Afek Tounes", "Ajyal", "AL IRADA", "Beni Watani", "Courant Démocrate", "El Binaa Al Watani", "Ennahdha", "La Rencontre Démocratique", "L'Initiative", "Machrouu Tounes", "Mouvement De La Lutte Patriotique", "Mouvement Démocrate", "Mouvement Démocrate socialiste", "Mouvement Du Peuple", "Nidaa Tounes", "Parti De L'Avenir", "Parti Des Verts Pour Le Progrès", "Parti Destourien Libre Pdl", "Parti Socialiste", "Sawt Ettounsi", "Tounes Awalan", "Union Populaire Républicaine"]

    //sort the data alphabetically
    //arrayOfMun.sort(compare);
    //constructing the data 
    //sorting final RES array
    let arrayOfMun = [], obj = {}, SORTED_ARRAY = []; let sieges_obtenus = 0, listHead = ''
    for (let j = 0; j < RES.length; j++) {

      //get the name of the list head
      for (let k = 0; k < RES[j].length; k++) {
        if (sieges_obtenus < parseInt(RES[j][k].sieges_obtenus)) {
          sieges_obtenus = parseInt(RES[j][k].sieges_obtenus);
          listHead = RES[j][k].nom_liste_fr;
          //console.log('--------', sieges_obtenus, listHead);
        }
      }
      sieges_obtenus = 0// reinstalization for the next municipality

      obj.listHead = listHead
      obj.id = j;
      obj.mun_fr = RES[j][0].mun_fr;
      obj.blanc_per = parseInt(RES[j][0].votes_blancs) * 100 / parseInt(RES[j][0].total_votes_valide).toFixed(3);
      obj.turnout_per = parseInt(RES[j][0].total_votes) * 100 / parseInt(RES[j][0].total_inscrits).toFixed(3);
      obj.party_number = (RES[j].length);
      arrayOfMun.push(obj);
      obj = {}
    }
    //console.log('res', RES);
    /*  ArrayIndex=_.sortBy(arrayOfMun, [function(o) { return o.mun; }]); */
    arrayOfMun.sort(compare);
    //reconstruct sorted array
    for (let k = 0; k < arrayOfMun.length; k++) {
      SORTED_ARRAY[k] = RES[arrayOfMun[k].id]
    }
    //console.log('SORTED_ARRAY', SORTED_ARRAY);
    //prepare data fr categories
    for (let i = 0; i < SORTED_ARRAY.length; i++) {
      categories.push(SORTED_ARRAY[i][0].mun_fr)
    };
    //prepare data for the SERIES result data
    let SeatsArray = []; let array = []
    for (let i = 0; i < SORTED_ARRAY.length; i++) {

      for (let j = 0; j < PARTY_LIST.length; j++) {
        let party_name = PARTY_LIST[j];
        let seats_number = null;
        //we get all the seats number of the list from the RES array
        //search for the party name in the SORTED_ARRAY
        let res = _.filter(SORTED_ARRAY[i], { 'nom_liste_fr': party_name })
        if (res.length > 0) {
          seats_number = parseInt(res[0].sieges_obtenus);
        }
        //console.log(seats_number);
        //i for the municipality position and j for the party position
        array[j] = seats_number;
      }
      SeatsArray.push(array);
      array = []

    }
    let newwRes = _.zip(...SeatsArray)

    //delete null
    let deleted_party_ids = []
    console.log('newwRes', newwRes);
    for (let i = 0; i < newwRes.length; i++) {
      let element = newwRes[i]
      for (let j = 0; j < element.length; j++) {
        if (element[j] !== null) {
          break;
        } else {
          if (j == element.length - 1) {
            //element.splice(j, 1);
            newwRes.splice(i, 1);
            deleted_party_ids.push(i)
          }
        }
      }
    }
    console.log('newwRes', newwRes);

    console.log('deleted_party_ids', deleted_party_ids);
    //delete unused partiees
    console.log('PARTY_LIST',PARTY_LIST);

    for (let i = 0; i < deleted_party_ids.length; i++) {
      console.log('deleted_party_ids[i]',deleted_party_ids[i]);
      PARTY_LIST.splice(deleted_party_ids[i], 1);
    }
    console.log('PARTY_LIST',PARTY_LIST);
    let seriesArr = [], seriesObj = {}
    for (let i = 0; i < PARTY_LIST.length; i++) {
      seriesObj.name = PARTY_LIST[i];
      if (PARTY_LIST[i] == 'Ennahdha') {
        seriesObj.color = 'blue'
      } else if (PARTY_LIST[i] == 'Nidaa Tounes') {
        seriesObj.color = 'red'
      } else if (PARTY_LIST[i] == 'Courant Démocrate') {
        seriesObj.color = 'orange'
      }
      seriesObj.data = newwRes[i]
      seriesArr.push(seriesObj);
      seriesObj = {}
    }
 

    this.setState({

      options: {
        chart: {
          type: 'bar',
          height: '150%'

        },
        title: {
          text: ''
        },
        xAxis: {
          categories: categories,
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Seats number',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' seats'
        },
        plotOptions: {

          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
          shadow: true,
          borderWidth: 1,

        },
        credits: {
          enabled: false
        },
        series: seriesArr
      },
      load: true
    });

  }
  render() {
    return (
      <div>
        {this.state.load == true ?
          <div className='col-md-12' >
            <HighchartInit options={this.state.options} />
          </div>
          : <div className='col-md-12' >
            <h1>Loading...</h1>
          </div>}
      </div>

    );
  }
}
//this sorts out the position of the barchart cards alphabeticallay
function compare(a, b) {
  if (a.mun_fr < b.mun_fr)
    return -1;
  if (a.mun_fr > b.mun_fr)
    return 1;
  return 0;
}
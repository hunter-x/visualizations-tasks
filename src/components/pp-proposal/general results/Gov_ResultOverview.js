import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Nav from '../../shared/Nav';
import TadeemMap from './TadeemMap';
import party_res from './all_parties_res.js'
import mun_to_gov from './Governorates_associated to municipality.js'
import _ from 'lodash';
import ResultItem from './ResultItem';

export default class Gov_ResultOverview extends Component {

  constructor(props) {
    super(props);
    this.state = { mun_name: '', data: [] }
  }

  componentWillMount() {
    //get the name of the gov- start reading from position 13 after /mun-results/
    let RES = [];
    let chosenGov = (this.props.location.pathname).substring(13);

    //get all the municipalities of a certain gov
    var munsOfGov = _.filter(mun_to_gov, function (o) { return o.GOV_EN == chosenGov; });

    //get results of specified municipalities from the result array
    for (let i = 0; i < munsOfGov.length; i++) {
      const MunNameAr = munsOfGov[i].NAME_AR;
      RES.push(_.filter(party_res, function (o) { return o.map_names_ar == MunNameAr; }))
    }
    //sorting final RES array
    let arrayOfMun= [],obj= {},SORTED_ARRAY=[]
    for (let j = 0; j < RES.length; j++) {
      obj.id=j;
      obj.mun_fr=RES[j][1].mun_fr;
      arrayOfMun.push(obj);
      obj={}
    }
   /*  ArrayIndex=_.sortBy(arrayOfMun, [function(o) { return o.mun; }]); */
    arrayOfMun.sort(compare);
    console.log(arrayOfMun);

    //reconstruct sorted array
    for (let k = 0; k < arrayOfMun.length; k++) {
      SORTED_ARRAY[k]=RES[arrayOfMun[k].id]
    }
    this.setState({ data: SORTED_ARRAY, mun_name: chosenGov });
  }

  componentDidMount() {
    (function () {
      var $body = document.body
        , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

      if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
          $body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
        });
      }

    }).call(this);
  }

  render() {
    const TITLE = <Translate type='text' content='mun_res_box.title' />//...Governorate result

    return (
      <div id="content">
        <div className="menu-trigger"></div>
        <div className="site-content" style={{ marginBottom: '5vh' }}>
          <h1 className="site-content__headline">{(this.props.location.pathname).substring(13)}{TITLE}</h1>
        </div>
        <div className='col-md-9'  >
          {
            (this.state.data).map((object, i) =>
              <ResultItem
                key={i}
                mun_name={object[0].mun_fr}
                turnout={((object[0].total_votes*100)/object[0].total_inscrits).toFixed(2)}
                blank={((object[0].votes_blancs*100)/object[0].total_votes_valide).toFixed(2)}
              />
            )
          }

        </div>

      </div>
    );
  }
}
//lodash _sortBy disn't want to sort
function compare(a,b) {
  if (a.mun_fr < b.mun_fr)
    return -1;
  if (a.mun_fr > b.mun_fr)
    return 1;
  return 0;
}
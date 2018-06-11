import React, { Component } from 'react';
import Translate from 'react-translate-component';
import party_res from './all_parties_res.js'
import mun_to_gov from './Governorates_associated to municipality.js'
import _ from 'lodash';
import ResultItem from './ResultItem';
import { Link} from 'react-router-dom';

export default class Gov_ResultOverview extends Component {

  constructor(props) {
    super(props);
    this.state = { mun_name: '', data: [] }
  }

  componentWillMount() {
    //get the name of the gov- start reading from position 13 after /mun-results/
    let RES = [];
    let chosenGov = (this.props.location.pathname).substring(13);
    console.log(chosenGov);
    //get all the municipalities of a certain gov
    var munsOfGov = _.filter(mun_to_gov, function (o) { return o.GOV_EN == chosenGov; });
    console.log(munsOfGov);
    //get results of specified municipalities from the result array
    for (let i = 0; i < munsOfGov.length; i++) {
      const MunNameAr = munsOfGov[i].NAME_AR;
      RES.push(_.filter(party_res, function (o) { return o.map_names_ar == MunNameAr; }))
    }
    //sorting final RES array
    let arrayOfMun = [], obj = {}, SORTED_ARRAY = []
    for (let j = 0; j < RES.length; j++) {
      obj.id = j;
      obj.mun_fr = RES[j][0].mun_fr;
      arrayOfMun.push(obj);
      obj = {}
    }
    /*  ArrayIndex=_.sortBy(arrayOfMun, [function(o) { return o.mun; }]); */
    arrayOfMun.sort(compare);

    //reconstruct sorted array
    for (let k = 0; k < arrayOfMun.length; k++) {
      SORTED_ARRAY[k] = RES[arrayOfMun[k].id]
    }
    console.log(SORTED_ARRAY);

    this.setState({ data: SORTED_ARRAY, mun_name: chosenGov });
  }

  render() {
    const TITLE = <Translate type='text' content='mun_res_box.title' />//...Governorate result

    return (
      <div id="contentBlog">
        <div className="menu-trigger"><Link to="/mun-results">
          <button className="btn success" >Back</button>
        </Link></div>
        
        <div className="site-content" style={{ marginBottom: '5vh' }}>
          <h1 className="site-content__headline">{(this.props.location.pathname).substring(13)}{TITLE}</h1>
        </div>
        <div className='col-md-9'  >
          {
            (this.state.data).map((object, i) =>
              <ResultItem
                key={i}
                data={this.state.data[i]}
                mun_name={object[0].mun_fr}
                turnout={((object[0].total_votes * 100) / object[0].total_inscrits).toFixed(2)}
                blank={((object[0].votes_blancs * 100) / object[0].total_votes_valide).toFixed(2)}
              />
            )
          }
        </div>
        <div className='col-md-3 article'>
        <div className='blog-item' style = {{position:'fixed', width:'20%', textAlign:'center'}}>
        <div className='text-margin-top'><h4 style={{ display: 'inline' }} >number of Municipalities:</h4>  <h4  className="subheaderTitle inline"> {(this.state.data).length} </h4></div>
        <div className='text-margin-top'><h4 style={{ display: 'inline' }} >Filter:</h4>  <h4  className="subheaderTitle inline"> _under_dev</h4></div>
        </div>
        
        </div>

      </div>
    );
  }
}
//lodash _sortBy disn't want to sort
function compare(a, b) {
  if (a.mun_fr < b.mun_fr)
    return -1;
  if (a.mun_fr > b.mun_fr)
    return 1;
  return 0;
}
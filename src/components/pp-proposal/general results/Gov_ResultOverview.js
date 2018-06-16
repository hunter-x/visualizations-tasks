import React, { Component } from 'react';
import Translate from 'react-translate-component';
import party_res from './all_parties_res.js'
import mun_to_gov from './Governorates_associated to municipality.js'
import _ from 'lodash';
import ResultItem from './ResultItem';
import { Link } from 'react-router-dom';

export default class Gov_ResultOverview extends Component {

  constructor(props) {
    super(props);
    this.state = { mun_name: '', data: [], filter: 'alphab', checked: [true, false, false, false, false, false, false] }
  }
  //prepare the data
  componentWillMount() {
    //get the name of the gov- start reading from position 13 after "/mun-results/"
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
    let arrayOfMun = [], obj = {}, SORTED_ARRAY = [];let sieges_obtenus=0,listHead=''
    for (let j = 0; j < RES.length; j++) {
      
      //get the name of the list head
      for (let k = 0; k < RES[j].length; k++) {
          if (sieges_obtenus<parseInt(RES[j][k].sieges_obtenus)) {
          sieges_obtenus=parseInt(RES[j][k].sieges_obtenus);
          listHead=RES[j][k].nom_liste_fr;
          console.log('--------',sieges_obtenus,listHead);
        }        
      }
      sieges_obtenus=0// reinstalization for the next municipality

      obj.listHead=listHead
      obj.id = j;
      obj.mun_fr = RES[j][0].mun_fr;
      obj.blanc_per = parseInt(RES[j][0].votes_blancs) * 100 / parseInt(RES[j][0].total_votes_valide).toFixed(3);
      obj.turnout_per = parseInt(RES[j][0].total_votes) * 100 / parseInt(RES[j][0].total_inscrits).toFixed(3);
      obj.party_number = (RES[j].length);
      arrayOfMun.push(obj);
      obj = {}
    }
    console.log('res', RES);
    /*  ArrayIndex=_.sortBy(arrayOfMun, [function(o) { return o.mun; }]); */
    arrayOfMun.sort(compare);

    //reconstruct sorted array
    for (let k = 0; k < arrayOfMun.length; k++) {
      SORTED_ARRAY[k] = RES[arrayOfMun[k].id]
    }
    console.log(SORTED_ARRAY);

    this.setState({ data: SORTED_ARRAY, mun_name: chosenGov, readyForSortRes: arrayOfMun, initialDataArray: RES });
  }
  handleRadioFilter(filter, e) {
    console.log(e.target.value);
    console.log(filter);
    let checked = [false, false, false, false, false, false, false];
    checked[parseInt(e.target.value)] = true;
    //when user clicks on the radiobutton we update the mapkey,grades and set back the filter values to default
    this.setState({ filter, checked });
    //Logic for the filter
    let { readyForSortRes, initialDataArray } = this.state;
    let SORTED_ARRAY = [];
    if (filter == 'turnout') {
      //apply turnout filter
      readyForSortRes.sort(compare_turnout);
    } else if (filter == 'blanc') {
      readyForSortRes.sort(compare_blanc);
    } else if (filter == 'alphab') {
      readyForSortRes.sort(compare);
    } else if (filter == 'more') {
      readyForSortRes.sort(compare_list_number);
    } else if (filter == 'nahdha_res') {
      console.log('readyForSortRes',readyForSortRes);
      console.log('initialDataArray',initialDataArray);
      // loop through the data and delete the data that contains the
      readyForSortRes.sort(listHeadNahdha);

    } else if (filter == 'nida_res') {
      readyForSortRes.sort(listHeadNida);

    } else if (filter == 'other_res') {
      readyForSortRes.sort(listHeadOther);

    }
    //reconstruct sorted array
    for (let k = 0; k < readyForSortRes.length; k++) {
      SORTED_ARRAY[k] = initialDataArray[readyForSortRes[k].id]
    }
    this.setState({ data: SORTED_ARRAY });

  }
  render() {
    const TITLE = <Translate type='text' content='mun_res_box.title' />//Governorate result
    const SORT = <Translate type='text' content='mun_res_box.sort' />//Sort
    const NUMBER_OF_MUN = <Translate type='text' content='mun_res_box.mun_number' />//number of Municipalities
    const TURNOUT = <Translate type='text' content='mun_res_box.turnout' />//Turnout
    const BLANK = <Translate type='text' content='mun_res_box.blank' />//Blank
    const ALPHAB = <Translate type='text' content='mun_res_box.alphab' />//Alphabetically
    const MORE = <Translate type='text' content='mun_res_box.more' />//more
    const NAHDHA = <Translate type='text' content='mun_res_box.nahdha' />//nahdha
    const NIDAA = <Translate type='text' content='mun_res_box.nida' />//nida
    const OTHER = <Translate type='text' content='mun_res_box.other' />//other

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
          <div className='blog-item' style={{position:'fixed'}} >
            <div className='text-margin-top '><h4 style={{ display: 'inline' }} >{NUMBER_OF_MUN}:</h4>  <h4 className="subheaderTitle inline"> {(this.state.data).length} </h4></div>

            <div className='text-margin-top'><h4  >{SORT}:</h4>

              <div className="md-radio " style={{ margin: '10px 0' }}>
                <input id="0" type="radio" name="alphab" value={0} onClick={this.handleRadioFilter.bind(this, 'alphab')} checked={this.state.checked[0]} />
                <label htmlFor="0">{ALPHAB}</label>
              </div>

              <div className="md-radio " >
                <input id="1" type="radio" name="turnout" value={1} onClick={this.handleRadioFilter.bind(this, 'turnout')} checked={this.state.checked[1]} />
                <label htmlFor="1">{TURNOUT}</label>
              </div>
              <div className="md-radio " style={{ margin: '10px 0' }}>
                <input id="2" type="radio" name="blanc" value={2} onClick={this.handleRadioFilter.bind(this, 'blanc')} checked={this.state.checked[2]} />
                <label htmlFor="2">{BLANK}</label>
              </div>
              <hr />
              <div className="md-radio " style={{ margin: '10px 0' }}>
                <input id="3" type="radio" name="more" value={3} onClick={this.handleRadioFilter.bind(this, 'more')} checked={this.state.checked[3]} />
                <label htmlFor="3">{MORE}</label>
              </div>
              <hr />
              <div className="md-radio " style={{ margin: '10px 0' }}>
                <input id="4" type="radio" name="nahdha_res" value={4} onClick={this.handleRadioFilter.bind(this, 'nahdha_res')} checked={this.state.checked[4]} />
                <label htmlFor="4">{NAHDHA}</label>
              </div>
              <div className="md-radio " style={{ margin: '10px 0' }}>
                <input id="5" type="radio" name="nida_res" value={5} onClick={this.handleRadioFilter.bind(this, 'nida_res')} checked={this.state.checked[5]} />
                <label htmlFor="5">{NIDAA}</label>
              </div>
              <div className="md-radio " style={{ margin: '10px 0' }}>
                <input id="6" type="radio" name="other_res" value={6} onClick={this.handleRadioFilter.bind(this, 'other_res')} checked={this.state.checked[6]} />
                <label htmlFor="6">{OTHER}</label>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
//lodash _sortBy disn't want to sort
//this sorts out the position of the barchart cards alphabeticallay
function compare(a, b) {
  if (a.mun_fr < b.mun_fr)
    return -1;
  if (a.mun_fr > b.mun_fr)
    return 1;
  return 0;
}
//filter by Turnout -- ccheck the array -- from big to small
function compare_turnout(a, b) {
  if (a.turnout_per > b.turnout_per)
    return -1;
  if (a.turnout_per < b.turnout_per)
    return 1;
  return 0;
}
function compare_blanc(a, b) {
  if (a.blanc_per > b.blanc_per)
    return -1;
  if (a.blanc_per < b.blanc_per)
    return 1;
  return 0;
}
function compare_list_number(a, b) {
  if (a.party_number > b.party_number)
    return -1;
  if (a.party_number < b.party_number)
    return 1;
  return 0;
}
function listHeadNahdha(a) {
  if (a.listHead == 'Ennahdha')
    return -1;
  if (a.listHead != 'Ennahdha')
    return 1;
  return 0;
}
function listHeadNida(a) {
  if (a.listHead == 'Nidaa Tounes')
    return -1;
  if (a.listHead != 'Nidaa Tounes')
    return 1;
  return 0;
}
function listHeadOther(a) {
  if ((a.listHead != 'Ennahdha')&&(a.listHead != 'Nidaa Tounes'))
    return -1;
  else
    return 1;
  return 0;
}
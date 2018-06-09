import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import axios from 'axios';
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey';
import { FormGroup, FormControl, Form, Radio } from 'react-bootstrap';

import Translate from 'react-translate-component';
import { transparent } from 'material-ui/styles/colors';

export default class PartyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeIsLoaded: false, shape: config.initShape, key: 1,
      filter: 'perVotes', checked: [true, false],
      keyTitle: 'Results per votes percentage', partyName: 'Ennahdha',
      nom: '', results_Percentage: '', turnout: '', blank_per: '', deputy: '', seats_num: '',
      percentageSign: ' %', maxFilter: 60, minFilter: 0, munFilter: 'all', activeFilter: 'none', grades: []
    }
  }
  componentWillMount() {
    let qString = `${config.apiUrl}/api/shape/mun_${this.props.shapeToSelect}_election_res`;
      console.log(qString);
      axios({
        method: 'get',
        url: qString,
        headers: {
          'name': 'Isie',
          'password': 'Isie@ndDi',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },

      })
        .then(response => {
          console.log(response);
          this.setState({ shape: JSON.parse(response.data.data), shapeIsLoaded: true });
        })
        .catch(function (error) {
          console.log(error);
        });
    //don't know why did this cause u can use props directly ????- it's a sort of initialization
    if (this.state.filter == 'perVotes') {
      this.setState({ grades: this.props.grades_votes, partyName: this.props.partyName });
    } else {
      this.setState({ grades: this.props.grades_seats, partyName: this.props.partyName });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps, 'this.state.partyName: ', this.state.partyName);
    // this is done so that  whenever user changes the select option We reset all properties to initial
    //we also set back the filter values to default 
    if (nextProps.partyName != this.state.partyName) {
      console.log('nnnnextProps.grades_votes', nextProps.grades_votes);
      this.setState({
        partyName: nextProps.partyName, keyTitle: this.state.keyTitle, keyTitle: 'Results per votes percentage', filter: 'perVotes',
        grades: nextProps.grades_votes, checked: [true, false], minFilter: 0, maxFilter: 60, munFilter: 'all', activeFilter: 'none',
        shapeIsLoaded: false
      });
    }

    let qString = `${config.apiUrl}/api/shape/mun_${nextProps.shapeToSelect}_election_res`;
    console.log(qString);
    axios({
      method: 'get',
      url: qString,
      headers: {
        'name': 'Isie',
        'password': 'Isie@ndDi',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },

    })
      .then(response => {
        console.log(response.data);
        this.setState({ shape: JSON.parse(response.data.data), shapeIsLoaded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  getColorRegElg(d, c1, grades, state, AssociatedParty) {
    //if active filter is true then user has changed values in the input so we do special Style

    //if filter is "result" then we filter according to the min and max filter values
    if (this.state.activeFilter == 'result') {
      if (AssociatedParty != this.props.partyName) { return '#F2F2F0' }
      else if (d < this.state.minFilter || d > this.state.maxFilter) { return '#F2F2F0' }
      else if (d > grades[2]) { return (c1[3]); }
      else if (d > grades[1]) { return (c1[2]); }
      else if (d > grades[0]) { return (c1[0]); }
      else { return '#F2F2F0' }
    }
    //if filter is "munTypeFilter"- then we only show the mun that are new|old|extended while keeping the colors of course
    else if (this.state.activeFilter == 'munTypeFilter') {
      //the state from the map matches the one chosen by the use inn the select option we diliver normal color else grey
      if (this.state.munFilter == state) {
        if (AssociatedParty != this.props.partyName) { return '#F2F2F0' }
        else if (d > grades[2]) { return (c1[3]); }
        else if (d > grades[1]) { return (c1[2]); }
        else if (d > grades[0]) { return (c1[0]); }
        else { return '#F2F2F0' }
      } else {
        return '#F2F2F0'
      }
    } else {
      //console.log(AssociatedParty,' || ',this.props.partyName);
      if (this.props.partyName != AssociatedParty) {
        return '#F2F2F0'
      }

      else if (d > grades[2]) { return (c1[3]); }
      else if (d > grades[1]) { return (c1[2]); }
      else if (d > grades[0]) { return (c1[0]); }
      else { return '#F2F2F0' }
    }

  }

  style(feature) {
    const property = feature.properties;

    // if the radio button filter is per result paint the map selon a certain prop Sinon paint selon another property
    if (this.state.filter == 'perVotes') {
      let PROPERTY = parseInt(property.votes_obtenus * 100 / property.total_votes_valide);
      let STATE = property.state;
      let SHAPE_PARTY;
      (property.nom_liste_fr == undefined) ? SHAPE_PARTY = this.props.partyName : SHAPE_PARTY = property.nom_liste_fr;
      return {
        fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], this.state.grades, STATE, SHAPE_PARTY),
        weight: 1.2,
        opacity: 0.9,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.9
      }
    } else if (this.state.filter == 'perSeats') {
      let PROPERTY = parseInt(property.sieges_obtenus);
      let STATE = property.state;
      let SHAPE_PARTY;
      (property.nom_liste_fr == undefined) ? SHAPE_PARTY = this.props.partyName : SHAPE_PARTY = property.nom_liste_fr;
      return {
        fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], this.state.grades, STATE, SHAPE_PARTY),
        weight: 1.2,
        opacity: 0.9,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.9
      }
    }

  }

  styleGovLimiter(feature) {
    return {
      fillColor: 'none',
      weight: 2.5,
      opacity: 2,
      color: 'black',
      dashArray: '3',
      fillOpacity: 1
    };
  }

  highlightFeature(e) {
    const layer = e.target;
    const property = e.target.feature.properties;

    const turnout = (property.total_votes * 100 / property.allreg_sum).toFixed(2);
    const blank_per = (property.votes_blancs * 100 / property.total_votes).toFixed(2);
    const results_Percentage = (property.votes_obtenus * 100 / property.total_votes_valide).toFixed(2);
    const seats_per = (property.sieges_obtenus * 100 / property.chair).toFixed(2);
    const seats_num = property.sieges_obtenus;
    const state = property.state;
    const deputy = property.deputy;
    this.setState({
      nom: property.NAME_EN, destroy: false, deputy: property.deputy, nom_gov: property.GOV_EN,
      turnout: isNaN(turnout) ? 'None' : turnout + ' %',
      blank_per: isNaN(blank_per) ? 'None' : blank_per + ' %',
      results_Percentage: isNaN(results_Percentage) ? 'None' : results_Percentage + ' %'
      , seats_num: (isNaN(seats_num) || seats_num == undefined) ? 'None' : seats_num,
      state, deputy
    });
    return layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 1
    });
  }

  resetFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5
    });
    this.setState({ destroy: true });
  }

  handleRadioFilter(filter, e) {
    let checked = [false, false];
    checked[parseInt(e.target.value)] = true;
    //when user clicks on the radiobutton we update the mapkey,grades and set back the filter values to default
    this.setState({ filter, checked, activeFilter: 'none' });
    if (filter == 'perVotes') {
      this.setState({ grades: this.props.grades_votes, keyTitle: 'Results per votes percentage', percentageSign: ' %', minFilter: 0, maxFilter: 60, munFilter: 'all', activeFilter: 'none' });
    } else if (filter == 'perSeats') {
      this.setState({ grades: this.props.grades_seats, keyTitle: 'Results per seats number', percentageSign: '', minFilter: 0, maxFilter: 60, munFilter: 'all', activeFilter: 'none' });
    }

  }
  //if active filter is true then user has changed values in the input and then style should be adapted accordingly 
  handleMaxFilter(e) {
    this.setState({ maxFilter: e.target.value, activeFilter: 'result', munFilter: 'all' });
  }
  handleMinFilter(e) {
    this.setState({ minFilter: e.target.value, activeFilter: 'result', munFilter: 'all' });
  }
  handleMunType(e) {
    //console.log(e.target.value);
    // if the filter value is all we act as the filter don't exist 
    if (e.target.value == 'all') {
      this.setState({ activeFilter: 'result' });
    } else {
      this.setState({ munFilter: e.target.value, activeFilter: 'munTypeFilter', minFilter: 0, maxFilter: 60 });
    }

  }
  render() {
    // console.log(dataSport);
    const VOTES_PER = <Translate type='text' content='partySheet.VOTES_PER' />//votes percentage 
    const TURNOUT = <Translate type='text' content='MunTurnoutMap.TURNOUT' />//Turnout
    const BLANKVOTES = <Translate type='text' content='tadeemMap.BLANKVOTES' />//Blank Votes
    const SEATS_NUMBER = <Translate type='text' content='partySheet.SEATS_NUMBER' />//Seats number 
    const SEAT_RES = <Translate type='text' content='partySheet.SEAT_RES' />//Results per votes
    const VOTES_RES = <Translate type='text' content='partySheet.VOTES_RES' />//Results per seats

    const ALL = <Translate type='text' content='partySheet.All' />//All
    const OLD = <Translate type='text' content='partySheet.Old' />//Old
    const EXTENDED = <Translate type='text' content='partySheet.extended' />//extended
    const NEW = <Translate type='text' content='partySheet.New' />//New

    const FILTER_RES = <Translate type='text' content='partySheet.filter_Result' />//Filter result between :
    const FILTER_RES_MUN = <Translate type='text' content='partySheet.filter_Result_Mun' />//Filter result per Mun. Type  :
    const CONTROL = <Translate type='text' content='partySheet.control_map' />//Control the map

    const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info
    const LOADING = <Translate type='text' content='map.loading' />//Loading Map
    return (
      <div className="topMap">
        {this.state.shapeIsLoaded ? <Map maxZoom={9} center={[34.79, 9.5]} scrollWheelZoom={false} zoom={7} minZoom={5} style={{ height: "95vh", width: "100%", position: "relative" }}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
          />

          <GeoJSON
            key={this.props.shapeToSelect + this.props.grades}
            data={this.state.shape}
            style={this.style.bind(this)}
            onEachFeature={
              (feature, layer) => {
                layer.on({ mouseover: this.highlightFeature.bind(this) });
                layer.on({ mouseout: this.resetFeature.bind(this) });
              }
            }
          >
            <Tooltip direction="bottom" className="leafletTooltip" sticky={true} >
              <div>
                <h3 style={{ textAlign: 'center' }}>{this.state.nom}</h3>
                {this.state.filter == 'perVotes' ? <h4>{VOTES_PER} : {this.state.results_Percentage} </h4> : <h4>{SEATS_NUMBER} : {this.state.seats_num} </h4>}
                <h4>{BLANKVOTES} : {(this.state.blank_per)} </h4>
                <h4>{TURNOUT} : {(this.state.turnout)} </h4>
                <h4>mun. type : {(this.state.state)} </h4>
                <h4>deputy : {(this.state.deputy)} </h4>
              </div>
            </Tooltip>
          </GeoJSON>
          <GeoJSON
            key={'b' + this.props.shapeToSelect}
            data={G_munElec_gov}
            style={this.styleGovLimiter.bind(this)}
          />
          <Control position="topright" >
            <h5>{HOVER}</h5>
          </Control>
          <Control position="bottomright" >
            <MapKey grades={this.state.grades} percentageSign={this.state.percentageSign} keyTitle={this.state.keyTitle} colorSet={["#ffffcc", "#c2e699", "#78c679", "#238443"]} key={this.state.filter} />
          </Control>

          <Control position="topleft"  >
            <div className="col-lg-12 col-sm-2 col-sm-offset-2 col-lg-offset-1">
              <div className="well MenuShadow SideMenuePosition info-card-font">
                <h6 className='center'>{CONTROL}</h6>
                <section className='row col-md-12' >

                  <div className="md-radio md-radio-inline" style={{ margin: '10px 0' }}>
                    <input id="3" type="radio" name="g2" value={0} onClick={this.handleRadioFilter.bind(this, 'perVotes')} checked={this.state.checked[0]} />
                    <label htmlFor="3">{SEAT_RES}</label>
                  </div>

                  <div className="md-radio md-radio-inline" style={{ margin: '10px 0' }}>
                    <input id="4" type="radio" name="g2" value={1} onClick={this.handleRadioFilter.bind(this, 'perSeats')} checked={this.state.checked[1]} />
                    <label htmlFor="4">{VOTES_RES}</label>
                  </div>
                </section>

                <section className='row col-md-12 '  >
                  <p style={{ color: '#000' }} >{FILTER_RES} </p>
                  <input type="number" onChange={this.handleMinFilter.bind(this)} value={this.state.minFilter} min={0} className='filterResultInput' />{this.state.percentageSign}
                  &nbsp;&nbsp; <span style={{ color: 'red' }}> &</span> &nbsp;
                  <input type="number" onChange={this.handleMaxFilter.bind(this)} value={this.state.maxFilter} min={1} className='filterResultInput' />{this.state.percentageSign}
                </section>

                <section className='row col-md-12 '  >
                  <p style={{ color: '#000' }} >{FILTER_RES_MUN} </p>
                  <FormGroup controlId="typeOfAssoc" onChange={this.handleMunType.bind(this)}  >
                    <FormControl componentClass="select" placeholder="All" value={this.state.munFilter} >
                      <option value="" disabled >Select</option>
                      <option value="all">All</option>
                      <option value="new"> New</option>
                      <option value="extended">Extended </option>
                      <option value="old">Old </option>
                    </FormControl>
                  </FormGroup>
                </section>

              </div>
            </div>
          </Control>

        </Map> :
          <div>
            <div className="col-md-5"></div>
            <div className="col-md-5" style={{ marginTop: "20vh" }}>
              <h2>{LOADING}</h2>
              <div style={{ marginLeft: "70px" }}>
                <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
              </div>
            </div>
          </div>

        }
      </div>

    );
  }
}


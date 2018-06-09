import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import axios from 'axios';
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey';

import './MunTurnoutMap.css'
import Translate from 'react-translate-component';
import { transparent } from 'material-ui/styles/colors';

export default class MunTurnoutMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeIsLoaded: false, shape: config.initShape,shape_gov: config.initShape, key: 1,
      filter: 'govLevel', checked: [true, false],
      grades: [0, 34, 38], keyTitle: 'Turnout Percentage',
      nom: '', total_votes: '', allreg_sum: '', turnout: '',
      dataName:'G_munElec_gov'
    }
  }
  componentWillMount() {
    let qString = `${config.apiUrl}/api/shape/mun_munelection_valid_blank_reg`;
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
        this.setState({ shape_mun: JSON.parse(response.data.data), shapeIsLoaded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
      let qString2 = `${config.apiUrl}/api/shape/gov_munelection_valid_blank_reg`;
      axios({
        method: 'get',
        url: qString2,
        headers: {
          'name': 'Isie',
          'password': 'Isie@ndDi',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
    
      })
        .then(response => {
          this.setState({ shape:JSON.parse(response.data.data),shape_gov: JSON.parse(response.data.data), shapeIsLoaded: true });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  handleRadioFilter(filter, e) {
    let checked = [false, false];
    checked[parseInt(e.target.value)] = true;

    if (filter == 'govLevel') {
      this.setState({shape:this.state.shape_gov ,grades:[0, 34, 38],filter,checked});
    } else if (filter == 'munLevel') {
      this.setState({shape:this.state.shape_mun,grades:[0, 34, 38],filter,checked});
    } 
  }

  getColorRegElg(d, c1, grades) {
    //console.log(d, c1, grades);
    if (d > grades[2]) { return (c1[3]); }
    else if (d > grades[1]) { return (c1[2]); }
    /* else if (d > grades[0]) { return (c1[1]); } */
    else { return (c1[0]); }
  }

  style(feature) {
    let PROPERTY = parseInt(feature.properties.total_votes * 100 / feature.properties.allreg_sum);
    let GRADES = [0, 34, 38];
    if (this.state.filter=='govLevel') {
      console.log('govlevel');
      return {
        fillColor: this.getColorRegElg(PROPERTY, ["#ffffcc", "#c2e699", "#78c679", "#238443"], GRADES),
        weight: 2.5,
        opacity: 2,
        color: 'black',
        dashArray: '3',
        fillOpacity: 1
      };
    }else if (this.state.filter=='munLevel'){
      return {
        fillColor: this.getColorRegElg(PROPERTY, ["#ffffcc", "#c2e699", "#78c679", "#238443"], GRADES),
        weight: 1.2,
        opacity: 0.9,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.9
      };
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
    console.log(property);
    this.setState({
      nom: property.NAME_EN, destroy: false, total_votes: property.total_votes, allreg_sum: property.allreg_sum, turnout: ((property.total_votes * 100) / property.allreg_sum).toFixed(2)
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

  render() {
    // console.log(dataSport);
    const GOV = <Translate type='text' content='box.gov' />//Governorate level
    const MUN = <Translate type='text' content='box.mun' />//Municipality level
    const REGISTRATION = <Translate type='text' content='MunTurnoutMap.REGISTRATION' />//REGISTRATION
    const TURNOUT = <Translate type='text' content='MunTurnoutMap.TURNOUT' />//TURNOUT
    const TOTALVOTES = <Translate type='text' content='MunTurnoutMap.TOTALVOTES' />//TOTAL VOTES

    const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info
    const LOADING = <Translate type='text' content='map.loading' />//Loading Map
    return (
      <div className='container'>
        <section className='row col-md-12' >

          <div className="md-radio md-radio-inline">
            <input id="3" type="radio" name="g2" value={0} onClick={this.handleRadioFilter.bind(this, 'govLevel')} checked={this.state.checked[0]} />
            <label htmlFor="3">{GOV}</label>
          </div>

          <div className="md-radio md-radio-inline">
            <input id="4" type="radio" name="g2" value={1} onClick={this.handleRadioFilter.bind(this, 'munLevel')} checked={this.state.checked[1]} />
            <label htmlFor="4">{MUN}</label>
          </div>
        </section>
        {this.state.shapeIsLoaded ? <Map maxZoom={9} center={[34.79, 10.18]} scrollWheelZoom={false} zoom={7} minZoom={5} style={{ height: "95vh", width: "81vw", position: "relative", zIndex: this.props.mapZIndex, backgroundColor: "white" }}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
          />

          <GeoJSON
            key={"a" + this.state.filter}
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
                <h4>{TURNOUT} : {this.state.turnout} %</h4>
                <h4>{REGISTRATION} : {commaNum(this.state.allreg_sum)} </h4>
                <h4>{TOTALVOTES} : {commaNum(this.state.total_votes)} </h4>
              </div>
            </Tooltip>
          </GeoJSON>

          <GeoJSON
            key={"b" + this.state.filter}
            data={this.state.shape_gov}
            style={this.styleGovLimiter.bind(this)}
           
          />

          <Control position="topright" >
            <h5>{HOVER}</h5>
          </Control>
          <Control position="bottomright" >
            <MapKey grades={this.state.grades} colorSet={["#ffffcc", "#c2e699", "#78c679", "#238443"]} keyTitle={this.state.keyTitle} key={this.state.filter} />
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
      </div>);
  }
}
const commaNum = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

